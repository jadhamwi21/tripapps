import {Command, Flags} from '@oclif/core'
import {cleanup, setup} from "../../config/config";
import {Location} from "../../models/location.model";
import {Category} from "../../models/category.model";
import {parseCliArray} from "../../utils/parser";
import {CitiesScrapper} from "../../scrappers/cities.scrapper";
import {saveCitiesApps} from "../../services/cities_apps.service";
import {promptCitiesOrCountries} from "../../prompters/prompter";
import {ICitiesScrapperConstructorArgs} from "../../ts/interfaces/scrappers.interfaces";
import {saveApps} from "../../models/apps.model";
import {AppsMap} from "../../scrappers/scrapper";

const inquirer = require("inquirer")


export default class ScrapeCities extends Command {


  static flags = {
    countries: Flags.string()
  }

  protected async catch(err: Error): Promise<void> {
    console.log(err)
    await cleanup();
  }

  public async run(): Promise<void> {
    await setup();
    const {flags} = await this.parse(ScrapeCities);
    let countries: string[];
    if (flags.countries) {
      countries = parseCliArray(flags.countries);
    } else {
      countries = (await Location.find({}, {country: true}).lean()).map((doc) => doc.country)
    }
    const cities = ((await Location.find({country: {$in: countries}}, {cities: true}).lean()).map((doc) => doc.cities)).flat();
    const categories = (await Category.find({}, {category: true}).lean()).map((doc) => doc.category);
    const scrapperArgs = await promptCitiesOrCountries("cities",cities, categories);
    const citiesScrapper = new CitiesScrapper(scrapperArgs as ICitiesScrapperConstructorArgs);

    const scrapeResults = await citiesScrapper.scrape();

    await saveApps(AppsMap);
    await saveCitiesApps(scrapeResults)

    await cleanup();

  }
}
