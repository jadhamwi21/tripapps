import Image from "next/image";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import classes from "./CategoryFilterItem.module.scss";
import { ReactSVG } from "react-svg";
import { useHover } from "usehooks-ts";

type Props = {
	name: string;
	onClick: (category: string) => void;
	subcategories: string[];
};

const CategoryFilterItem: FunctionComponent<Props> = ({
	name,
	onClick,
	subcategories,
}) => {
	const [showSubcategories, setShowSubcategories] = useState(false);
	const showSubcategoriesTimerRef = useRef<NodeJS.Timer>();
	const wrapperRef = useRef<HTMLDivElement>(null);
	const isHovered = useHover(wrapperRef);
	useEffect(() => {
		if (isHovered) {
			showSubcategoriesTimerRef.current = setTimeout(() => {
				setShowSubcategories(true);
			}, 300);
		} else {
			if (showSubcategories) setShowSubcategories(false);
			clearTimeout(showSubcategoriesTimerRef.current);
		}
	}, [isHovered]);
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
			{subcategories.length !== 0 && showSubcategories && (
				<div className={classes.list_wrapper}>
					<div className={classes.list_separator} />
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
									setShowSubcategories(false);
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
