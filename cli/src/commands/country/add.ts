import {Args, Command, Flags} from '@oclif/core'
import {cleanup, setup} from "../../config/config";
import {Location} from "../../models/locations.model";
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
    await Location.insertMany(countriesArray.map((country) => ({country})))

    await cleanup();

  }
}
