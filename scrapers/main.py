from enum import Enum
from time import sleep
from typing import Annotated
from fastapi import HTTPException, Query, FastAPI
from selenium import webdriver
from urllib.parse import quote
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import engine
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
import playstore_scrapper
import appstore_scrapper
from fake_useragent import UserAgent

WEBDRIVER_SERVICE = Service(ChromeDriverManager().install())
WEBDRIVER_OPTIONS = Options()
WEBDRIVER_OPTIONS.add_argument('--no-sandbox')
WEBDRIVER_OPTIONS.add_argument('--disable-dev-shm-usage')
# WEBDRIVER_OPTIONS.add_argument("--headless")


def createWebdriver():
    webDriver = webdriver.Chrome(
        service=WEBDRIVER_SERVICE, options=WEBDRIVER_OPTIONS)
    webDriver.maximize_window()
    return webDriver


app = FastAPI()


@app.get("/apps")
async def getApps(category: str, location: str, store: str):
    webDriver = None
    if store not in engine.STORES:
        raise HTTPException(
            status_code=422, detail="invalid value for store parameter, it's 'playstore' or 'appstore'")
    try:
        appsEngine = engine.AppsEngine()
        links = appsEngine.getAppsLinks(category, store, location)
        webDriver = createWebdriver()
        apps = []
        if store == engine.STORESENUM.PLAYSTORE:
            playstoreScraper = playstore_scrapper.PlaystoreScraper(
                links, webDriver)
            apps = playstoreScraper.scrap()
            return apps
        else:
            appstoreScraper = appstore_scrapper.AppstoreScraper(
                links, webDriver)
            apps = appstoreScraper.scrap()
            return apps
    except:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        if webDriver != None:
            webDriver.quit()
