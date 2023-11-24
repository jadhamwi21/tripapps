import "server-only";
import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import FindAppsSearch from "@/features/FindApps/components/Search/FindAppsSearch";
import AppsList from "@/features/FindApps/components/AppsList/AppsList";
import { getSeeds } from "@/api/seeds";
import { getAllApps } from "@/api/apps";

const page = async () => {
	const seeds = await getSeeds();

	return (
		<PageWrapper>
			<FindAppsSearch seeds={seeds} />
			<AppsList
				apps={[
					{
						name: "DB Navigator",
						id: "#23",
						image:
							"https%3A%2F%2Fplay-lh.googleusercontent.com%2F6ErQQ0bzaLghv2F2dm5smkPjYQ_t9uep0yi3OSYY16O9QdyQfV1Uj2TW5MT-wRHJbg%3Dw240-h480-rw&w=64&q=75",
						link: "",
						keywords: [],
					},
				]}
			/>
		</PageWrapper>
	);
};

export default page;
