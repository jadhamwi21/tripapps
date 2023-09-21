import React, { FunctionComponent } from "react";
import classes from "./CategoryFilterItem.module.scss";
import { animated, useSpring } from "@react-spring/web";
import { useIsFirstRender } from "usehooks-ts";
import { ReactSVG } from "react-svg";

type Props = {
	name: string;
	onClick: (category: string) => void;
	checked?: boolean;
	animationDelay?: number;
};

const CategoryFilterItem: FunctionComponent<Props> = ({
	name,
	onClick,
	checked = false,
	animationDelay = 0,
}) => {
	const [springs] = useSpring(() =>
		checked
			? {
					from: { opacity: 0, x: -5 },
					to: { opacity: 1, x: 0 },
					config: { duration: 0.15 * 1000 },
					delay: animationDelay,
			  }
			: {
					from: { opacity: 0 },
					to: { opacity: 1 },
					config: { duration: 0.15 * 1000 },

					delay: animationDelay,
			  }
	);
	return (
		<animated.div
			className={classes.container}
			style={springs as any}
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
		</animated.div>
	);
};

export default CategoryFilterItem;
