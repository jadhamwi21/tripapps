import React, { FunctionComponent } from "react";

interface OwnProps {}

type Props = { children: React.ReactNode };

const PageWrapper: FunctionComponent<Props> = ({ children }) => {
	return <div className="page">{children}</div>;
};

export default PageWrapper;
