import {connectToDatabase, disconnectFromDatabase} from "../models";

export const setup = async () => {


  await connectToDatabase();

};

export const cleanup = async () => {
  await disconnectFromDatabase();
};
