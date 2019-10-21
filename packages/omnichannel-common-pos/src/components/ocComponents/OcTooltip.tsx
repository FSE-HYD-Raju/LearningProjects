import * as React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

interface OcTooltipProps {
	children?: React.ReactNode | null;
	id?: string;
	message: React.ReactElement<any> | string;
	placement: "top" | "right" | "bottom" | "left";
	show?: boolean;
}

const OcTooltip: React.FC<OcTooltipProps> = (props) => {
	const { children, id, message, placement, show } = props;
	return show ? (
		<OverlayTrigger
			placement={placement}
			trigger={["hover"]}
			overlay={
				<Tooltip
					id={id}
					className={`tooltip show bs-tooltip-${placement}`}
				>
					{message}
				</Tooltip>
			}
		>
			<div>{children}</div>
		</OverlayTrigger>
	) : (
		<React.Fragment>{children}</React.Fragment>
	);
};

OcTooltip.defaultProps = {
	show: true
};

export default OcTooltip;
export { OcTooltipProps };
