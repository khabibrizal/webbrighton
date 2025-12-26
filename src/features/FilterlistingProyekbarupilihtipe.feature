Feature: filtertipe

  As a user
  I want to search proyekbaru to the application
  So that I can access filter Feature
  @filtertipe 
  Scenario: Successful filterbytipe
    Given user berada di menu proyekbarutipe
    When user klik button filtertipe
    And user pilih Rumah di list menu tipe
    When user klik button caritipe
    Then listing properti Proyek baru tampil sesuai filter tipe

 
