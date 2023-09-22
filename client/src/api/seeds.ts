import "server-only";
import { AxiosResponse } from "axios";
import { ISeeds } from "@/ts/interfaces/seeds.interfaces";
import { axiosInstance } from "@/api/index";

export const getSeeds = async () => {
	const seeds = await axiosInstance
		.get<{}, AxiosResponse<ISeeds>>("/seeds")
		.then(({ data }) => data);

	return seeds;
};
