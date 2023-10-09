import { Category } from "../models/category.model";
import { Location } from "../models/location.model";

export const getSubcategories = async () => {
  const categories = await Category.find();
  return Object.fromEntries(
    categories.map((category) => [category.category, category.subcategories])
  );
};

export const addSubcategories = async (
  category?: string,
  subcategories: string[] = []
) => {
  if (!category) {
    throw new Error("country is required");
  }
  const categoryDocument = await Category.findOne({ category });
  if (!categoryDocument) throw new Error("country not found");
  if (subcategories.length === 0) {
    throw new Error("you should pass at least one subcategory");
  }
  categoryDocument.subcategories = Array.from(
    new Set([...categoryDocument.subcategories, ...subcategories])
  );
  await categoryDocument.save();
};

export const deleteSubcategories = async (
  category?: string,
  subcategories: string[] = []
) => {
  if (!category) {
    throw new Error("country is required");
  }
  const categoryDocument = await Category.findOne({ country: category });
  if (!categoryDocument) throw new Error("country not found");
  if (subcategories.length === 0) {
    throw new Error("you should pass at least one city");
  }
  categoryDocument.subcategories = categoryDocument.subcategories.filter(
    (subcategory) => subcategories.indexOf(subcategory) < 0
  );
  await categoryDocument.save();
};
