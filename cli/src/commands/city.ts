import { Command, Flags } from "@oclif/core";
import { cleanup, setup } from "../config/config";
import { addCities, deleteCities, getCities } from "../services/city_service";

export default class City extends Command {
  static description = "city -v='add | view | delete'[-c='country'] ...cities";
  static strict = false;

  static flags = {
    action: Flags.string({ char: "a", required: true }),
    country: Flags.string({ char: "c" }),
  };

  public async run(): Promise<void> {
    const {
      argv,
      flags: { action, country },
    } = await this.parse(City);

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
