import * as React from "react";
import * as classnames from "classnames";

interface OcTabProps {
	id?: string;
	index?: number;
	children?: React.ReactNode;
	active?: boolean;
	disabled?: boolean;
	dropdown?: boolean;
}

const OcTab: React.FC<OcTabProps> = props => {
	const { id, index, children, active, disabled, dropdown } = props;

	return (
		<li
			id={id}
			key={id || index}
			className={classnames({
				active,
				disabled,
				dropdown
			})}
			style={{
				cursor: !disabled ? "pointer" : "not-allowed"
			}}
		>
			{children && React.Children.map(children, (child: any, childIndex: number) => {
				return child && child.type && child.type === "a"
					? child
					: <a key={child && child.id || childIndex} className={classnames({"dropdown-toggle": dropdown})}>
						{child}
						{dropdown && <span>{" "}<span className="caret"/></span>}
					</a>;
				})
			}
	</li>);
};

OcTab.displayName = "OcTab";

export {
	OcTabProps,
	OcTab,
};
