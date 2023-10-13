from enum import Enum
import profile
import random
from time import sleep
from typing import Annotated
from fastapi import HTTPException, Query, FastAPI
from selenium import webdriver
from urllib.parse import quote
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium_recaptcha_solver import RecaptchaSolver
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

import main

GOOGLE_SEARCH_URL = "https://www.google.com/search"


class STORESENUM(str, Enum):
    PLAYSTORE = "Playstore"
    APPSTORE = "Appstore"


STORES = [STORESENUM.PLAYSTORE, STORESENUM.APPSTORE]

STORES_SITES = {STORESENUM.PLAYSTORE: "play.google.com",
                STORESENUM.APPSTORE: "apps.apple.com"}


class AppsEngine:
    def __init__(self):
        self.__driver = main.createWebdriver()

    def getRelatedLinks(self, links: list[str], site: str):
        relatedLinks = []
        for link in links:
            if link.startswith("https://{}".format(site)):
                relatedLinks.append(link)
        return relatedLinks

    def getAppsLinks(self, category: str, store: str, location: str):
        site = STORES_SITES[store]
        query = quote("site:{} {} apps in {}".format(site, category, location))
        url = "{}?q={}".format(GOOGLE_SEARCH_URL, query)

        solver = RecaptchaSolver(driver=self.__driver)
        self.__driver.get(url)
        recaptcha_iframe = self.__driver.find_element(
            By.XPATH, '//iframe[@title="reCAPTCHA"]')
        if recaptcha_iframe:
            solver.click_recaptcha_v2(iframe=recaptcha_iframe)
        anchorLinks = self.__driver.find_elements(
            By.CSS_SELECTOR, "#search a")

        links = map(lambda x: x.get_attribute(
            "href"), anchorLinks)

        links_related_to_site = self.getRelatedLinks(links, site)
        return list(set(links_related_to_site))
