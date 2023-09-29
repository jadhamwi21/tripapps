import {Args, Command, Flags} from '@oclif/core'
import {cleanup, setup} from "../../config/config";
import {Location} from "../../models/location.model";
import {Category} from "../../models/category.model";

export default class City extends Command {


  protected async catch(err: Error): Promise<void> {
    console.log(err)
    await cleanup();
  }

  public async run(): Promise<void> {

    await setup();

    const categories = await Category.find().lean()

    categories.forEach((category) => {
      console.log(`${category.category} : [${category.subcategories.join(" , ")}]`)
    })

    await cleanup();
  }

}
