import Image from "next/image";
import { FunctionComponent } from "react";
import classes from "./CategoryFilterItem.module.scss";
import { ReactSVG } from "react-svg";

type Props = {
	name: string;
	onClick: (category: string) => void;
};

const CategoryFilterItem: FunctionComponent<Props> = ({ name, onClick }) => {
	return (
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
	);
};

export default CategoryFilterItem;
