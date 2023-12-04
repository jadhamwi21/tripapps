import React from "react";

type Props = { title: string; children: React.ReactNode; description?: string };

const Meta = ({ title, children, description }: Props) => {
	return (
		<>
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<title>{title}</title>
				{description && <meta name="description" content={description} />}
			</head>
			{children}
		</>
	);
};

export default Meta;
