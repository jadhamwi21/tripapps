import mongoose from "mongoose";

export const connectToDatabase = async () => {
  console.log(process.env.MONGODB_URL!);

  await mongoose.connect(process.env.MONGODB_URL!);
};
export const disconnectFromDatabase = async () => {
  await mongoose.disconnect();
};
