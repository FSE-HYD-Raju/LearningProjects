import * as React from "react";
import { FluidContainer } from "../../components/fluid/FluidContainer";

interface OcTransitionProps {
	children: React.ReactNode;
	expanded?: boolean;
}
const OcTransition: React.FC<OcTransitionProps> = (props: OcTransitionProps) => {
	const { children, expanded } = props;
	return (
		<div className="oc-transition">
			<FluidContainer height={expanded ? "auto" : 0}>
				{children}
			</FluidContainer>
		</div>
	);
};

export default OcTransition;
export { OcTransitionProps };
