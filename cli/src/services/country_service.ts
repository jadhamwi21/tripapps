import { Location } from "../models/location.model";

export const getCountries = async () => {
  const locations = await Location.find();
  return locations.map((loc) => loc.country);
};

export const addCountries = async (countries: string[]) => {
  if (countries.length === 0) {
    throw new Error("you should pass at least one country");
  }
  for (const country of countries) {
    const locationExists = await Location.findOne({ country });
    if (!locationExists) {
      const location = new Location({ country });
      await location.save();
    }
  }
};

export const deleteCountries = async (countries: string[]) => {
  if (countries.length === 0) {
    throw new Error("you should pass at least one country");
  }
  for (const country of countries) {
    const locationExists = await Location.findOne({ country });
    if (locationExists) {
      await Location.deleteOne({ country });
    }
  }
};
