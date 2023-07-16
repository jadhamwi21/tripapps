import {Args, Command, Flags} from '@oclif/core'
import {cleanup, setup} from "../../config/config";
import {Location} from "../../models/location.model";

export default class City extends Command {


  protected async catch(err: Error): Promise<void> {
    console.log(err)
    await cleanup();
  }

  public async run(): Promise<void> {

    await setup();

    const locations = await Location.find().lean()

    locations.forEach((location) => {
      console.log(`${location.country} : [${location.cities.join(" , ")}]`)
    })

    await cleanup();
  }

}
