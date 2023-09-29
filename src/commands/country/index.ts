import {Args, Command, Flags} from '@oclif/core'
import {cleanup, setup} from "../../config/config";
import {Location} from "../../models/location.model";

export default class Country extends Command {


  protected async catch(err: Error): Promise<void> {
    console.log(err)
    await cleanup();
  }

  public async run(): Promise<void> {

    await setup();

    const locations = await Location.find({},{country:true}).lean()

    console.log(locations.map((doc) => doc.country));

    await cleanup();
  }

}
