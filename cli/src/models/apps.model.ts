import { model, Schema } from "mongoose";

const appSchema = new Schema({
  appId: String,
  name: String,
  icon: String,
  score: Number,
  downloads: String,
  ratings: Number,
  keywords: [String],
});

export const App = model("Apps", appSchema);


