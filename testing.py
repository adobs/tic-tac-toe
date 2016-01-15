from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import random
import unittest


class TestCalculator(unittest.TestCase):

    def setUp(self):
        """ Before each test, will click through the begin button on 1st page """
        self.browser = webdriver.Firefox()
        self.browser.get('http://localhost:5000/')
        btn = WebDriverWait(self.browser, 10).until(
            EC.presence_of_element_located((By.ID, "begin"))
        )
        btn.click()

    def tearDown(self):
        """ After each test, will shut down browser """
        self.browser.quit()

    def test_title(self):
        """ Tests title is correct """
        self.assertEqual(self.browser.title, 'Tic-Tac-Toe PLUS')

    def test_show_form(self):
        """ Tests form is showing """
        num = self.browser.find_element_by_id('num')
        num.send_keys("2")

        value = num.get_attribute('value').encode('utf-8')
        self.assertEqual("2", value)

    def test_create_board(self):
        """ Tests board is created with proper dimensions """

        num = self.browser.find_element_by_id("num")
        num.send_keys("2")
        submit_btn = self.browser.find_element_by_id('submit')
        submit_btn.click()

        board_buttons = self.browser.find_elements_by_class_name("board-btn")

        self.assertEqual(2*2, len(board_buttons))


    def test_check_board_winner(self):
        """ Tests that game is won """

        num = self.browser.find_element_by_id("num")
        num.send_keys("2")
        submit_btn = self.browser.find_element_by_id('submit')
        submit_btn.click()

        two_players = self.browser.find_element_by_id("two-players")
        two_players.click()

        board_buttons = self.browser.find_elements_by_class_name("board-btn")

        board_buttons[0].click()
        board_buttons[1].click()
        board_buttons[2].click()

        winner_title = self.browser.find_element_by_id("winner-title")
        message = winner_title.get_attribute('innerHTML')

        assert "Congrats to Player" in message

    def test_check_board_cats_game(self):
        """ Tests that game is tied """

        num = self.browser.find_element_by_id("num")
        num.send_keys("3")
        submit_btn = self.browser.find_element_by_id('submit')
        submit_btn.click()

        two_players = self.browser.find_element_by_id("two-players")
        two_players.click()

        board_buttons = self.browser.find_elements_by_class_name("board-btn")

        board_buttons[0].click()
        board_buttons[3].click()
        board_buttons[1].click()
        board_buttons[4].click()
        board_buttons[5].click()
        board_buttons[2].click()
        board_buttons[6].click()
        board_buttons[7].click()
        board_buttons[8].click()

        cat = self.browser.find_element_by_id("cat")
        message = cat.get_attribute("innerHTML")

        self.assertEqual(message, "")

if __name__ == '__main__':
    unittest.main()