import * as React from "react";
import { isChannelPos } from "../../redux/utils";

import messages from "../../commonMessages";
import OcDropdown from "../ocComponents/OcDropdown";
import { LoginForm } from "./LoginForm";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import loginMessages from "./Login.messages";
import LoginContainerRedux from "./LoginContainerRedux";
import { RouteComponentProps, withRouter } from "react-router";
import { ContextType, contextTypesValidationMap } from "../../types";

type NoUserDropdownProps = RouteComponentProps<any>;

class NoUserDropdown extends React.PureComponent<NoUserDropdownProps> {

	static contextTypes = contextTypesValidationMap;

	constructor(props: NoUserDropdownProps, context: ContextType) {
		super(props, context);
	}

	toggleRegistration = (): void => {
		window.console.warn("NOT IMPLEMENTED!!!");
	}

	render() {
		return (
			<OcDropdown
				trianglePosition="right"
				position="right"
				dropdownKey="login-dropdown-no-user"
			>
				<div className="login-dropdown" /*style={{ width: "250px", padding: "18px" }}*/>
					<LoginContainerRedux flux={this.context.flux}>
						<LoginForm id="LoginDropdown"/>
					</LoginContainerRedux>

					{this.props.location.state && this.props.location.state.tokenExpired && (
						<div /*style={{ width: "100%", padding: "16px" }} */ className="text-center">
						<span className="label label-danger"/*style={{ width: "100%", padding: "8px" }}*/>
							<FormattedMessage {...messages.loginSessionExpired}/>
						</span>
						</div>
					)}

					{!isChannelPos() && (
						<div className="login-dropdown-register">
							<span /*style={{color: "#777"}}*/>
								<FormattedMessage {...loginMessages.newCustomer}/>
							</span>
							<a
								id="LoginDropdown-register-link"
								/*style={{ paddingLeft: "6px" }}*/
								onClick={this.toggleRegistration}
							>
								<FormattedMessage {...loginMessages.register}/>
							</a>
						</div>
					)}
				</div>
			</OcDropdown>
		);
	}
}

export default withRouter(NoUserDropdown);
