import {ICitiesScrapperConstructorArgs, ICountriesScrapperConstructorArgs} from "../ts/interfaces/scrappers.interfaces";
const inquirer = require("inquirer")
import {Category} from "../models/category.model";


export const promptCitiesOrCountries = async (type:"cities" | "countries", arr: string[], categories: string[]): Promise<ICitiesScrapperConstructorArgs | ICountriesScrapperConstructorArgs> => {
  const question1 = {
    name: type === "cities" ? "citiesAnswer" : "countriesAnswer",
    type: "checkbox",
    message: `Select ${type} you want to scrape by`,
    choices: arr
  }
  const question2 = {
    name: "categoriesAnswer1",
    type: "checkbox",
    message: "Select categories you want to scrape by",
    choices: categories
  }

  const {citiesAnswer,countriesAnswer, categoriesAnswer1} = await inquirer.prompt([question1, question2])
  const subcategoriesQuestions = [];
  for (const category of categoriesAnswer1) {
    const categoryDoc = await Category.findOne({category, subcategories: {$exists: true, $not: {$size: 0}}}).lean();
    if (categoryDoc) {
      const subcategories = categoryDoc.subcategories
      const subcategoriesQuestion = {
        name: category,
        type: "checkbox",
        message: `Select subcategories for ${category} you want to scrape by`,
        choices: subcategories
      }
      subcategoriesQuestions.push(subcategoriesQuestion);
    }
  }
  const categoriesAnswer2 = await inquirer.prompt(subcategoriesQuestions);
  categoriesAnswer1.forEach((category: string) => {
    if (!categoriesAnswer2[category]) {
      categoriesAnswer2[category] = []
    }
  })

  return {citiesAnswer,countriesAnswer, categoriesAnswer: categoriesAnswer2}
}
