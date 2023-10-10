import { EnLocation, EnStores } from "./enums";

export type StoreType = "Playstore" | "Appstore";
export type LocationsType = string[];

export interface PhaseOne {
  _categories: string[];
  stores: EnStores[];
  locations: LocationsType;
}

export type Categories = Record<string, string[]>;

export type ScrapAnswers = Pick<PhaseOne, "stores" | "locations"> & {
  categories: Categories;
  locationType: EnLocation;
};
