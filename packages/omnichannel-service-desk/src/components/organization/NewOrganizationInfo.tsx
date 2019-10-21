"use strict";

import * as React from "react";
import { Component } from "react";
import { FormattedMessage, OcButton, OcButtonType } from "omnichannel-common-pos";
import messages from "./Organization.messages";

interface NewOrganizationInfoProps {
	actions: {
		clearOrganizationState?: () => void;
		showCustomerCreationModal?: (show: boolean) => void;
	};
}

class NewOrganizationInfo extends Component<NewOrganizationInfoProps> {

	componentWillUnmount() {
		if (this.props.actions.clearOrganizationState) {
			this.props.actions.clearOrganizationState();
		}
	}

	handleClose = () => {
		if (this.props.actions.clearOrganizationState) {
			this.props.actions.clearOrganizationState();
		}
		if (this.props.actions.showCustomerCreationModal) {
			this.props.actions.showCustomerCreationModal(false);
		}
	};

	render() {
		return (
			<div className="organization-creation-success">
				<FormattedMessage {...messages.organizationWasCreatedSuccessfully}/>
				<footer className="customerDataFormFooter modal-footer">
					<OcButton
						id="organization-creation-success-ok-button"
						buttonType={OcButtonType.SUCCESS}
						htmlBtnType="submit"
						onClick={this.handleClose}
					>
						<FormattedMessage {...messages.organizationCustomerCreated}/>
					</OcButton>
				</footer>
			</div>
		);
	}
}

export default NewOrganizationInfo;
export {
	NewOrganizationInfoProps
};
