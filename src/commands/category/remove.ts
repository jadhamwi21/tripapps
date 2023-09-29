import {Args, Command, Flags} from '@oclif/core'
import {cleanup, setup} from "../../config/config";
import {Location} from "../../models/location.model";
import {titlize} from "../../utils/utils";
import {parseCliArray} from "../../utils/parser";
import {Category} from "../../models/category.model";

export default class CategoryRemove extends Command {


  static flags = {
    categories: Flags.string({required: true}),
  }

  protected async catch(err: Error): Promise<void> {
    console.log(err)
    await cleanup();
  }

  public async run(): Promise<void> {
    await setup();
    const {flags: {categories}} = await this.parse(CategoryRemove)
    const categoriesArray = parseCliArray(categories);
    await Category.deleteMany({category:categoriesArray})

    console.log(`Categories Removed`)

    await cleanup();

  }
}
