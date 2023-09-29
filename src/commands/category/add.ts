import {Args, Command, Flags} from '@oclif/core'
import {cleanup, setup} from "../../config/config";
import {Location} from "../../models/location.model";
import {titlize} from "../../utils/utils";
import {string} from "zod";
import {parseCliArray} from "../../utils/parser";
import {Category} from "../../models/category.model";

export default class CategoryAdd extends Command {


  static flags = {
    categories: Flags.string({required: true}),
  }


  protected async catch(err: Error): Promise<void> {
    console.log(err)
    await cleanup();
  }

  public async run(): Promise<void> {
    await setup();
    const {flags: {categories}} = await this.parse(CategoryAdd)
    const categoriesArray = parseCliArray(categories);
    for (const category of categoriesArray) {
      const exists = await Location.exists({category: titlize(category)})
      if (!exists) {
        const location = new Category({category});
        await location.save()
      }

    }
    console.log(`Categories Added`)

    await cleanup();

  }
}
