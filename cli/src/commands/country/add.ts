import {Args, Command, Flags} from '@oclif/core'
import {cleanup, setup} from "../../config/config";
import {Location} from "../../models/locations.model";
import {titlize} from "../../utils/utils";

export default class CountryAdd extends Command {


  static flags = {
    name: Flags.string({multiple: true, char: "n"}),
  }


  protected async catch(err: Error): Promise<void> {
    console.log(err)
    await cleanup();
  }

  public async run(): Promise<void> {
    await setup();
    const {flags: {name}} = await this.parse(CountryAdd)
    if (name)
      await Location.insertMany(name.map((country) => ({country})))


    await cleanup();

  }
}
