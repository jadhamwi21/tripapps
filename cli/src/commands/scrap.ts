import { Args, Command, Flags } from "@oclif/core";

import { Category } from "../models/category.model";
import { cleanup, setup } from "../config/config";
import { Location } from "../models/location.model";
import { scrap } from "../services/scrap_service";
import { PhaseOne, Categories, ScrapAnswers } from "../ts/types";
import { EnLocation } from "../ts/enums";
const _ = require("lodash");
const inquirer = require("inquirer");

export default class Scrap extends Command {
  static description = "scrap command";

  static flags = {
    countries: Flags.boolean(),
    cities: Flags.boolean(),
    filter: Flags.string(),
  };

  public async run(): Promise<void> {
    const { flags, args } = await this.parse(Scrap);
    const { countries, cities } = flags;
    if (!countries && !cities) {
      throw new Error("pass country or city");
    }
    if (countries && cities) {
      throw new Error("pass ONLY one (country or city)");
    }
    await setup();
    const allCategories = await Category.find();
    const locationsDocs = await Location.find();
    const locationsList: string[] = (function () {
      if (countries) {
        return locationsDocs.map((loc) => loc.country);
      } else {
        if (args) {
          const countriesFilter = Object.values(args);
          return locationsDocs
            .filter((doc) => countriesFilter.indexOf(doc.country) >= 0)
            .map((loc) => loc.cities)
            .flat();
        } else {
          return locationsDocs.map((loc) => loc.cities).flat();
        }
      }
    })();
    const { stores, _categories, locations }: PhaseOne = await inquirer.prompt([
      {
        name: "locations",
        type: "checkbox",
        message: `Select ${countries ? "Countries" : "Cities"}:`,
        choices: locationsList,
      },
      {
        name: "stores",
        type: "checkbox",
        message: "Select applications stores:",
        choices: ["Playstore", "Appstore"],
      },
      {
        name: "_categories",
        type: "checkbox",
        message: "Select categories:",
        choices: allCategories.map((cat) => cat.category),
      },
    ]);

    const categories: Categories = await inquirer.prompt(
      _categories
        .map((category) => ({
          type: "checkbox",
          name: category,
          message: `Select subcategories of ${category}`,
          choices: allCategories.find(
            (currentCategory) => currentCategory.category === category
          )?.subcategories,
        }))
        .filter((prompts) => prompts.choices?.length !== 0)
    );

    const answers: ScrapAnswers = {
      stores,
      categories: !_.isEmpty(categories)
        ? categories
        : Object.fromEntries(_categories.map((cat) => [cat, []])),
      locations,
      locationType: countries ? EnLocation.COUNTRIES : EnLocation.CITIES,
    };

    await scrap(answers);

    await cleanup();
  }
}
