import {Command} from '@oclif/core'
import {cleanup, setup} from "../../config/config";
import {Location} from "../../models/location.model";
import {Category} from "../../models/category.model";
import {CountriesScrapper} from "../../scrappers/countries.scrapper";
import {saveCountriesApps} from "../../services/countries_apps.service";
import {promptCitiesOrCountries} from "../../prompters/prompter";
import {ICountriesScrapperConstructorArgs} from "../../ts/interfaces/scrappers.interfaces";
import {saveApps} from "../../models/apps.model";
import {AppsMap} from "../../scrappers/scrapper";

const inquirer = require("inquirer")


export default class ScrapeCountries extends Command {


  protected async catch(err: Error): Promise<void> {
    console.log(err)
    await cleanup();
  }

  public async run(): Promise<void> {
    await setup();


    const countries = (await Location.find({}, {country: true}).lean()).map((doc) => doc.country);
    const categories = (await Category.find({}, {category: true}).lean()).map((doc) => doc.category);
    const scrapperArgs = await promptCitiesOrCountries("countries", countries, categories);
    const countriesScrapper = new CountriesScrapper(scrapperArgs as ICountriesScrapperConstructorArgs);

    const scrapeResults = await countriesScrapper.scrape();

    await saveApps(AppsMap);
    await saveCountriesApps(scrapeResults)

    await cleanup();

  }
}
