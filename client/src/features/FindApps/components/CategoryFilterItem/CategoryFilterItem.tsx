import Image from "next/image";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import classes from "./CategoryFilterItem.module.scss";
import { ReactSVG } from "react-svg";
import { useHover } from "usehooks-ts";

type Props = {
	name: string;
	onClick: (category: string, subcategory?: string) => void;
};

const CategoryFilterItem: FunctionComponent<Props> = ({ name, onClick }) => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const timeoutRef = useRef<NodeJS.Timeout>();
	return (
		<div ref={wrapperRef} className={classes.wrapper}>
			<div
				className={classes.container}
				onClick={() => {
					onClick(name);
				}}
			>
				<div className={classes.icon}>
					<ReactSVG
						src={`${process.env.NEXT_PUBLIC_API_URL}/icons/categories/${name}.svg`}
					/>
				</div>
				<div>{name}</div>
			</div>
		</div>
	);
};

export default CategoryFilterItem;
