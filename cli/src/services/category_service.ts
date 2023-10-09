import { Category } from "../models/category.model";
import { Location } from "../models/location.model";

export const getCategories = async () => {
  const categories = await Category.find();
  return categories.map((category) => category.category);
};

export const addCategories = async (categories: string[]) => {
  if (categories.length === 0) {
    throw new Error("you should pass at least one country");
  }
  for (const category of categories) {
    const categoryExists = await Category.findOne({ category });
    if (!categoryExists) {
      const categoryDocument = new Category({ category });
      await categoryDocument.save();
    }
  }
};

export const deleteCategories = async (categories: string[]) => {
  if (categories.length === 0) {
    throw new Error("you should pass at least one country");
  }
  for (const category of categories) {
    const categoryExists = await Category.findOne({ category });
    if (categoryExists) {
      await Category.deleteOne({ category });
    }
  }
};
