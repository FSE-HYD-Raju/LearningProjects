import * as React from "react";
import * as classnames from "classnames";

interface OcTabGroupProps {
	children?: React.ReactNode;
	asPills?: boolean;
}

const OcTabGroup: React.FC<OcTabGroupProps> = props => {
	return (
		<ul
			className={classnames({
				nav: true,
				"nav-tabs": !props.asPills,
				"nav-pills": props.asPills
			})}
		>
			{props.children}
		</ul>
	);
};
OcTabGroup.displayName = "OcTabGroup";

export {
	OcTabGroup,
	OcTabGroupProps,
};
