import { useEffect, useMemo, useState } from "react";
import { ISeeds } from "@/ts/interfaces/seeds.interfaces";
import { useIsFirstRender } from "usehooks-ts";

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

  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    if (!isFirstRender) cityOnChange("");
  }, [search.country]);

  return { countryOnChange, cityOnChange, search, countries, cities };
};
