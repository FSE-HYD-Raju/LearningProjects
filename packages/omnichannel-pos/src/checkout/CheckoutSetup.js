// @flow
import {
	AltContainer,
	cssns,
	Flux,
	contextTypesValidationMap,
} from "omnichannel-common-pos";
import { ConnectedPersonDetailsForm } from "./PersonDetailsForm";
import PropTypes from "prop-types";
import get from "lodash/get";
import pick from "lodash/pick";
import type {
	BasketStoreType,
	CustomerCaseStoreState,
	UserActionsType,
	UserStoreState,
} from "omnichannel-flow-pos";
import { Component } from "react";
const { BasketActions } = Flux;
const { React } = cssns("CheckoutSetup");

type Props = {
	BasketStore: BasketStoreType,
	BasketActions: BasketActions,
	CustomerCaseStore: CustomerCaseStoreState,
	UserActions: UserActionsType,
	UserStore: UserStoreState,
	error: any,
};

export default class POSCheckoutSetup extends Component<Props> {
	static displayName = "POSCheckoutSetup";
	static contextTypes = contextTypesValidationMap;

	static propTypes = {
		BasketStore: PropTypes.shape({
			checkoutSteps: PropTypes.shape({
				SETUP: PropTypes.bool
			})
		}),
		BasketActions: PropTypes.shape({
			activateCheckoutStep: PropTypes.func.isRequired
		}).isRequired,
		CustomerCaseStore: PropTypes.object,
		UserActions: PropTypes.object,
		UserStore: PropTypes.shape({
			updatingUser: PropTypes.bool
		}).isRequired
	};

	componentWillMount() {
		this.props.BasketActions &&
			this.props.BasketActions.activateCheckoutStep({ step: "SETUP" });
	}

	isValid = (valid: boolean): void => {
		const step = get(this.props.BasketStore, "checkoutSteps.SETUP");
		if (step !== valid) {
			this.props.BasketActions &&
				this.props.BasketActions.activateCheckoutStep({
					step: "SETUP",
					valid
				});
		}
	};

	render() {
		const setupDone = Boolean(get(this.props.BasketStore, "checkoutSteps.SETUP"));
		const owner = get(this.props.CustomerCaseStore, "activeCustomerCase.attributes.activeCustomer");

		const hideIdentificationAtCheckoutPage = this.context.flux.reduxStore.getState().feature.hideIdentificationAtCheckoutPage;

		if (owner) {
			return (
				<div className="CheckoutSetup">
					<AltContainer
						stores={{
							...pick(
								this.context.flux.stores,
								"ConsulStore",
								"CustomerCaseStore",
								"UserStore",
							)
						}}
						transform={({ ConsulStore, CustomerCaseStore, UserStore }) => {
							return {
								ConsulStore,
								CustomerCaseStore,
								UserStore,
								hideIdentificationAtCheckoutPage,
							};
						}}
					>
						<ConnectedPersonDetailsForm
							person={owner}
							postalAddress={owner.postalAddresses && owner.postalAddresses[0]}
							error={this.context.flux.reduxStore.getState().error.error}
							/* TODO $FlowFixMe */
							handleInputChange={this.setOwnerAndPlace}
							UserActions={this.props.UserActions}
							BasketActions={this.props.BasketActions}
							BasketStore={this.props.BasketStore}
							CustomerCaseStore={this.props.CustomerCaseStore}
							updatingUser={this.props.UserStore.updatingUser}
							isValid={this.isValid}
							addressIsRequired={true}
							setupDone={setupDone}
							onlyUpdateCustomerCase={true}
						/>
					</AltContainer>
				</div>
			);
		}
		return <span />;
	}
}
