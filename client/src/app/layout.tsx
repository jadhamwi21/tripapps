import "./index.css";
import Header from "@/layouts/Header/Header";
import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Header />
				{children}
			</body>
		</html>
	);
}
