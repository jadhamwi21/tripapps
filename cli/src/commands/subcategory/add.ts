import {Args, Command, Flags} from '@oclif/core'
import {cleanup, setup} from "../../config/config";
import {Location} from "../../models/location.model";
import {titlize} from "../../utils/utils";
import {string} from "zod";
import {parseCliArray} from "../../utils/parser";
import {Category} from "../../models/category.model";

export default class CityAdd extends Command {


  static flags = {
    subcategories: Flags.string({required: true}),
    category: Flags.string({required: true})
  }


  protected async catch(err: Error): Promise<void> {
    console.log(err)
    await cleanup();
  }

  public async run(): Promise<void> {
    await setup();
    const {flags: {subcategories, category}} = await this.parse(CityAdd)
    const subcategoriesArray = parseCliArray(subcategories)
    const categoryDoc = await Category.findOne({category: titlize(category)});
    if (categoryDoc) {
      categoryDoc.subcategories = [...new Set([...categoryDoc.subcategories, ...subcategoriesArray])]
      await categoryDoc.save()
      console.log(`Subcategories Added To ${titlize(category)}`)
    } else {
      console.log(`Country ${titlize(category)} was not found`)
    }


    await cleanup();

  }
}
