import * as classnames from "classnames";
import cssns from "../../../utils/cssnsConfig";
import { Children, cloneElement, FC, ReactChild, ReactElement, ReactNode } from "react";
const { React } = cssns("OcInputContainer");

enum OcInputLabelPosition {
	TOP = "TOP",
	LEFT = "LEFT",
	RIGHT = "RIGHT",
	BOTTOM = "BOTTOM",
	NONE = "NONE",
}

enum OcInputErrorLevel {
	WARNING = "WARNING",
	ERROR = "ERROR",
}

interface OcInputContainerProps {
	labelPosition?: keyof typeof OcInputLabelPosition;
	label?: ReactNode;
	errorLevel?: keyof typeof OcInputErrorLevel;
	errorMessage?: string;
	className?: string;
	labelColor?: string;
	required?: boolean;
	children?: ReactNode;
	addonRight?: ReactChild;
	addonLeft?: ReactChild;
	labelWidth?: string;
	id?: string;
}

const OcInputContainer: FC<OcInputContainerProps> = props => {
	const isVerticalContainer = !(props.labelPosition === OcInputLabelPosition.LEFT || props.labelPosition === OcInputLabelPosition.RIGHT);
	const containerClasses = classnames({
		container: true,
		vertical: isVerticalContainer,
		"has-warning": props.errorLevel === OcInputErrorLevel.WARNING,
		"has-error": props.errorLevel === OcInputErrorLevel.ERROR,
		"input-group": !!props.addonRight || !!props.addonLeft,
		"container-label-top": props.labelPosition === OcInputLabelPosition.TOP,
		"container-label-bottom": props.labelPosition === OcInputLabelPosition.BOTTOM,
		"container-label-left": props.labelPosition === OcInputLabelPosition.LEFT,
		"container-label-right": props.labelPosition === OcInputLabelPosition.RIGHT,
	});

	const labelClasses = classnames({
		"control-label": true,
		"control-label-left": props.labelPosition === OcInputLabelPosition.LEFT,
		"control-label-right": props.labelPosition === OcInputLabelPosition.RIGHT,
	});

	return (
		<div className={containerClasses}>
			{props.labelPosition !== OcInputLabelPosition.NONE &&
				<label className={labelClasses} style={{color: props.labelColor, minWidth: props.labelWidth}} htmlFor={props.id}>
					<div className="label-row">
						{props.label}
						{props.required && <i className="fa fa-asterisk"/>}
					</div>
				</label>
			}
			<div className="input-row">
				{props.addonLeft && <span className="input-group-btn addon">{props.addonLeft}</span>}
				{Children.map(props.children, (child: ReactNode) => {
					if (child) {
						return cloneElement(child as ReactElement<any>, {
							required: props.required,
							id: props.id,
							className: props.className,
							...(child as ReactElement<any>).props
						});
					}
					return null;
				})}
				{props.addonRight && <span className="input-group-btn addon">{props.addonRight}</span>}
				{props.errorMessage && <div className="floating-help-block help-block">{props.errorMessage}</div>}
			</div>
		</div>
	);
};

export {
	OcInputLabelPosition,
	OcInputErrorLevel,
	OcInputContainerProps,
	OcInputContainer
};
