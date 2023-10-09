import mongoose from "mongoose";

export const connectToDatabase = async () => {
  await mongoose.connect(
    process.env.MONGODB_URL! ?? "mongodb://localhost:27017/tripapps"
  );
};
export const disconnectFromDatabase = async () => {
  await mongoose.disconnect();
};
