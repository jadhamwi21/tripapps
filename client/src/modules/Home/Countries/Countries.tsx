"use client";
import React, { FunctionComponent } from "react";
import classes from "./Countries.module.scss";
import Card from "@/components/Card/Card";
import Section from "@/components/Section/Section";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
						icon={`${process.env.NEXT_PUBLIC_API_URL}/icons/countries/${country}.svg`}
						type={"flag"}
						key={country}
						onClick={() => {
							router.push(`/apps/playstore/country/${country}`);
						}}
					/>
				))}
			</div>
		</Section>
	);
};

export default Countries;
