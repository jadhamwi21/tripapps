import {LocationType} from "../ts/types/locations.types";
import {IApp, IAppsFilter} from "../ts/interfaces/apps.interfaces";
import {Location} from "../models/location.model";
import {NotFoundError} from "../models/error.models";
import {CountriesApps} from "../models/countries_apps.model";
import {CitiesApps} from "../models/cities_apps.model";
import {AppsType} from "../ts/types/apps.types";
import {App} from "../models/apps.model";
import _ from "lodash";
import {titlize} from "../utils/utils";


const mapAppsDocumentsToAppsObjects = async (appsDocuments: AppsType | null, filter: Partial<IAppsFilter>) => {
    if (appsDocuments) {

        const appsIds: string[] = [];

        if (!_.isEmpty(filter)) {
            if (filter.category)
                filter.category = titlize(filter.category)
            if (filter.subcategory)
                filter.subcategory = titlize(filter.subcategory)
            if (filter.category && appsDocuments.apps[filter.category]) {
                if (filter.subcategory && appsDocuments.apps[filter.category].subcategories && appsDocuments.apps[filter.category].subcategories![filter.subcategory]) {
                    appsIds.push(...appsDocuments.apps[filter.category].subcategories![filter.subcategory])
                } else {
                    appsIds.push(...appsDocuments.apps[filter.category].apps)
                }
            }
        } else {
            Object.values(appsDocuments.apps).forEach((category) => {
                appsIds.push(...category.apps)
                if (category.subcategories) {
                    Object.values(
                        category.subcategories).forEach((appsArray) => {
                        appsIds.push(...appsArray)
                    })
                }
            })
        }

        const appsIdsCleanedUpFromDuplicates = [...new Set(appsIds)]
        const apps: IApp[] = await App.find({appId: {$in: appsIdsCleanedUpFromDuplicates}}, {_id: 0, __v: 0})

        return apps
    } else {
        return [];
    }
}

interface IAppsService {
    findApps: (location: string, filter: Partial<IAppsFilter>) => Promise<IApp[]>;
}

class CountriesAppsService implements IAppsService {
    async findApps(country: string, filter: Partial<IAppsFilter>) {

        const countryExists = await Location.exists({country});
        if (!countryExists) {
            throw new NotFoundError(`country with this name ${country} was not found`)
        }

        const countryAppsDocs = await CountriesApps.findOne({country_name: country}) as AppsType


        return await mapAppsDocumentsToAppsObjects(countryAppsDocs, filter);


    }
}

class CitiesAppsService implements IAppsService {
    async findApps(city: string, filter: Partial<IAppsFilter>) {

        const cityExists = await Location.exists({cities: {$in: [city]}});
        if (!cityExists) {
            throw new NotFoundError(`city with this name ${city} was not found`)
        }

        const cityAppsDocs = await CitiesApps.findOne({city_name: city}) as AppsType
        return await mapAppsDocumentsToAppsObjects(cityAppsDocs, filter);
    }
}

export const getAppsService = (locationType: LocationType) => {
    switch (locationType) {
        case "country":
            return new CountriesAppsService();
        case "city":
            return new CitiesAppsService();
    }
}