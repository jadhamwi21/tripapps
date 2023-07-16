import {ICitiesScrapperConstructorArgs} from "../ts/interfaces/scrappers.interfaces";
import {scrapeApps} from "./scrapper";
import {ScrapeResults} from "../ts/types/scrappers.types";
import {ux} from "@oclif/core";

export class CitiesScrapper {
  private cities: ICitiesScrapperConstructorArgs["citiesAnswer"];
  private categories: ICitiesScrapperConstructorArgs["categoriesAnswer"];

  constructor({citiesAnswer, categoriesAnswer}: ICitiesScrapperConstructorArgs) {
    this.cities = citiesAnswer;
    this.categories = categoriesAnswer;
  }


  public async scrape() {
    const scrapeResults: ScrapeResults = {}
    for (const city of this.cities) {
      ux.action.start(`Scrapping ${city} Apps`)
      scrapeResults[city] = {};
      const entries = Object.entries(this.categories);
      for (const [category, subcategories] of entries) {

        scrapeResults[city]![category] = {apps: [], subcategories: {}}
        scrapeResults[city]![category]!.apps = await scrapeApps(`${category} apps in ${city}`);
        scrapeResults[city]![category]!.subcategories = {}

        for (const subcategory of subcategories) {


          scrapeResults[city]![category]!.subcategories![subcategory] = await scrapeApps(`${category} - ${subcategory} apps in ${city}`);
        }
      }
    }
    ux.action.stop()
    return scrapeResults;
  }
}
