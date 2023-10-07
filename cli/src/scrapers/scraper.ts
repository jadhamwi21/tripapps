import { IAppItemFullDetail, search } from "google-play-scraper";
import { IApp } from "../ts/interfaces/apps.interfaces";

export const AppsMap = new Map<string, IApp>();

export const scrapeApps = async (location: string, term: string) => {
  try {
    const apps = (await search({
      term: `Best ${term} Apps In ${location}`,
      fullDetail: true,
    })) as IAppItemFullDetail[];
    apps.forEach((app) => {
      const appAddedToMap = AppsMap.get(app.appId);
      if (appAddedToMap) {
        AppsMap.set(app.appId, {
          ...appAddedToMap,
          keywords: Array.from(new Set([...appAddedToMap.keywords, term])),
        });
      } else {
        AppsMap.set(app.appId, {
          name: app.title,
          icon: app.icon,
          appId: app.appId,
          score: app.score,
          ratings: app.ratings,
          downloads: app.installs,
          keywords: [term],
        });
      }
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
