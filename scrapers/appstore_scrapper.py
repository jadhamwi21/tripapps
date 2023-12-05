
import re
from urllib.parse import parse_qs, urlparse
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By


IMAGE_XPATH = "html/body//picture/img"
APP_NAME_XPATH = "html/body//h1"


class AppstoreScraper:
    def __init__(self, links: list[str], driver: webdriver.Chrome):
        self.links = links
        self.driver = driver

    def scrap(self):
        apps = []
        driver = self.driver
        for link in self.links:
            try:
                print(link)
                driver.get(link)

                image = driver.find_element(
                    By.XPATH, IMAGE_XPATH).get_attribute("currentSrc")
                nameHtml = driver.find_element(
                    By.XPATH, APP_NAME_XPATH).get_attribute("innerHTML")

                soup = BeautifulSoup(nameHtml, 'html.parser')
                span = soup.find('span')
                span.extract()
                name = re.sub(r'^\s+|\s+$', '', soup.text)
                link = link[0:link.find("?l")]

                id = link[link.find("/id")+3:]
                if not any(app['name'] == name for app in apps):
                    apps.append({"image": image, "name": name,
                                "id": id, "link": link})
            except Exception as e:
                print(e)
                print("Error Scraping link {} from appstore".format(link))
        return apps
