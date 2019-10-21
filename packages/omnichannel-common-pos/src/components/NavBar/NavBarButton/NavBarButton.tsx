import * as classnames from "classnames";
import cssns from "../../../utils/cssnsConfig";
import * as R from "react";
const React = cssns("NavBarButton").React as typeof R;

export interface NavBarButtonProps {
	id?: string;
	active?: boolean;
	handleClick?: () => void;
	badge?: number | string;
	icon?: React.ReactElement<any>;
	children: React.ReactNode;
}

const NavBarButton: React.FC<NavBarButtonProps> = (props: NavBarButtonProps) => {
	return (
		<div
			data-customizable
			className={classnames({
				"w-action-item": true,
				active: props.active
			})}
			id={props.id}
			onClick={props.handleClick}
		>
			<button type="button" className="w-action-item-button">
				{props.icon && <div className="w-action-item-icon">{props.icon}</div>}
				<div className="w-action-item-label">
					<span className="w-action-item-label-children">{props.children}</span>
					{props.badge && <span className="badge badge-success">{props.badge}</span>}
				</div>
			</button>
		</div>
	);
};

export default NavBarButton;
