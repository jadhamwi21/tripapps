"use client";
import React, { FunctionComponent, useEffect } from "react";
import { ISeeds } from "@/ts/interfaces/seeds.interfaces";
import { S } from "@/features/FindApps/components/Search/FindAppsSearch.styled";
import Select from "@/components/Select/Select";
import { useSearch } from "@/features/FindApps/hooks/useSearch";
import { useSpring } from "@react-spring/web";
import { useCategoriesFilter } from "@/features/FindApps/hooks/useCategoriesFilter";
import CategoryFilterItem from "@/features/FindApps/components/CategoryFilterItem/CategoryFilterItem";
import { useRouter } from "next/navigation";
import { useIsFirstRender } from "usehooks-ts";

type Props = {
  seeds: ISeeds;
  initials?: {
    initialCountry?: string;
    initialCity?: string;
    initialCategory?: string;
    initialSubcategory?: string;
  };
};

const FindAppsSearch: FunctionComponent<Props> = ({ seeds, initials }) => {
  const { cityOnChange, countryOnChange, search, countries, cities } =
    useSearch(seeds.locations, {
      country: initials?.initialCountry,
      city: initials?.initialCity,
    });
  const {
    categoryOnClick,
    categoriesItems,
    filter,
    clearCategory,
    clearSubCategory,
  } = useCategoriesFilter(seeds.categories, {
    category: initials?.initialCategory,
    subcategory: initials?.initialSubcategory,
  });

  const [containerSprings] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
    }),
    [],
  );

  const router = useRouter();
  const isFirstRender = useIsFirstRender();
  useEffect(() => {
    if (
      (search.city ||
        search.country ||
        filter.subcategory ||
        filter.category) &&
      !isFirstRender
    ) {
      const timeoutId = setTimeout(() => {
        if (!search.country && !search.city) {
          if (filter.subcategory) {
            router.push(
              `/apps/category/${filter.category}/${filter.subcategory}`,
            );
          } else {
            router.push(`/apps/category/${filter.category}`);
          }
        } else {
          const routePathArray = ["/apps"];
          const { country, city } = search;
          const { category, subcategory } = filter;
          if (city) {
            routePathArray.push(...["city", city]);
          } else {
            routePathArray.push(...["country", country]);
          }
          if (category) {
            routePathArray.push(...["category", category]);
            if (subcategory) {
              routePathArray.push(subcategory);
            }
          }
          router.push(routePathArray.join("/"));
        }
      }, 1000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [search, filter]);

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

      <Select
        disabled={cities.length === 0}
        label={"City"}
        list={cities.map((country) => ({
          name: country,
          value: country,
        }))}
        onChange={cityOnChange}
        value={search.city}
      />

      <S.FiltersContainer>
        {(filter.category || filter.subcategory) && (
          <S.SelectedCategoriesContainer>
            {filter.category && (
              <CategoryFilterItem
                name={filter.category}
                onClick={clearCategory}
                checked
              />
            )}
            {filter.subcategory && (
              <CategoryFilterItem
                name={filter.subcategory}
                onClick={clearSubCategory}
                checked
              />
            )}
          </S.SelectedCategoriesContainer>
        )}
        <S.AvailableCategoriesContainer>
          {categoriesItems.map((category, index) => (
            <CategoryFilterItem
              name={category}
              key={category}
              onClick={categoryOnClick}
              animationDelay={(index / 8) * 1000}
            />
          ))}
        </S.AvailableCategoriesContainer>
      </S.FiltersContainer>
    </S.Container>
  );
};

export default FindAppsSearch;
