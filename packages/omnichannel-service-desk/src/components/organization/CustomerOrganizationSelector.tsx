import {
	cssns,
	ContextType,
	FormattedMessage,
	contextTypesValidationMap,
	OcButton,
	OcButtonType
} from "omnichannel-common-pos";
import { Component } from "react";
import CreateOrganizationContainer from "./CreateOrganizationContainer";
import CustomerSearchFormContainer from "../newcustomer/CustomerSearchFormContainer";
import messages from "./Organization.messages";

const { React } = cssns("CustomerOrganizationSelector");

interface CustomerOrganizationSelectorProps {
	hideCreateOrganizationButton?: boolean;
}

interface CustomerOrganizationSelectorState {
	showCustomerCreationModal: boolean;
	showOrganizationCreationModal: boolean;
}

class CustomerOrganizationSelector extends Component<CustomerOrganizationSelectorProps, CustomerOrganizationSelectorState> {
	static contextTypes = contextTypesValidationMap;

	constructor(props: CustomerOrganizationSelectorProps, context: ContextType) {
		super(props, context);
		this.state = {
			showCustomerCreationModal: false,
			showOrganizationCreationModal: false
		};
	}

	render() {
		const {
			showCustomerCreationModal,
			showOrganizationCreationModal
		} = this.state;

		const hideCreateOrganization = this.props.hideCreateOrganizationButton;

		return (
			<div>
				{!showCustomerCreationModal && !showOrganizationCreationModal && (
					<div className="CustomerOrganizationSelector">
						<OcButton
							className="col input"
							buttonType={OcButtonType.PRIMARY}
							id="pos-create-individual-button"
							onClick={() =>
								this.setState({
									showCustomerCreationModal: true
								})}
						>
							<FormattedMessage {...messages.createIndividual} />
						</OcButton>
						{!hideCreateOrganization &&
						<OcButton
							className="col input"
							buttonType={OcButtonType.PRIMARY}
							id="pos-create-organization-button"
							onClick={() =>
								this.setState({
									showOrganizationCreationModal: true
								})}
						>
							<FormattedMessage {...messages.createOrganization}/>
						</OcButton>
						}
					</div>
				)}

				{(showCustomerCreationModal && (<CustomerSearchFormContainer flux={this.context.flux} />))
				|| (showOrganizationCreationModal && (<CreateOrganizationContainer {...this.props} />))}
			</div>
		);
	}
}

export default CustomerOrganizationSelector;
export {
	CustomerOrganizationSelectorProps,
};
