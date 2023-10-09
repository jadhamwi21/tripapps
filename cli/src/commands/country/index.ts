import { Args, Command, Flags } from "@oclif/core";
import { Location } from "../../models/location.model";
import { cleanup, setup } from "../../config/config";
import _ from "lodash";
import {
  addCountries,
  deleteCountries,
  getCountries,
} from "../../services/country_service";

export default class CountryAdd extends Command {
  static description =
    "country add command: accepts a list of countries as arguments";
  static strict = false;

  static flags = {
    action: Flags.string({ char: "a" }),
  };

  public async run(): Promise<void> {
    const {
      argv,
      flags: { action },
    } = await this.parse(CountryAdd);
    if (!action) {
      this.log("action needed");
      return;
    }
    const countries = Object.values(argv) as string[];
    if (["add", "delete", "view"].indexOf(action) < 0) {
      this.log("invalid action");
      return;
    }

    await setup();
    switch (action) {
      case "view":
        console.log(await getCountries());
        break;
      case "add":
        await addCountries(countries);
        break;
      case "delete":
        await deleteCountries(countries);
        break;
    }
    await cleanup();
  }
}
