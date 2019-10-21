import * as React from "react";
import { Collapse } from "react-collapse";

interface FluidContainerProps extends Record<string, any> {
	height: string | number;
}

const FluidContainer: React.FC<FluidContainerProps> = props => {
	const { height, children, ...other } = props;

	return (
		<Collapse isOpened={height === "auto"} {...other}>
			{children}
		</Collapse>
	);
};

export {
	FluidContainer,
	FluidContainerProps,
};
