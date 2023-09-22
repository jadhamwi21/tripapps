import { getSeeds } from "@/api/seeds";
import Header from "@/layouts/Header/Header";

export async function generateStaticParams() {
	const seeds = await getSeeds();

	return Object.keys(seeds.locations).map((country) => ({
		country: country.toLowerCase(),
	}));
}

export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
