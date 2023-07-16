import {ScrapeResults} from "../ts/types/scrappers.types";
import {CountriesApps} from "../models/countries_apps.model";


export const saveCountriesApps = async (scrappedApps: ScrapeResults) => {
  for (const country of Object.keys(scrappedApps)) {
    const countryApps = await CountriesApps.findOne({country_name: country});
    if (countryApps) {
      countryApps.apps = {...countryApps.apps,...scrappedApps[country]}
      await countryApps.save();
    } else {
      const countryApps = new CountriesApps({country_name:country})
      countryApps.apps = scrappedApps[country];
      await countryApps.save();
    }
  }
}
