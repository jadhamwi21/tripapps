import mongoose from "mongoose";

export const connectToDatabase = async () => {

    await mongoose.connect(`mongodb://${process.env.MONGODB_URL}`);

    console.log(`Connected To Database`)
}




