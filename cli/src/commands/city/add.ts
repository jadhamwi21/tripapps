import {Args, Command, Flags} from '@oclif/core'
import {cleanup, setup} from "../../config/config";
import {Location} from "../../models/locations.model";
import {titlize} from "../../utils/utils";
import {string} from "zod";
import {parseCliArray} from "../../utils/parser";

export default class CityAdd extends Command {


  static flags = {
    cities: Flags.string({required: true}),
    country: Flags.string({required: true})
  }


  protected async catch(err: Error): Promise<void> {
    console.log(err)
    await cleanup();
  }

  public async run(): Promise<void> {
    await setup();
    const {flags: {cities, country}} = await this.parse(CityAdd)
    const citiesArray = parseCliArray(cities)
    const location = await Location.findOne({country: titlize(country)});
    if (location) {

      location.cities = [...new Set([...location.cities, ...citiesArray])]
      await location.save()
      console.log(`Cities Added To ${titlize(country)}`)
    } else {
      console.log(`Country ${titlize(country)} was not found`)
    }


    await cleanup();

  }
}
