import {model, Schema} from "mongoose"
import {titlize} from "../utils/utils";


const locationsSchema = new Schema({
  country: {type: String, unique: true, required: true},
  cities: [String]
})


locationsSchema.pre("insertMany", async function (next,docs) {
  for (const doc of docs) {

    doc.country = titlize(doc.country);
    if (doc.cities) {
      doc.cities = doc.cities.map((city : string) => titlize(city));
    }
  }
  next()
})


export const Location = model("Locations", locationsSchema)


