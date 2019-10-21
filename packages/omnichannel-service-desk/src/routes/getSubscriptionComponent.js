import React from "react";
import { AltContainer, actions } from "omnichannel-common-pos";
import pick from "lodash/pick";
import get from "lodash/get";
import flatMap from "lodash/flatMap";
import merge from "lodash/merge";

const getSubscriptionComponent = (flux, Component, props) => (
	<AltContainer
		stores={{
			BasketStore: flux.stores.BasketStore,
			CustomerCaseStore: flux.stores.CustomerCaseStore,
			DigitalLifeStore: flux.stores.DigitalLifeStore,
			SalesStore: flux.stores.SalesStore,
		}}
		actions={{
			BasketActions: flux.actions.BasketActions,
			DigitalLifeActions: flux.actions.DigitalLifeActions,
			SalesActions: flux.actions.SalesActions,
		}}
		transform={({
			BasketActions,
			BasketStore,
			CustomerCaseStore,
			SalesActions,
			SalesStore,
			LifecycleActions,
			DigitalLifeActions,
			DigitalLifeStore,
		}) => {
			const lifecycle = flux.reduxStore.getState().lifecycle;

			const serviceModificationResult = get(BasketStore, "submittedBasket")
				? {
						basket: get(BasketStore, "submittedBasket"),
						stateTransition: get(lifecycle, "productModification.resource.attributes.stateTransition")
					}
				: get(lifecycle, "serviceModificationResult");
			const products =
				CustomerCaseStore.agreements &&
				flatMap(CustomerCaseStore.agreements, agreement => {
					const { id } = agreement;
					const products =
						get(agreement, "attributes.products") ||
						get(agreement, "products");
					return products.map(p => {
						return merge(p, { agreementId: id });
					});
				});



			return {
				products,
				serviceModificationResult,
				...pick(
					BasketActions,
					"discardBasket",
					"enableAddon",
					"initializeAddonEnabling",
					"clearAddonInitializations",
					"submitBasket",
					"discardBackendBasket"
				),
				...pick(
					BasketStore,
					"addonUpdateInProgress",
					"addonSuccessfullyUpdated",
					"initializedAddon",
					"addonInitializeInProgress",
					"addonEnableError",
					"submittedBasket"
				),
				...pick(CustomerCaseStore, "activeCustomerCase", "agreements"),
				...pick(DigitalLifeStore, "user"),
				...pick(DigitalLifeActions, "getAgreements"),
				acceptAddonProductLifecycleStatusChange: (basketId, paymentMethodId) => {
					flux.reduxStore.dispatch(actions.lifecycle.acceptProductLifecycleStatusChange(basketId, paymentMethodId));
				},
				acceptServiceLifecycleStatusChange: (basketId) => {
					flux.reduxStore.dispatch(actions.lifecycle.acceptServiceLifecycleStatusChange(basketId));
				},
				cancelLifecycleStatusChange: (basketId) => {
					flux.reduxStore.dispatch(actions.lifecycle.cancelLifecycleStatusChange(basketId));
				},
				initializeServiceStateTransition: (params) => {
					flux.reduxStore.dispatch(actions.lifecycle.initializeServiceStateTransition(params));
				},
				initializeAddonProductStateTransition: (params) => {
					flux.reduxStore.dispatch(actions.lifecycle.initializeProductStateTransition(params));
				},
				resetServiceModificationResult: () => {
					flux.reduxStore.dispatch(actions.lifecycle.resetStateModificationResult());
				},
				fetchReasons: (id, type) => {
					flux.reduxStore.dispatch(actions.lifecycle.fetchReasons(id, type));
				},
				setTransition: (transition) => {
					flux.reduxStore.dispatch(actions.lifecycle.setTransition(transition));
				},
				setSelectedService: (service) => {
					flux.reduxStore.dispatch(actions.lifecycle.setSelectedService(service));
				},
				clearTransitionState: () => {
					flux.reduxStore.dispatch(actions.lifecycle.clearTransitionState());
				},
				productModification: lifecycle.productModification,
				reasons: lifecycle.reasons,
				transition: lifecycle.transition,
				selectedService: lifecycle.selectedService,
				stateTransitionByActionName: lifecycle.stateTransitionByActionName,
				serviceStateTransitionByActionName: lifecycle.serviceStateTransitionByActionName,
				configuration: flux.reduxStore.getState().productOfferingConfiguration.configurations,
				resetConfigurations: () => {
					flux.reduxStore.dispatch(actions.productOfferingConfiguration.resetConfigurations());
				},
				selectProductOffering: (path, value: string, productOfferings) => {
					flux.reduxStore.dispatch(actions.productOfferingConfiguration.selectProductOffering(path, value, productOfferings));
				},
				setInputtedCharacteristic: (path, key, value) => {
					flux.reduxStore.dispatch(actions.productOfferingConfiguration.setInputtedCharacteristic(path, key, value));
				},
				toggleProductOffering: (path, forceToggle: boolean) => {
					flux.reduxStore.dispatch(actions.productOfferingConfiguration.toggleProductOffering(path, forceToggle));
				},
				...pick(
					SalesActions,
					"commitProductReplace",
					"getAlternateOfferingsForProduct",
					"getAvailableAddonProducts",
					"getAvailableMobilePhones",
					"getProductById",
					"getProductsByIds",
					"getProductsFromCategory",
					"getSubCategories",
					"initializeProductReplace",
					"saveTargetAgreementId",
					"submitProductConfiguration",
					"resetProductConfiguration",
					"resetProductChange",
					"getAvailablePlans",
					"initializeNewPlanOrder",
					"submitNewPlanOrder",
					"resetNewPlanOrder"
				),
				availableAddons: SalesStore.products,
				availablePhones: SalesStore.phones,
				productOfferings: SalesStore.products,
				phonesCategoryId: SalesStore.phonesCategoryId,
				...pick(
					SalesStore,
					"alternateProductOfferings",
					"eligiblePaymentMethods",
					"focusedProductId",
					"paymentInfo",
					"product",
					"productConfigurationSummary",
					"productConfigurationErrors",
					"plans",
					"submittedNewPlanBasket",
					"submittedNewPlanBasketItems",
					"newPlanPaymentInfo"
				),
				callForwardingServices: flux.reduxStore.getState().service.callForwardingServices,
				callForwardingReasonCode: flux.reduxStore.getState().service.callForwardingReasonCode,
				callForwardingConfigurationErrors: flux.reduxStore.getState().service.callForwardingConfigurationErrors,
				callForwardingConfigurationResult: flux.reduxStore.getState().service.callForwardingConfigurationResult,
				submitCallForwardingConfiguration: (configuration, individualId, agreementId) => {
					flux.reduxStore.dispatch(actions.service.submitCallForwardingConfiguration(configuration, individualId, agreementId));
				},
				resetCallForwardingConfiguration: () => {
					flux.reduxStore.dispatch(actions.service.resetCallForwardingConfiguration());
				},
			};
		}}
	>
		<Component {...props} />
	</AltContainer>
);

export default getSubscriptionComponent;
