import { Args, Command, Flags } from "@oclif/core";
import { Location } from "../models/location.model";
import { cleanup, setup } from "../config/config";
import _ from "lodash";
import {
  addCountries,
  deleteCountries,
  getCountries,
} from "../services/country_service";
import { addCities, deleteCities, getCities } from "../services/city_service";
import {
  addSubcategories,
  deleteSubcategories,
  getSubcategories,
} from "../services/subcategory_service";

export default class Subcategory extends Command {
  static description =
    "subcategory -v='add | view | delete'[-c='category'] ...cities";
  static strict = false;

  static flags = {
    action: Flags.string({ char: "a", required: true }),
    category: Flags.string({ char: "c" }),
  };

  public async run(): Promise<void> {
    const {
      argv,
      flags: { action, category },
    } = await this.parse(Subcategory);

    const cities = Object.values(argv) as string[];
    if (["add", "delete", "view"].indexOf(action) < 0) {
      this.log("invalid action");
      return;
    }

    await setup();
    switch (action) {
      case "view":
        console.log(await getSubcategories());
        break;
      case "add":
        await addSubcategories(category, cities);
        break;
      case "delete":
        await deleteSubcategories(category, cities);
        break;
    }
    await cleanup();
  }
}
