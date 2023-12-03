import "server-only";
import { getSeeds } from "@/api/seeds";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import AppsList from "@/features/FindApps/components/AppsList/AppsList";
import FindAppsSearch from "@/features/FindApps/components/Search/FindAppsSearch";

export const revalidate = 0;

const page = async () => {
	const seeds = await getSeeds();

	return (
		<PageWrapper>
			<FindAppsSearch seeds={seeds} />
			<AppsList apps={[]} />
		</PageWrapper>
	);
};

export default page;
