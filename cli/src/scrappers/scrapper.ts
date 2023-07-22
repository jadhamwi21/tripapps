import {IAppItemFullDetail, search} from "google-play-scraper"
import {ITripAppsApp} from "../ts/interfaces/apps.interfaces";
import {App} from "../models/apps.model";

export const AppsMap = new Map<string, ITripAppsApp>();

export const scrapeApps = async (searchTerm: string) => {
  try {
    const apps = await search({term: searchTerm, fullDetail: true}) as IAppItemFullDetail[]
    apps.forEach((app) => {
      AppsMap.set(app.appId, {
        name: app.title,
        icon: app.icon,
        appId: app.appId,
        score: app.score,
        ratings: app.ratings,
        downloads: app.installs
      })
    })
    return apps.map((app) => (app.appId))
  } catch (e) {
    console.log(e);
    return []
  }
}



