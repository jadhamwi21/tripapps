import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { getSeeds } from "@/api/seeds";
import FindAppsSearch from "@/features/FindApps/components/Search/FindAppsSearch";
import AppsList from "@/features/FindApps/components/AppsList/AppsList";
import { fixParams } from "@/utils/utils";
import "server-only";
import {getAppsInCategory, StoreType} from "@/api/apps";

interface Props {
	params: { subcategory: string; category: string;store:StoreType};
}

const page = async ({ params }: Props) => {
	const paramsFixed = fixParams(params);
	const seeds = await getSeeds();
	const apps = await getAppsInCategory(paramsFixed.store,paramsFixed.subcategory);

	return (
		<PageWrapper>
			<FindAppsSearch
				seeds={seeds}
				initials={{
					initialSubcategory: paramsFixed.subcategory,
					initialCategory: paramsFixed.category,
				}}
			/>
			<AppsList apps={apps} />
		</PageWrapper>
	);
};

export default page;
