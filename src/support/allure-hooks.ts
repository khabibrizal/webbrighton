import {
  Before,
  After,
  AfterStep,
  ITestCaseHookParameter,
  ITestStepHookParameter,
  Status,
} from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';
import { CustomWorld } from './world';

const resultsDir = path.join(process.cwd(), 'allure-results');
const videoDir = path.join(process.cwd(), 'videos');

// pastikan folder hasil test & video tersedia
if (!fs.existsSync(resultsDir)) fs.mkdirSync(resultsDir);
if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir);

let currentTestName = '';
let currentSteps: any[] = [];
let currentStatus = 'unknown';
let videoPath = '';

// ===========================================================
// BEFORE SCENARIO
// ===========================================================
Before(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  const featureName = scenario.gherkinDocument?.feature?.name || 'Unknown Feature';
  const scenarioName = scenario.pickle.name;
  currentTestName = `${featureName}: ${scenarioName}`;
  currentSteps = [];
  currentStatus = 'unknown';

  // aktifkan perekaman video
  const safeName = currentTestName.replace(/[^a-z0-9]/gi, '_');
  videoPath = path.join(videoDir, `${safeName}.webm`);

  this.context = await this.browser.newContext({
    recordVideo: {
      dir: videoDir,
      size: { width: 1280, height: 720 },
    },
  });

  this.page = await this.context.newPage();

  console.log(`🎬 Recording started for: ${currentTestName}`);
});

// ===========================================================
// AFTER EACH STEP
// ===========================================================
AfterStep(async function (this: CustomWorld, step: ITestStepHookParameter) {
  const stepName = step.pickleStep?.text || 'Unnamed Step';
  const status = step.result?.status || Status.UNKNOWN;

  const stepData = {
    name: stepName,
    status,
    start: Date.now(),
    stop: Date.now() + 10,
  };

  // capture screenshot jika gagal
  if (status === Status.FAILED) {
    const screenshot = await this.page.screenshot();
    const screenshotFile = `${currentTestName.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.png`;
    const screenshotPath = path.join(resultsDir, screenshotFile);
    fs.writeFileSync(screenshotPath, screenshot);

    const stepData: {
  name: string;
  status: string;
  start: number;
  stop: number;
  attachments?: {
    name: string;
    type: string;
    source: string;
  }[];
} = {
  name: stepName,
  status,
  start: Date.now(),
  stop: Date.now() + 10,
};

  }

  currentSteps.push(stepData);
});

// ===========================================================
// AFTER SCENARIO
// ===========================================================
After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  if (!currentTestName) return;

  // Tunggu video selesai direkam dan simpan
  const video = await this.page.video()?.path();
  await this.context.close();

  let videoFile = '';
  if (video) {
    const safeName = currentTestName.replace(/[^a-z0-9]/gi, '_');
    videoFile = `${safeName}.webm`;
    fs.copyFileSync(video, path.join(resultsDir, videoFile));
    console.log(`🎥 Video saved: ${videoFile}`);
  }

  const scenarioStatus = scenario.result?.status === Status.FAILED ? 'failed' : 'passed';
  currentStatus = scenarioStatus;

  // buat file hasil test JSON
  const resultFile = path.join(
    resultsDir,
    `${Date.now()}-${Math.random().toString(36).substring(2)}-result.json`
  );

  const allureResult = {
    uuid: `${Date.now()}-${Math.random().toString(36).substring(2)}`,
    name: currentTestName,
    fullName: currentTestName,
    status: currentStatus,
    stage: 'finished',
    start: Date.now(),
    stop: Date.now() + 500,
    steps: currentSteps,
    attachments: [
      ...(currentStatus === 'failed'
        ? [
            {
              name: 'Video',
              type: 'video/webm',
              source: videoFile,
            },
          ]
        : []),
    ],
    labels: [
      { name: 'feature', value: scenario.gherkinDocument?.feature?.name },
      { name: 'framework', value: 'cucumber' },
      { name: 'language', value: 'typescript' },
    ],
  };

  fs.writeFileSync(resultFile, JSON.stringify(allureResult, null, 2));

  console.log(`✅ Scenario Finished: ${currentTestName} [${currentStatus}]`);
});

