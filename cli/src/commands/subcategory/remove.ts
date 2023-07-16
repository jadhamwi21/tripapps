import {Args, Command, Flags} from '@oclif/core'
import {cleanup, setup} from "../../config/config";
import {Location} from "../../models/location.model";
import {titlize} from "../../utils/utils";
import {parseCliArray} from "../../utils/parser";
import {Category} from "../../models/category.model";

export default class CityRemove extends Command {


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
    const {flags: {subcategories, category}} = await this.parse(CityRemove)
    const subcategoriesArray = parseCliArray(subcategories)
    const categoryDoc = await Category.findOne({category: titlize(category)});
    if (categoryDoc) {
      categoryDoc.subcategories = [...categoryDoc.subcategories].filter((city) => subcategoriesArray.indexOf(city) < 0);
      await categoryDoc.save()
      console.log(`Cities Removed From ${titlize(category)}`)
    }else {
      console.log(`Country ${titlize(category)} was not found`)
    }

    await cleanup();

  }
}
