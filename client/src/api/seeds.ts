import axios, { AxiosResponse } from "axios";
import { ISeeds } from "@/ts/interfaces/seeds.interfaces";

export const getSeeds = async () => {
  return await axios
    .get<{}, AxiosResponse<ISeeds>>("http://localhost:80/seeds")
    .then(({ data }) => data);
};
