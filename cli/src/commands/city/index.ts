import { Args, Command, Flags } from "@oclif/core";
import { Location } from "../../models/location.model";
import { cleanup, setup } from "../../config/config";
import _ from "lodash";
import {
  addCountries,
  deleteCountries,
  getCountries,
} from "../../services/country_service";
import {
  addCities,
  deleteCities,
  getCities,
} from "../../services/city_service";

export default class CountryAdd extends Command {
  static description =
    "country add command: accepts a list of countries as arguments";
  static strict = false;

  static flags = {
    action: Flags.string({ char: "a", required: true }),
    country: Flags.string({ char: "c" }),
  };

  public async run(): Promise<void> {
    const {
      argv,
      flags: { action, country },
    } = await this.parse(CountryAdd);

    const cities = Object.values(argv) as string[];
    if (["add", "delete", "view"].indexOf(action) < 0) {
      this.log("invalid action");
      return;
    }

    await setup();
    switch (action) {
      case "view":
        console.log(await getCities());
        break;
      case "add":
        await addCities(country, cities);
        break;
      case "delete":
        await deleteCities(country, cities);
        break;
    }
    await cleanup();
  }
}
