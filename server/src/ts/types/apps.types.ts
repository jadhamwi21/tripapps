export type AppsType = {
    readonly city_name?: string;
    readonly country_name?: string;
    apps: {
        [category: string]: { apps: string[], subcategories?: { [subcategory: string]: string[] } }
    }
}

