import { useEffect, useMemo, useState } from "react";
import { ISeeds } from "@/ts/interfaces/seeds.interfaces";
import { useIsFirstRender } from "usehooks-ts";
import { StoreType } from "@/api/apps";

export const useSearch = (
	locations: ISeeds["locations"],
	initialValues?: { country?: string; city?: string; store?: StoreType }
) => {
	const [search, setSearch] = useState({
		country: initialValues?.country ?? "",
		city: initialValues?.city ?? "",
		store: initialValues?.store || "Playstore",
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

	const storeOnChange = (val: StoreType) => {
		setSearch((prev) => ({ ...prev, store: val }));
	};

	return {
		countryOnChange,
		cityOnChange,
		search,
		countries,
		cities,

		storeOnChange,
	};
};
