import { model, Schema } from "mongoose";
import { titlize } from "../utils/utils";

const locationSchema = new Schema({
  country: { type: String, required: true },
  cities: [String],
});

locationSchema.pre("save", async function (next) {
  this.country = titlize(this.country);
  if (this.cities) {
    this.cities = this.cities.map((city: string) => titlize(city));
  }
  next();
});

export const Location = model("Countries", locationSchema);


