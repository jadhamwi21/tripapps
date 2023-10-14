"use client";
import React, { FunctionComponent } from "react";
import classes from "./Categories.module.scss";
import Card from "@/components/Card/Card";

import Section from "@/components/Section/Section";
import Link from "next/link";

type Props = {
	categories: string[];
};

const Categories: FunctionComponent<Props> = ({ categories }: Props) => {
	return (
		<Section title={"Search By Category"}>
			<div className={classes.container}>
				{categories.map((category) => (
					<Card
						name={category}
						icon={`${process.env.NEXT_PUBLIC_API_URL}/icons/categories/${category}.svg`}
						type={"category"}
						key={category}
					/>
				))}
			</div>
		</Section>
	);
};

export default Categories;
