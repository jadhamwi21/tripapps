import {ScrapeResults} from "../ts/types/scrappers.types";
import {CitiesApps} from "../models/cities_apps.model";
import {CountriesApps} from "../models/countries_apps.model";


export const saveCitiesApps = async (scrappedApps: ScrapeResults) => {
  for (const city of Object.keys(scrappedApps)) {
    const cityApps = await CitiesApps.findOne({city_name: city});
    if (cityApps) {
      cityApps.apps = {...cityApps.apps,...scrappedApps[city]}
      await cityApps.save();
    } else {
      const cityApps = new CitiesApps({city_name:city})
      cityApps.apps = scrappedApps[city];
      await cityApps.save();
    }
  }
}
