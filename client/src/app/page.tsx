import { getAllApps } from "@/api/apps";
import { getSeeds } from "@/api/seeds";
import Meta from "@/components/Meta/Meta";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Achievements from "@/modules/Home/Achievements/Achievements";
import Categories from "@/modules/Home/Categories/Categories";
import Countries from "@/modules/Home/Countries/Countries";
import Headline from "@/modules/Home/Headline/Headline";
import "server-only";

const HomePage = async () => {
	const seeds = await getSeeds();
	const appstoreApps = await getAllApps("Appstore");
	const playstoreApps = await getAllApps("Playstore");
	const numberOfCategories = (() => {
		const { categories } = seeds;
		const mainCategories = Object.keys(categories);
		const subCategories = Object.values(categories).flat();
		return mainCategories.length + subCategories.length;
	})();
	const { countriesSize, citiesSize } = (() => {
		const { locations } = seeds;
		const countries = Object.keys(locations);
		const cities = Object.values(locations).flat();
		return { countriesSize: countries.length, citiesSize: cities.length };
	})();

	return (
		<Meta title="Homepage">
			<PageWrapper>
				<Headline />
				<Achievements
					categoriesSize={numberOfCategories}
					appsSize={playstoreApps.length + appstoreApps.length}
					countriesSize={countriesSize}
					citiesSize={citiesSize}
				/>
				<Categories categories={Object.keys(seeds.categories)} />
				<Countries countries={Object.keys(seeds.locations)} />
			</PageWrapper>
		</Meta>
	);
};

export default HomePage;
