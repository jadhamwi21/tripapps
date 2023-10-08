from enum import Enum
from time import sleep
from typing import Annotated
from fastapi import HTTPException, Query, FastAPI
from selenium import webdriver
from urllib.parse import quote
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By

GOOGLE_SEARCH_URL = "https://www.google.com/search"

STORES = ["playstore", "appstore"]

STORES_SITES = {"playstore": "play.google.com", "appstore": "apple.com"}


class AppsEngine:
    def __init__(self):
        options = webdriver.ChromeOptions()
        options.add_argument("--headless")
        self.__driver = webdriver.Chrome(options=options)

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

        self.__driver.get(url)
        anchorLinks = self.__driver.find_elements(By.CSS_SELECTOR, "#search a")
        links = map(lambda x: x.get_attribute(
            "href"), anchorLinks)
        links_related_to_site = self.getRelatedLinks(links, site)
        return links_related_to_site

    def __del__(self):
        self.__driver.quit()


app = FastAPI()


class StoreEnum(str, Enum):
    PLAYSTORE = "playstore"
    APPSTORE = "appstore"


@app.get("/apps")
async def getAppsLinks(category: str, location: str, store: str):
    if store not in STORES:
        raise HTTPException(
            status_code=422, detail="invalid value for store parameter, it's 'playstore' or 'appstore'")
    engine = AppsEngine()
    links = engine.getAppsLinks(category, store, location)
    del engine
    return links
