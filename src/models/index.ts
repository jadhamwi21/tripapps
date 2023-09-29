import mongoose from "mongoose";

export const connectToDatabase = async () => {
  console.log(process.env.MONGODB_URL);
  await mongoose.connect(process.env.MONGODB_URL!);

  console.log(`Connected To Database`);
};
