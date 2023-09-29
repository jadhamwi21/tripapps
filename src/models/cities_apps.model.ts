import {model, Schema} from "mongoose"


const citiesAppsSchema = new Schema({
  city_name: String,
  apps:Object
})


export const CitiesApps = model("CitiesApps", citiesAppsSchema)


