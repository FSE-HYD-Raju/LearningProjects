/*
    Returns an icon with a round background
    <OcIcon type="person" backgroundColor="none" />
*/
import * as R from "react";
import cssns from "../../utils/cssnsConfig";
const React = cssns("OcIcon").React as typeof R;

interface OcIconProps {
	type: "person" | "person-white" | "plan" | "place";
	// override styles if necessary
	style?: React.CSSProperties;
}

const OcIcon: React.FC<OcIconProps> = props => {
	let classes = "";

	let icon;
	switch (props.type) {
		case "person":
			icon = "icon-person.svg";
			classes += " person";
			break;
		case "person-white":
			icon = "icon-person-white.svg";
			classes += " person";
			break;
		case "plan":
			icon = "icon-plan-white.svg";
			classes += " plan";
			break;
		case "place":
			icon = "icon-globe.svg";
			classes += " place";
			break;
		default:
			icon = "icon-acme.svg";
			classes += " acme";
	}

	return (
		<div
			style={{...props.style}}
			className={`holder ${classes}`}
		>
			<img
				className="icon"
				alt={props.type}
				src={`/static/img/${icon}`}
			/>
		</div>
	);
};

export default OcIcon;
export { OcIconProps };
