import "./index.css";
import Header from "@/layouts/Header/Header";
import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Header />
				<ToastContainer
					position={"top-right"}
					hideProgressBar
					newestOnTop
					closeOnClick
					theme="dark"
				/>
				{children}
			</body>
		</html>
	);
}
