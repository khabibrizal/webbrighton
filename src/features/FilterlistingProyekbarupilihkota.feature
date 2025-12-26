Feature: filterkota

  As a user
  I want to search proyekbaru to the application
  So that I can access filter Feature
  @filterkota  
  Scenario: Successful filterbykota
    Given user berada di menu proyekbarukota
    When user klik button filterkota
    And user pilih surabaya di list menu kota
    When user klik button carikota 
    Then listing properti Proyek baru tampil sesuai filter kota

 
