import {Args, Command, Flags} from '@oclif/core'
import {cleanup, setup} from "../../config/config";
import {Location} from "../../models/locations.model";

export default class Country extends Command {


  protected async catch(err: Error): Promise<void> {
    console.log(err)
    await cleanup();
  }

  public async run(): Promise<void> {

    await setup();

    const countries = await Location.find({},{country:true})

    console.log(countries.map((doc) => doc.country));

    await cleanup();
  }

}
