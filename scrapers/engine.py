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
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import requests

GOOGLE_SEARCH_URL = "https://www.google.com/search"


class STORESENUM(str, Enum):
    PLAYSTORE = "Playstore"
    APPSTORE = "Appstore"


STORES = [STORESENUM.PLAYSTORE, STORESENUM.APPSTORE]

STORES_SITES = {STORESENUM.PLAYSTORE: "play.google.com",
                STORESENUM.APPSTORE: "apps.apple.com"}

API_KEY = "AIzaSyA0SpQPGycUm8qNxZgzwXp1_wHF6pVIYEE"
SEARCH_ENGINE_ID = "86402455ad31331ee"
BASE_URL = "https://www.googleapis.com/customsearch/v1"


class AppsEngine:
    def getRelatedLinks(self, links: list[str], site: str):
        relatedLinks = []
        for link in links:
            if link.startswith("https://{}".format(site)):
                relatedLinks.append(link)
        return relatedLinks

    def getAppsLinks(self, category: str, store: str, location: str):
        site = STORES_SITES[store]
        query = quote("site:{} {} apps in {}".format(site, category, location))
        response = requests.get('{}?q={}&key={}&cx={}'.format(
            BASE_URL, query, API_KEY, SEARCH_ENGINE_ID))
        links = [x.link for x in response.items]
        return links
