Feature: Login to Application

  As a user
  I want to login to the application
  So that I can access my dashboard

  @login
  Scenario: Successful login with valid credentials
    Given pengguna berada di halaman Home
    When pengguna klik icon people
    And pengguna klik Tab Agen Brighton
    When pengguna input user dan password
    And klik button login
    Then pengguna berhasil login

 