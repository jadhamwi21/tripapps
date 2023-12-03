import "server-only";
import { AxiosResponse } from "axios";
import { ISeeds } from "@/ts/interfaces/seeds.interfaces";
import { axiosServerInstance } from "@/api/index.server";

export const getSeeds = async () => {
	const seeds = await axiosServerInstance
		.get<{}, AxiosResponse<ISeeds>>("/seeds")
		.then(({ data }) => data);

	return seeds;
};
