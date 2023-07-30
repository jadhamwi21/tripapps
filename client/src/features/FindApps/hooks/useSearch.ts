import { useEffect, useMemo, useState } from "react";
import { ISeeds } from "@/ts/interfaces/seeds.interfaces";

export const useSearch = (
  locations: ISeeds["locations"],
  initialValues?: { country?: string; city?: string },
) => {
  const [search, setSearch] = useState({
    country: initialValues?.country ?? "",
    city: initialValues?.city ?? "",
  });

  const countryOnChange = (val: string) => {
    setSearch((prev) => ({ ...prev, country: val }));
  };
  const cityOnChange = (val: string) => {
    setSearch((prev) => ({ ...prev, city: val }));
  };

  const countries = useMemo(() => Object.keys(locations), []);

  const cities = useMemo(() => {
    return locations[search.country] ?? [];
  }, [search.country]);

  useEffect(() => {
    cityOnChange("");
  }, [search.country]);

  return { countryOnChange, cityOnChange, search, countries, cities };
};
