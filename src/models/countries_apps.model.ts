import {model, Schema} from "mongoose"


const countriesAppsSchema = new Schema({
  country_name: String,
  apps: Object
})


export const CountriesApps = model("CountriesApps", countriesAppsSchema)


