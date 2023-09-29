import {Args, Command, Flags} from '@oclif/core'
import {cleanup, setup} from "../../config/config";
import {Location} from "../../models/location.model";
import {Category} from "../../models/category.model";
import {App} from "../../models/apps.model";

export default class Apps extends Command {


  protected async catch(err: Error): Promise<void> {
    console.log(err)
    await cleanup();
  }

  public async run(): Promise<void> {

    await setup();

    const apps = await App.find({},{name:true}).lean()

    console.log(apps.map((doc) => doc.name));

    await cleanup();
  }

}
