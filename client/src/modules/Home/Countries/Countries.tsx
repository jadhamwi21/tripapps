"use client";
import React, { FunctionComponent } from "react";
import classes from "./Countries.module.scss";
import Card from "@/components/Card/Card";
import { useRouter } from "next/navigation";
import Section from "@/components/Section/Section";

type Props = {
	countries: string[];
};

const Countries: FunctionComponent<Props> = ({ countries }: Props) => {
	const router = useRouter();
	return (
		<Section title={"Search By Country"}>
			<div className={classes.container}>
				{countries.map((country) => (
					<Card
						name={country}
						key={country}
						icon={`http://localhost:80/icons/countries/${country}.svg`}
						onClick={() =>
							router.push(`/apps/country/${country.toLowerCase()}`)
						}
						type={"flag"}
					/>
				))}
			</div>
		</Section>
	);
};

export default Countries;
