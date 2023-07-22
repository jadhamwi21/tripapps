"use client";
import React, { FunctionComponent } from "react";
import { ISeeds } from "@/ts/interfaces/seeds.interfaces";
import { S } from "@/features/FindApps/components/CategoriesFilter/CategoriesFilter.styled";
import { useCategoriesFilter } from "@/features/FindApps/hooks/useCategoriesFilter";
import CategoryFilterItem from "@/features/FindApps/components/CategoriesFilter/Category/CategoryFilterItem";
import { useSpring } from "@react-spring/web";

interface OwnProps {}

type Props = { categories: ISeeds["categories"] };

const CategoriesFilter: FunctionComponent<Props> = ({ categories }) => {
  const {
    categoryOnClick,
    categoriesItems,
    filter,
    clearCategory,
    clearSubCategory,
  } = useCategoriesFilter(categories);
  const [containerSprings] = useSpring(
    () => ({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 0.2 * 1000 }),
    [],
  );
  return (
    <S.Container style={containerSprings}>
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
    </S.Container>
  );
};

export default CategoriesFilter;
