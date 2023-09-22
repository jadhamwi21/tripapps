import React, { FunctionComponent } from "react";

interface OwnProps {}

type Props = { children: React.ReactNode };

const PageWrapper: FunctionComponent<Props> = ({ children }) => {
	return <div>{children}</div>;
};

export default PageWrapper;
