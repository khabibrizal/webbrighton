Feature: filtersekitarsaya

  As a user
  I want to search proyekbaru to the application
  So that I can access filter Feature
  @filterproyekbaru
  Scenario: Successful filterproyekbaru
    Given user berada di menu proyekbarupage 
    When user klik button filter proyekbaru
    And user pilih kategori
    And pilih tipe
    And pilih pengembang
    And pilih kota
    When user klik button cariproyekbaru
    Then listing properti Proyek baru tampil sesuai filter proyekbaru

 
