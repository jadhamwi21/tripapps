import { getSeeds } from "@/api/seeds";
import Header from "@/layouts/Header/Header";

export async function generateStaticParams() {
	const seeds = await getSeeds();

	return Object.values(seeds.locations)
		.flat()
		.map((city) => ({ city: city.toLowerCase() }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
