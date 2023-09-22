"use client";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import classes from "./Select.module.scss";
import { useOnClickOutside } from "usehooks-ts";
import { useSpring } from "@react-spring/web";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { ReactSVG } from "react-svg";
interface OwnProps {}

interface IListItem {
	name: string;
	value: any;
	icon?: string;
}

type Props = {
	value: string;
	onChange: (val: any) => void;
	styles?: React.CSSProperties;
	label?: string;
	list: IListItem[];
	disabled?: boolean;
};

const Select: FunctionComponent<Props> = ({
	value,
	onChange,
	label,
	styles,
	list,
	disabled = false,
}) => {
	const [toggled, setToggled] = useState(false);

	const selectedItem = list.find((listItem) => listItem.value === value);
	const ref = useRef<HTMLDivElement>(null);
	useOnClickOutside(ref, () => {
		setToggled(false);
	});
	return (
		<div
			ref={ref}
			style={styles}
			className={
				disabled
					? [classes.container, classes.disabled].join(" ")
					: classes.container
			}
		>
			{label && <p className={classes.label}>{label}</p>}
			<div
				className={classes.field}
				onClick={() => setToggled((prev) => !prev)}
			>
				{selectedItem && (
					<p className={classes.value}>
						{selectedItem.icon && (
							<ReactSVG className={classes.icon} src={selectedItem.icon} />
						)}
						<div>{selectedItem.value}</div>
					</p>
				)}
				<div className={classes.toggler_container}>
					{toggled ? (
						<FontAwesomeIcon icon={faCaretUp} />
					) : (
						<FontAwesomeIcon icon={faCaretDown} />
					)}
				</div>
			</div>
			<div
				className={classes.list}
				style={
					toggled
						? { opacity: 1, pointerEvents: "all" }
						: { opacity: 0, pointerEvents: "none" }
				}
			>
				{list.map((listItem) => (
					<div
						className={classes.list_item}
						key={listItem.value}
						onClick={() => {
							onChange(listItem.value);
							setToggled(false);
						}}
					>
						{listItem.icon && (
							<ReactSVG className={classes.icon} src={listItem.icon} />
						)}
						<div>{listItem.name}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Select;
