Feature: filterpengembang

  As a user
  I want to search proyekbaru to the application
  So that I can access filter Feature
  @filterpengembang  
  Scenario: Successful filterbypengembang
    Given user berada di menu proyekbarupengembang
    When user klik button filterpengembang
    And user pilih sinarmas land di list menu pengembang
    When user klik button caripengembang 
    Then listing properti Proyek baru tampil sesuai filter pengembang

 
