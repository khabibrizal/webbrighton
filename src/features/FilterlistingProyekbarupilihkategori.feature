Feature: filter kategori

  As a user
  I want to search proyekbaru to the application
  So that I can access filter Feature
  @filterkategori 
  Scenario: Successful filterbykategori
    Given user berada di menu proyekbaru
    When user klik button filter
    And user pilih lokal di list menu kategori
    When user klik button cari 
    Then listing properti Proyek baru tampil sesuai filter

 
