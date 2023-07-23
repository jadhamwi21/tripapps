import { App } from "../models/apps.model";
import { AppsMap } from "../scrappers/scrapper";

export const saveApps = async () => {
  const apps = Array.from(AppsMap).map(([_, value]) => value);

  for (const app of apps) {
    const appDocument = await App.findOne({ appId: app.appId });

    if (!appDocument) {
      const newApp = new App(app);
      await newApp.save();
      console.log(newApp);
    }
  }
};
