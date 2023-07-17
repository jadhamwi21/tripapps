

export interface ILocations {
    [country:string] : string[];
}

export interface ICategories{
    [category:string] : string[];
}

export interface ISeeds{
    locations:ILocations;
    categories:ICategories;
}