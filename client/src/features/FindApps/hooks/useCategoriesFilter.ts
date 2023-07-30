import { useMemo, useState } from "react";
import { ISeeds } from "@/ts/interfaces/seeds.interfaces";

export const useCategoriesFilter = (
  categories: ISeeds["categories"],
  initialFilter?: {
    category?: string;
    subcategory?: string;
  },
) => {
  const [filter, setFilter] = useState({
    category: initialFilter?.category ?? "",
    subcategory: initialFilter?.subcategory ?? "",
  });

  const categoriesItems = useMemo(() => {
    if (filter.category && filter.subcategory) {
      return [];
    }
    if (filter.category) {
      return categories[filter.category] ?? [];
    } else {
      return Object.keys(categories);
    }
  }, [filter]);

  const categoryOnClick = (name: string) => {
    if (filter.category) {
      setFilter((prev) => ({ ...prev, subcategory: name }));
    } else {
      setFilter((prev) => ({ ...prev, category: name }));
    }
  };

  const clearCategory = () => {
    setFilter({ category: "", subcategory: "" });
  };
  const clearSubCategory = () => {
    setFilter((prev) => ({ ...prev, subcategory: "" }));
  };

  return {
    filter,
    categoriesItems,
    categoryOnClick,
    clearCategory,
    clearSubCategory,
  };
};
