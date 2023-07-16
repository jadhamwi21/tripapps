import {model, Schema} from "mongoose"
import {ITripAppsApp} from "../ts/interfaces/apps.interfaces";


const appSchema = new Schema({
  appId: String,
  name: String,
  icon: String,
  score: Number
})


export const App = model("Apps", appSchema)


export const saveApps = async (map: Map<string, ITripAppsApp>) => {

  const apps = Array.from(map).map(([name, value]) => value)

  for (const app of apps) {
    const appDocument = await App.findOne({appId: app.appId});

    if (!appDocument) {
      const newApp = new App(app);
      await newApp.save();
      console.log(newApp)
    }
  }
}
