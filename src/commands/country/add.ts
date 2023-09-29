import {Args, Command, Flags} from '@oclif/core'
import {cleanup, setup} from "../../config/config";
import {Location} from "../../models/location.model";
import {titlize} from "../../utils/utils";
import {string} from "zod";
import {parseCliArray} from "../../utils/parser";

export default class CountryAdd extends Command {


  static flags = {
    countries: Flags.string({required: true}),
  }


  protected async catch(err: Error): Promise<void> {
    console.log(err)
    await cleanup();
  }

  public async run(): Promise<void> {
    await setup();
    const {flags: {countries}} = await this.parse(CountryAdd)
    const countriesArray = parseCliArray(countries);
    for (const country of countriesArray) {

      const exists = await Location.exists({country: titlize(country)})
      if (!exists) {
        const location = new Location({country});
        await location.save()
      }

    }
    console.log(`Countries Added`)

    await cleanup();

  }
}
