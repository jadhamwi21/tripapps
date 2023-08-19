"use client";
import React, { FunctionComponent } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface OwnProps {}

type Props = { children: React.ReactNode };

const initial = { opacity: 0 };
const animate = { opacity: 1 };
const transition = { duration: 0.6, ease: "easeInOut" };

const PageWrapper: FunctionComponent<Props> = ({ children }) => {
  const key = usePathname();
  return (
    <motion.div
      initial={initial}
      animate={animate}
      key={key}
      transition={transition}
      style={{ padding: "1em" }}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
