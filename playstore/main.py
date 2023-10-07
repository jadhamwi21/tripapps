from time import sleep
from selenium import webdriver
from urllib.parse import quote
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By

browser = webdriver.Chrome()

term = quote("site:play.google.com transportation apps in munich")

browser.get("https://www.google.com/search?q={}".format(term))

apps = browser.find_elements(
    By.CSS_SELECTOR, "#search h3")

print(list(map(lambda x: x.get_attribute('innerHTML'), apps)))
