
from urllib.parse import parse_qs, urlparse
from selenium import webdriver
from selenium.webdriver.common.by import By


IMAGE_XPATH = "html/body/c-wiz[2]/div/div/div[2]/div/div/div/c-wiz/div[1]/img"
APP_NAME_XPATH = "html/body/c-wiz[2]/div/div/div[2]/div[1]/div/div/c-wiz/div[2]/div[1]/div/h1"


class PlaystoreScraper:
    def __init__(self, links: list[str], driver: webdriver.Chrome):
        self.links = links
        self.driver = driver

    def scrap(self):
        apps = []
        driver = self.driver
        for link in self.links:
            try:
                driver.get(link)
                image = driver.find_element(
                    By.XPATH, IMAGE_XPATH).get_attribute("src")
                name = driver.find_element(
                    By.XPATH, APP_NAME_XPATH).get_attribute("innerHTML")
                id = parse_qs(urlparse(link).query)["id"][0]

                link = link[0:link.find("&hl")]

                if not any(app['name'] == name for app in apps):
                    apps.append({"image": image, "name": name,
                                "id": id, "link": link})
            except Exception as e:
                print(e)
                print("Error scraping link {} from playstore".format(link))
        return apps
