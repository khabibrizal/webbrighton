Feature: Login to Application

  As a user
  I want to login to the application
  So that I can access my dashboard

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter valid username and password
    And I click the login button
    Then I should see the dashboard page
    And I click one of them product "Sauce Labs Bike Light"
    Then I should see the detail product page
    And I click the add to cart button
    Then I should see add to cart button change to remove button