import * as React from "react";
import { Location, LocationDescriptor } from "history";
import { NavLink } from "react-router-dom";

interface OcTabLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	activeClassName?: string;
	activeStyle?: React.CSSProperties;
	exact?: boolean;
	innerRef?: (node: HTMLAnchorElement | null) => void;
	location?: Location<any>;
	onlyActiveOnIndex?: boolean;
	replace?: boolean;
	strict?: boolean;
	to: LocationDescriptor<any>;
}

const OcTabLink: React.FC<OcTabLinkProps> = (props: OcTabLinkProps) => (
	<NavLink
		id={props.id}
		style={{ ...props.style }}
		exact={props.onlyActiveOnIndex}
		to={props.to}
		activeClassName={`active ${props.activeClassName}`}
		activeStyle={props.activeStyle}
		strict={props.strict}
		className={`nav-link ${props.className}`}
		location={props.location}
		replace={props.replace}
		innerRef={props.innerRef}
	>
		{props.children}
	</NavLink>
);

OcTabLink.defaultProps = {
	className: "",
	activeClassName: "",
	onlyActiveOnIndex: false
};

export default OcTabLink;
export { OcTabLinkProps };
