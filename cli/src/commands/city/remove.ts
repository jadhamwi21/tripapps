import {Args, Command, Flags} from '@oclif/core'
import {cleanup, setup} from "../../config/config";
import {Location} from "../../models/location.model";
import {titlize} from "../../utils/utils";
import {parseCliArray} from "../../utils/parser";

export default class CityRemove extends Command {


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
    const {flags: {cities, country}} = await this.parse(CityRemove)
    const citiesArray = parseCliArray(cities)
    const location = await Location.findOne({country: titlize(country)});
    if (location) {
      location.cities = [...location.cities].filter((city) => citiesArray.indexOf(city) < 0);
      await location.save()
      console.log(`Cities Removed From ${titlize(country)}`)
    }else {
      console.log(`Country ${titlize(country)} was not found`)
    }

    await cleanup();

  }
}
