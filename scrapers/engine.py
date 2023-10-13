from enum import Enum
from time import sleep
from typing import Annotated
from fastapi import HTTPException, Query, FastAPI
from selenium import webdriver
from urllib.parse import quote
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By

GOOGLE_SEARCH_URL = "https://www.google.com/search"


class STORESENUM(str, Enum):
    PLAYSTORE = "Playstore"
    APPSTORE = "Appstore"


STORES = [STORESENUM.PLAYSTORE, STORESENUM.APPSTORE]

STORES_SITES = {STORESENUM.PLAYSTORE: "play.google.com",
                STORESENUM.APPSTORE: "apps.apple.com"}


class AppsEngine:
    def __init__(self, webdriver: webdriver.Chrome):
        self.__driver = webdriver

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
        print(url)
        self.__driver.get(url)
        anchorLinks = self.__driver.find_elements(By.CSS_SELECTOR, "#search a")
        links = map(lambda x: x.get_attribute(
            "href"), anchorLinks)

        print(links)

        links_related_to_site = self.getRelatedLinks(links, site)
        return list(set(links_related_to_site))
