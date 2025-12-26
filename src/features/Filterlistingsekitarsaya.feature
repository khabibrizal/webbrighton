Feature: filtersekitarsaya

  As a user
  I want to search proyekbaru to the application
  So that I can access filter Feature
  @filtersekitarsaya 
  Scenario: Successful filterbysekitarsaya
    Given user berada di menu proyekbarusekitarsaya
    When user klik button filtersekitarsaya
    And user checklist
    When user klik button carisekitarsaya
    Then listing properti Proyek baru tampil sesuai filter sekitarsaya

 
