import {Args, Command, Flags} from '@oclif/core'
import {cleanup, setup} from "../../config/config";
import {Location} from "../../models/locations.model";
import {titlize} from "../../utils/utils";

export default class CountryRemove extends Command {


  static flags = {
    name: Flags.string({multiple: true, char: "n"}),
  }

  protected async catch(err: Error): Promise<void> {
    console.log(err)
    await cleanup();
  }

  public async run(): Promise<void> {
    await setup();
    const {flags: {name}} = await this.parse(CountryRemove)
    if (name)
      await Location.deleteMany({country: name.map((name) => titlize(name))})


    await cleanup();

  }
}
