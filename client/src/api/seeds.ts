import { AxiosResponse } from "axios";
import { ISeeds } from "@/ts/interfaces/seeds.interfaces";
import { axiosInstance } from "@/api/index";

export const getSeeds = async () => {
  return await axiosInstance
    .get<{}, AxiosResponse<ISeeds>>("/seeds")
    .then(({ data }) => data);
};
