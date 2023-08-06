import { ICountriesScrapperConstructorArgs } from "../ts/interfaces/scrappers.interfaces";
import { scrapeApps } from "./scrapper";
import { ScrapeResults } from "../ts/types/scrappers.types";
import { ux } from "@oclif/core";

export class CountriesScrapper {
  private countries: ICountriesScrapperConstructorArgs["countriesAnswer"];
  private categories: ICountriesScrapperConstructorArgs["categoriesAnswer"];

  constructor({
    countriesAnswer,
    categoriesAnswer,
  }: ICountriesScrapperConstructorArgs) {
    this.countries = countriesAnswer;
    this.categories = categoriesAnswer;
  }

  public async scrape() {
    const scrapeResults: ScrapeResults = {};
    for (const country of this.countries) {
      scrapeResults[country] = {};
      const entries = Object.entries(this.categories);
      for (const [category, subcategories] of entries) {
        ux.action.start(`Scrapping ${category} Apps in ${country}`);
        scrapeResults[country]![category] = { apps: [], subcategories: {} };
        scrapeResults[country]![category]!.apps = await scrapeApps(
          country,
          category,
        );
        scrapeResults[country]![category]!.subcategories = {};
        for (const subcategory of subcategories) {
          scrapeResults[country]![category]!.subcategories![subcategory] =
            await scrapeApps(country, subcategory);
        }
      }
    }
    return scrapeResults;
  }
}
