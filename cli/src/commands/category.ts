import { Command, Flags } from "@oclif/core";
import { cleanup, setup } from "../config/config";
import { addCities, deleteCities, getCities } from "../services/city_service";
import {
  addCategories,
  deleteCategories,
  getCategories,
} from "../services/category_service";

export default class Category extends Command {
  static description = "category ...categories";
  static strict = false;

  static flags = {
    action: Flags.string({ char: "a", required: true }),
  };

  public async run(): Promise<void> {
    const {
      argv,
      flags: { action },
    } = await this.parse(Category);

    if (["add", "delete", "view"].indexOf(action) < 0) {
      this.log("invalid action");
      return;
    }

    const categories = argv as string[];

    await setup();
    switch (action) {
      case "view":
        console.log(await getCategories());
        break;
      case "add":
        await addCategories(categories);
        break;
      case "delete":
        await deleteCategories(categories);
        break;
    }
    await cleanup();
  }
}
