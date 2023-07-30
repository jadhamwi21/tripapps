"use client";
import React, { FunctionComponent } from "react";
import { ISeeds } from "@/ts/interfaces/seeds.interfaces";
import { S } from "@/features/FindApps/components/Search/FindAppsSearch.styled";
import Select from "@/components/Select/Select";
import { useSearch } from "@/features/FindApps/hooks/useSearch";
import { useSpring } from "@react-spring/web";
import Button from "@/components/Button/Button";

type Props = {
  locations: ISeeds["locations"];
  initialCountry?: string;
  initialCity?: string;
};

const FindAppsSearch: FunctionComponent<Props> = ({
  locations,
  initialCity,
  initialCountry,
}) => {
  const { cityOnChange, countryOnChange, search, countries, cities } =
    useSearch(locations, { country: initialCountry, city: initialCity });
  const [citySprings] = useSpring(
    () => ({
      opacity: cities.length !== 0 ? 1 : 0,
      y: cities.length !== 0 ? 0 : 4,
      config: { tension: 300 },
    }),
    [cities],
  );

  const [containerSprings] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
    }),
    [],
  );

  return (
    <S.Container style={containerSprings}>
      <Select
        label={"Country"}
        list={countries.map((country) => ({
          name: country,
          value: country,
        }))}
        onChange={countryOnChange}
        value={search.country}
      />

      {cities.length !== 0 && (
        <Select
          label={"City"}
          list={cities.map((country) => ({
            name: country,
            value: country,
          }))}
          onChange={cityOnChange}
          value={search.city}
        />
      )}

      <Button variant={"primary"}>Find</Button>
    </S.Container>
  );
};

export default FindAppsSearch;
