import { IAppReview } from "@/ts/interfaces/apps.interfaces";

import { StoreType } from "./apps";
import { axiosClientInstance } from "./index.client";

export const addAppReview = async (
	store: StoreType,
	appId: string,
	review: Omit<IAppReview, "date">
): Promise<{
	message: string;
	data: { review: IAppReview; score: number };
}> => {
	return await axiosClientInstance
		.put(`/apps/${store}/${appId}/reviews`, review)
		.then(({ data }) => {
			return data;
		})
		.catch((e) => {
			if (e.response.data.code === 400) {
				throw new Error("Invalid Review");
			} else {
				throw new Error(e.response.data.message);
			}
		});
};
