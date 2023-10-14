import Image from "next/image";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import classes from "./CategoryFilterItem.module.scss";
import { ReactSVG } from "react-svg";
import { useHover } from "usehooks-ts";

type Props = {
	name: string;
	onClick: (category: string, subcategory?: string) => void;
	subcategories: string[];
	categorySelected: string;
	subcategorySelected: string;
};

const CategoryFilterItem: FunctionComponent<Props> = ({
	name,
	onClick,
	subcategories,
	categorySelected,
	subcategorySelected,
}) => {
	const [showSubcategories, setShowSubcategories] = useState(
		categorySelected === name
	);

	const wrapperRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		setShowSubcategories(categorySelected === name);
	}, [categorySelected]);
	return (
		<div ref={wrapperRef} className={classes.wrapper}>
			<div
				className={classes.container}
				onClick={() => {
					onClick(name);
				}}
				style={{
					backgroundColor:
						categorySelected === name ? "var(--blue)" : "var(--light-black)",
				}}
			>
				<div className={classes.icon}>
					<ReactSVG
						src={`${process.env.NEXT_PUBLIC_API_URL}/icons/categories/${name}.svg`}
					/>
				</div>
				<div>
					{name}
					{subcategorySelected !== "" &&
					subcategories.find((category) => category === subcategorySelected)
						? `/${subcategorySelected}`
						: ``}
				</div>
			</div>
			{subcategories.length !== 0 && showSubcategories && (
				<div className={classes.list_wrapper}>
					<div
						className={classes.list}
						style={
							showSubcategories
								? { opacity: 1, pointerEvents: "all" }
								: { opacity: 0, pointerEvents: "none" }
						}
					>
						{subcategories.map((subcategory) => (
							<div
								className={classes.list_item}
								key={subcategory}
								onClick={() => {
									onClick(name, subcategory);
								}}
								style={{
									backgroundColor:
										subcategorySelected === subcategory
											? "var(--blue)"
											: "var(--light-black)",
								}}
							>
								<div className={classes.icon}>
									<ReactSVG
										src={`${process.env.NEXT_PUBLIC_API_URL}/icons/categories/${subcategory}.svg`}
									/>
								</div>
								<div>{subcategory}</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default CategoryFilterItem;
