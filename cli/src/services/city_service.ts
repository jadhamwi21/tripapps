import { Location } from "../models/location.model";

export const getCities = async () => {
  const locations = await Location.find();
  return Object.fromEntries(locations.map((loc) => [loc.country, loc.cities]));
};

export const addCities = async (country?: string, cities: string[] = []) => {
  if (!country) {
    throw new Error("country is required");
  }
  const location = await Location.findOne({ country });
  if (!location) throw new Error("country not found");
  if (cities.length === 0) {
    throw new Error("you should pass at least one city");
  }
  location.cities = Array.from(new Set([...location.cities, ...cities]));
  await location.save();
};

export const deleteCities = async (country?: string, cities: string[] = []) => {
  if (!country) {
    throw new Error("country is required");
  }
  const location = await Location.findOne({ country });
  if (!location) throw new Error("country not found");
  if (cities.length === 0) {
    throw new Error("you should pass at least one city");
  }
  location.cities = location.cities.filter((city) => cities.indexOf(city) < 0);
  await location.save();
};
