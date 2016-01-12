from selenium import webdriver
import random
import unittest


class TestCalculator(unittest.TestCase):

    def setUp(self):
        """ Before each test, will click through the begin button on 1st page """
        self.browser = webdriver.Firefox()
        self.browser.get('http://localhost:5000/')
        btn = self.browser.find_element_by_id('begin')
        btn.click()

    def tearDown(self):
        """ After each test, will shut down browser """
        self.browser.quit()

    def test_title(self):
        """ Tests title is correct """
        self.assertEqual(self.browser.title, 'Tic-Tac-Toe PLUS')

    def test_show_form(self):
        """ Tests form is showing """
        row2 = self.browser.find_element_by_id('row2')
        self.assertEqual(row2, not None)

    def test_create_board(self):
        """ Tests board is created with proper dimensions """

        num = self.browser.find_element_by_id("num")
        num.send_keys("2")
        submit_btn = self.browser.find_element_by_id('submit')
        submit_btn.click()

        board_count = 0
        for i in range(2):
            board_child = self.browser.find_element_by_id("board")[0]["children"][i]
            board_count += 1
            self.assertEqual(board_child, i)

        self.assertEqual(2*2, board_count)

    def test_reset_board(self):
        """" Tests board is emptied """

        num = self.browser.find_element_by_id("num")
        num.send_keys("2")
        submit_btn = self.browser.find_element_by_id('submit')
        submit_btn.click()

        board_buttons = self.browser.find_elements_by_class("board-btn")
        random_int = random.rand_int(0, 3)

        board_buttons[random_int].click()

        reset = self.browser.find_element_by_id("reset")
        reset.click()

        reset_board_buttons = self.browser.find_elements_by_class("board-btn")
        
        reset_board = False
        for i in range(4):
            if reset_board_buttons[i].get_attribute('innerHTML') == "":
                reset_board = True
            else:
                reset_board = False

        self.assertEqual(reset_board, True)

    def test_check_board_winner(self):
        """ Tests that game is won """

        num = self.browser.find_element_by_id("num")
        num.send_keys("2")
        submit_btn = self.browser.find_element_by_id('submit')
        submit_btn.click()

        board_buttons = self.browser.find_elements_by_class("board-btn")

        board_buttons[0].click()
        board_buttons[1].click()
        board_buttons[2].click()

        winner_title = self.browser.find_element_by_id("winner-title")
        message = winner_title.get_attribute('innerHTML')

        self.assertEqual(message, "Congrats to Player X!")
        
    def test_check_board_cats_game(self):
        """ Tests that game is tied """
         #finish this test
        pass

if __name__ == '__main__':
    unittest.main()