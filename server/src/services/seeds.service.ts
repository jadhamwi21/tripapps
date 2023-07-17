import {ICategories, ILocations, ISeeds} from "../ts/interfaces/seeds.interfaces";
import {Category} from "../models/category.model";
import {Location} from "../models/location.model";


const getCategories = async (): Promise<ICategories> => {
    const categories = await Category.find({});
    return Object.fromEntries(categories.map((category) => [category.category, category.subcategories]))
}

const getLocations = async():Promise<ILocations> => {
    const locations = await Location.find({});
    return Object.fromEntries(locations.map((location) => [location.country,location.cities]))
}

const getSeeds = async(): Promise<ISeeds> => {

    return {
        categories: await getCategories(),
        locations: await getLocations(),
    }
}


export const SeedsService = {getSeeds}