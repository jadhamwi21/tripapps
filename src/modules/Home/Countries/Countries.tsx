import React, { FunctionComponent } from "react";
import classes from "./Countries.module.scss";
import Card from "@/components/Card/Card";
import Section from "@/components/Section/Section";
import Link from "next/link";

type Props = {
	countries: string[];
};

const Countries: FunctionComponent<Props> = ({ countries }: Props) => {
	return (
		<Section title={"Search By Country"}>
			<div className={classes.container}>
				{countries.map((country) => (
					<Link href={`/apps/country/${country.toLowerCase()}`} key={country}>
						<Card
							name={country}
							icon={`${process.env.NEXT_PUBLIC_API_URL}/icons/countries/${country}.svg`}
							type={"flag"}
						/>
					</Link>
				))}
			</div>
		</Section>
	);
};

export default Countries;
