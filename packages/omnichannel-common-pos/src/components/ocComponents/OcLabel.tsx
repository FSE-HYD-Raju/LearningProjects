import * as React from "react";
import * as classnames from "classnames";

enum OcLabelTypes {
	DEFAULT = "DEFAULT",
	PRIMARY = "PRIMARY",
	SUCCESS = "SUCCESS",
	WARNING = "WARNING",
	DANGER = "DANGER",
	INFO = "INFO",
}

interface OcLabelProps {
	children?: React.ReactNode;
	labelType: keyof typeof OcLabelTypes;
}

const OcLabel: React.FC<OcLabelProps> = props => {
	return (
		<span className={classnames({
			label: true,
			"label-default": props.labelType === OcLabelTypes.DEFAULT,
			"label-primary": props.labelType === OcLabelTypes.PRIMARY,
			"label-success": props.labelType === OcLabelTypes.SUCCESS,
			"label-warning": props.labelType === OcLabelTypes.WARNING,
			"label-danger": props.labelType === OcLabelTypes.DANGER,
			"label-info": props.labelType === OcLabelTypes.INFO
		})}>
			{props.children}
		</span>
	);
};
OcLabel.displayName = "OcLabel";

export {
	OcLabel,
	OcLabelProps,
	OcLabelTypes
};
