import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import FindAppsSearch from "@/features/FindApps/components/Search/FindAppsSearch";
import AppsList from "@/features/FindApps/components/AppsList/AppsList";
import { getSeeds } from "@/api/seeds";
import { getAppsInCategory, StoreType } from "@/api/apps";
import { fixParams } from "@/utils/utils";
import "server-only";
import Meta from "@/components/Meta/Meta";

interface IProps {
	params: {
		category: string;
		store: StoreType;
	};
}

const page = async ({ params }: IProps) => {
	const paramsFixed = fixParams(params);
	const seeds = await getSeeds();
	const apps = await getAppsInCategory(paramsFixed.store, paramsFixed.category);

	return (
		<Meta title={`${paramsFixed.store} | ${paramsFixed.category} Apps`}>
			<PageWrapper>
				<FindAppsSearch
					seeds={seeds}
					initials={{ initialCategory: paramsFixed.category }}
				/>
				<AppsList apps={apps} portfolio category={paramsFixed.category} />
			</PageWrapper>
		</Meta>
	);
};

export default page;
