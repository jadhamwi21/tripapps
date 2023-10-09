import { Args, Command, Flags } from "@oclif/core";

import { Category } from "../models/category.model";
import { cleanup, setup } from "../config/config";
import { Location } from "../models/location.model";
const inquirer = require("inquirer");

type StoreType = "Playstore" | "Appstore";
type LocationsType = string[];

interface PhaseOne {
  _categories: string[];
  stores: StoreType[];
  locations: LocationsType;
}

type PhaseTwo = Record<string, string[]>;

type IScrapAnswers = Pick<PhaseOne, "stores" | "locations"> & {
  categories: PhaseTwo;
};

export default class Scrap extends Command {
  static description = "scrap command";

  static flags = {
    countries: Flags.boolean(),
    cities: Flags.boolean(),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Scrap);
    const { countries, cities } = flags;
    if (!countries && !cities) {
      throw new Error("pass country or city");
    }
    await setup();
    const allCategories = await Category.find();
    const locationsDocs = await Location.find();
    const locationsList: string[] = (function () {
      if (countries) {
        return locationsDocs.map((loc) => loc.country);
      } else {
        return locationsDocs.map((loc) => loc.cities).flat();
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

    const categories: PhaseTwo = await inquirer.prompt(
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

    const answers: IScrapAnswers = {
      stores,
      categories: categories,
      locations,
    };
    console.log(answers);

    await cleanup();
  }
}
