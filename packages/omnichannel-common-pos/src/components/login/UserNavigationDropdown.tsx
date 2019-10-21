import * as React from "react";
import { isChannelB2c } from "../../redux/utils";
import { Link } from "react-router-dom";
import { TemplatedAnchor } from "../templatedAnchor/TemplatedAnchor";
import OcDropdown from "../ocComponents/OcDropdown";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import loginMessages from "./Login.messages";
import { OcButton, OcButtonType } from "../ocComponents/button/OcButton";

interface UserNavigationDropdownStateProps {
	userId: string;
	changePasswordUrl: string | undefined;
	editProfileUrl: string | undefined;
	serviceLocations: Record<string, string> | undefined;
}

interface UserNavigationDropdownActionProps {
	actions: {
		toggleLogin: () => void;
		handleLogout: () => void;
	};
}

type UserNavigationDropdownProps = UserNavigationDropdownStateProps & UserNavigationDropdownActionProps;

class UserNavigationDropdown extends React.Component<UserNavigationDropdownProps> {

	handleUrlLocator = (serviceName: string): string => {
		if (this.props.serviceLocations) {
			return this.props.serviceLocations[serviceName] || "";
		}
		return "";
	}

	render() {
		const { userId, changePasswordUrl, editProfileUrl, actions } = this.props;

		
		return (
			<OcDropdown trianglePosition="right" position="right" dropdownKey="LoginDropdown-with-user">
				<div className="LoginDropdown-with-user-container">
					{isChannelB2c() && changePasswordUrl && (
						<Link
							to={changePasswordUrl}
							className="dropdown-button"
							id="navbar-change-password-link"
							target="_blank"
						>
							<OcButton id="navbar-change-password" buttonType={OcButtonType.PRIMARY} block={true}>
								<FormattedMessage {...loginMessages.changePassword}/>
							</OcButton>
						</Link>
					)}

					{isChannelB2c() && (
						<TemplatedAnchor
							href={editProfileUrl}
							className="dropdown-button"
							id="navbar-edit-profile-link"
							target="_blank"
							urlLocator={this.handleUrlLocator}
						>
							<OcButton id="navbar-edit-profile" buttonType={OcButtonType.PRIMARY} block={true}>
								<FormattedMessage {...loginMessages.editProfile}/>
							</OcButton>
						</TemplatedAnchor>
					)}

					<OcButton
						id="navbar-sign-out"
						onClick={actions.handleLogout}
						buttonType={OcButtonType.DANGER}
						block={true}
					>
						<FormattedMessage {...loginMessages.signOut}/>
					</OcButton>
				</div>
			</OcDropdown>
		);
	}
}

export {
	UserNavigationDropdownActionProps,
	UserNavigationDropdownStateProps,
	UserNavigationDropdown,
	UserNavigationDropdownProps
};
