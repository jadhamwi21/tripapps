import "server-only";
import { getSeeds } from "@/api/seeds";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import AppsList from "@/features/FindApps/components/AppsList/AppsList";
import FindAppsSearch from "@/features/FindApps/components/Search/FindAppsSearch";
import Meta from "@/components/Meta/Meta";

export const revalidate = 0;

const page = async () => {
	const seeds = await getSeeds();

	return (
		<Meta
			title="Find Apps"
			description="Discover the top-rated mobile apps in countries and cities worldwide, categorized for your convenience. Find the best apps for various interests and needs, from productivity to entertainment. Explore a curated selection of applications tailored to your location and preferences. Stay updated on the latest and most popular apps, ensuring you have the perfect tool for every occasion."
		>
			<PageWrapper>
				<FindAppsSearch seeds={seeds} />
				<AppsList apps={[]} />
			</PageWrapper>
		</Meta>
	);
};

export default page;
