import * as React from "react";
import * as classnames from "classnames";

interface OcButtonGroupProps {
	children?: React.ReactNode;
	vertical?: boolean;
	className?: string;
}

const OcButtonGroup: React.FC<OcButtonGroupProps> = props => {
	const { vertical, className = "" } = props;
	return (
		<div className={classnames({
			"btn-group": true,
			"btn-group-vertical": !!vertical,
			[className || ""]: !!className,
		})
		}>
			{props.children}
		</div>

	);
};
OcButtonGroup.displayName = "OcButtonGroup";

export {
	OcButtonGroupProps,
	OcButtonGroup,
};
