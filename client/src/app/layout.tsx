"use client";
import "./index.css";
import Header from "@/layouts/Header/Header";
import React from "react";
import { AnimatePresence } from "framer-motion";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Header />
				<AnimatePresence mode="wait" initial={false}>
					{children}
				</AnimatePresence>
			</body>
		</html>
	);
}
