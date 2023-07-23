import { IAppItemFullDetail, search } from "google-play-scraper";
import { IApp } from "../ts/interfaces/apps.interfaces";

export const AppsMap = new Map<string, IApp>();

export const scrapeApps = async (searchTerm: string) => {
  try {
    const apps = (await search({
      term: searchTerm,
      fullDetail: true,
    })) as IAppItemFullDetail[];
    apps.forEach((app) => {
      AppsMap.set(app.appId, {
        name: app.title,
        icon: app.icon,
        appId: app.appId,
        score: app.score,
        ratings: app.ratings,
        downloads: app.installs,
      });
    });
    if (apps) {
      return apps.map((app) => app.appId);
    } else {
      return [];
    }
  } catch (e) {
    console.log(e);
    return [];
  }
};
