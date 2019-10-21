import * as R from "react";
import cssns from "../../utils/cssnsConfig";
import * as classnames from "classnames";
const React = cssns("OcHighlightBox").React as typeof R;

interface OcHighlightBoxProps {
	children?: React.ReactNode;
	className?: string;
	position?: "top" | "right" | "bottom" | "left";
	style?: React.CSSProperties;
}

const OcHighlightBox: React.FC<OcHighlightBoxProps> = props => {
	const { children, className, position, style } = props;
	const classNames = classnames("this", {
		top: position === "top",
		right: position === "right",
		bottom: position === "bottom",
		left: position === "left" || !position,
		[`${className}`]: !!className
	});

	return (
		<div className={classNames} style={{ ...style }}>
			<div>{children}</div>
		</div>
	);
};

export default OcHighlightBox;
export { OcHighlightBoxProps };
