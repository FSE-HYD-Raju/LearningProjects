import * as React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";

interface OcPopoverProps {
	children?: React.ReactNode | null;
	className?: string;
	id?: string;
	content: React.ReactNode;
	placement: "top" | "right" | "bottom" | "left";
	trigger: "click" | "hover" | "focus" | Array<string>;
	title?: string;
	show?: boolean;
}

const OcPopover: React.FC<OcPopoverProps> = (props) => {
	const { children, className, id, content, placement, trigger, title, show } = props;
	return show ? (
		<OverlayTrigger
			placement={placement}
			trigger={trigger}
			overlay={
				<Popover
					id={id}
					className={`popover show bs-popover-${placement}`}
					title={title}
				>
					{content}
				</Popover>
			}
		>
			<div className={className}>{children}</div>
		</OverlayTrigger>
	) : (
			<React.Fragment>{children}</React.Fragment>
		);
};

OcPopover.defaultProps = {
	title: "",
	show: true
};

export default OcPopover;
export { OcPopoverProps };
