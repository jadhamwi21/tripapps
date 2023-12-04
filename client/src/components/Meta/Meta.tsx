import React from "react";

type Props = { title: string; children: React.ReactNode; description?: string };

const Meta = ({ title, children, description }: Props) => {
	return (
		<>
			<link rel="icon" href="/favicon.ico" sizes="any" />
			<link
				href="/apple-touch-icon.png"
				rel="apple-touch-icon"
				type="image/png"
				sizes="144x144"
			/>
			<link
				rel="icon"
				href="/android-chrome-192x192.png"
				type="image/png"
				sizes="192x192"
			/>
			<title>{title}</title>
			{description && <meta name="description" content={description} />}

			{children}
		</>
	);
};

export default Meta;
