import {Args, Command, Flags} from '@oclif/core'
import {cleanup, setup} from "../../config/config";
import {Location} from "../../models/location.model";
import {Category} from "../../models/category.model";

export default class Country extends Command {


  protected async catch(err: Error): Promise<void> {
    console.log(err)
    await cleanup();
  }

  public async run(): Promise<void> {

    await setup();

    const categories = await Category.find({},{category:true}).lean()

    console.log(categories.map((doc) => doc.category));

    await cleanup();
  }

}
