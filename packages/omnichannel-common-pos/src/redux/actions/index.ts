import { Action } from "redux";
import * as types from "../types";

import { auth, AuthActions } from "../models/auth/auth.actions";
export { auth, AuthActions } from "../models/auth/auth.actions";

import { b2cCheckout, B2CCheckoutActions } from "../models/b2cCheckout/b2cCheckout.actions";
export { b2cCheckout, B2CCheckoutActions } from "../models/b2cCheckout/b2cCheckout.actions";

import { base, BaseActions } from "../models/base/base.actions";
export { base, BaseActions } from "../models/base/base.actions";

import { basket, BasketActions } from "../models/basket/basket.actions";
export { basket, BasketActions } from "../models/basket/basket.actions";

import { category, CategoryActions } from "../models/category/category.actions";
export { category, CategoryActions } from "../models/category/category.actions";

import { cmsAdmin, CmsAdminActions } from "../models/cmsAdmin/cmsAdmin.actions";
export { cmsAdmin, CmsAdminActions } from "../models/cmsAdmin/cmsAdmin.actions";

import { cms, CmsActions } from "../models/cms/cms.actions";
export { cms, CmsActions } from "../models/cms/cms.actions";

import { comparison, ComparisonActions } from "../models/comparison/comparison.actions";
export { comparison, ComparisonActions } from "../models/comparison/comparison.actions";

import { consul, ConsulActions } from "../models/consul/consul.actions";
export { consul, ConsulActions } from "../models/consul/consul.actions";

import { currency, CurrencyActions } from "../models/currency/currency.actions";
export { currency, CurrencyActions } from "../models/currency/currency.actions";

import { customer, CustomerActions } from "../models/customer/customer.actions";
export { customer, CustomerActions } from "../models/customer/customer.actions";

import { customerCase, CustomerCaseActions } from "../models/customerCase/customerCase.actions";
export { customerCase, CustomerCaseActions } from "../models/customerCase/customerCase.actions";

import { delivery, DeliveryActions } from "../models/delivery/delivery.actions";
export { delivery, DeliveryActions, DeliveryActionPayload } from "../models/delivery/delivery.actions";

import { changeSim, ChangeSimActions } from "../models/eCare/changeSim/changeSim.actions";
export { changeSim, ChangeSimActions, ChangeSimActionPayload } from "../models/eCare/changeSim/changeSim.actions";

import { changePlan, ChangePlanActions } from "../models/eCare/changeTariffPlan/changePlan.actions";
export { changePlan, ChangePlanActions, ChangePlanActionPayload } from "../models/eCare/changeTariffPlan/changePlan.actions";

import { recurringTopUp, RecurringTopUpActions } from "../models/eCare/recurringTopUp/recurringTopUp.actions";
export { recurringTopUp, RecurringTopUpActions, RecurringTopUpActionPayload } from "../models/eCare/recurringTopUp/recurringTopUp.actions";

import { digitalLife, DigitalLifeActions } from "../models/digitalLife/digitalLife.actions";
export { digitalLife, DigitalLifeActions, DigitalLifeActionPayload } from "../models/digitalLife/digitalLife.actions";

import { activateSim, ActivateSimActions } from "../models/eCare/activateSim/activateSim.actions";
export { activateSim, ActivateSimActions, ActivateSimActionPayload } from "../models/eCare/activateSim/activateSim.actions";

import { suspension, SuspensionActions } from "../models/eCare/suspension/suspension.actions";
export { suspension, SuspensionActions, SuspensionActionPayload } from "../models/eCare/suspension/suspension.actions";

import { document, DocumentActions } from "../models/document/document.actions";
export { document, DocumentActions } from "../models/document/document.actions";

import { error, ErrorActions } from "../models/error/error.actions";
export { error, ErrorActions } from "../models/error/error.actions";

import { basketError, BasketErrorActions } from "../models/basketError/basketError.actions";
export { basketError, BasketErrorActions } from "../models/basketError/basketError.actions";

import { feature, FeatureActions } from "../models/feature/feature.actions";
export { feature, FeatureActions } from "../models/feature/feature.actions";

import { lifecycle, LifecycleActions } from "../models/lifecycle/lifecycle.actions";
export { lifecycle, LifecycleActions } from "../models/lifecycle/lifecycle.actions";

import { loadingOverlay, LoadingOverlayActions } from "../models/loadingOverlay/loadingOverlay.actions";
export { loadingOverlay, LoadingOverlayActions } from "../models/loadingOverlay/loadingOverlay.actions";

import { location, LocationActions } from "../models/location/location.actions";
import { LocationItem } from "../models/location/location.types";
export { location, LocationActions } from "../models/location/location.actions";

import { msisdn, MsisdnActions } from "../models/msisdn/msisdn.actions";
export { msisdn, MsisdnActions } from "../models/msisdn/msisdn.actions";

import { navBar, NavBarActions } from "../models/navBar/navBar.actions";
export { navBar, NavBarActions } from "../models/navBar/navBar.actions";

import { notification, NotificationActions } from "../models/notification/notification.actions";
export { notification, NotificationActions } from "../models/notification/notification.actions";

import { Identification } from "../types/Identification";
import { organization, OrganizationActions } from "../models/organization/organization.actions";
export { organization, OrganizationActions } from "../models/organization/organization.actions";

import { payment, PaymentActions } from "../models/payment/payment.actions";
export { payment, PaymentActions } from "../models/payment/payment.actions";

import { portIn, PortInActions } from "../models/portIn/portIn.actions";
export { portIn, PortInActions } from "../models/portIn/portIn.actions";

import { marketingConsent, MarketingConsentActions } from "../models/marketingConsent/marketingConsent.actions";
export { marketingConsent, MarketingConsentActions } from "../models/marketingConsent/marketingConsent.actions";

import { posCheckout, PosCheckoutActions } from "../models/posCheckout/posCheckout.actions";
export { posCheckout, PosCheckoutActions } from "../models/posCheckout/posCheckout.actions";

import {
	productOfferingConfiguration,
	ProductOfferingConfigurationActions
} from "../models/productOfferingConfiguration/productOfferingConfiguration.actions";
export {
	productOfferingConfiguration,
	ProductOfferingConfigurationActions
} from "../models/productOfferingConfiguration/productOfferingConfiguration.actions";

import { productLoan, ProductLoanActions } from "../models/productLoan/productLoan.actions";
export { productLoan, ProductLoanActions } from "../models/productLoan/productLoan.actions";

import { sales, SalesActions } from "../models/sales/sales.actions";
export { sales, SalesActions } from "../models/sales/sales.actions";

import { salesRepSession, SalesRepSessionActions } from "../models/salesRepSession/salesRepSession.actions";
export { salesRepSession, SalesRepSessionActions } from "../models/salesRepSession/salesRepSession.actions";

import { schema, SchemaActions } from "../models/schema/schema.actions";
export { schema, SchemaActions } from "../models/schema/schema.actions";

import { service, ServiceActions } from "../models/service/service.actions";
export { service, ServiceActions } from "../models/service/service.actions";

import { session, SessionActions } from "../models/session/session.actions";
export { session, SessionActions } from "../models/session/session.actions";

import { toaster, ToasterActions } from "../models/toaster/toaster.actions";
export { toaster, ToasterActions } from "../models/toaster/toaster.actions";

import { translation, TranslationActions } from "../models/translation/translation.actions";
export { translation, TranslationActions } from "../models/translation/translation.actions";

import { uriLocation, UriLocationActions } from "../models/uriLocation/uriLocation.actions";
export { uriLocation, UriLocationActions } from "../models/uriLocation/uriLocation.actions";

import { user, UserActions } from "../models/user/user.actions";
export { user, UserActions } from "../models/user/user.actions";

import { versionInformation, VersionInformationActions } from "../models/versionInformation/versionInformation.actions";
export { versionInformation, VersionInformationActions } from "../models/versionInformation/versionInformation.actions";

import { eligibility, EligibilityActions } from "../models/eligibility/eligibility.actions";
import { EligibilityDecisionUseCase, RecipeId } from "../models/eligibility/eligibility.types";
export { eligibility, EligibilityActions } from "../models/eligibility/eligibility.actions";

import { productOfferings, ProductOfferingsActions } from "../models/productOfferings/productOfferings.actions";
import {
	QueryStates,
	ProductOfferings,
	ProductOfferingsState
} from "../models/productOfferings/productOfferings.types";
import { Cardinality, CommercialEnrichments, ProductOfferingAttributes } from "../types";
export { productOfferings, ProductOfferingsActions } from "../models/productOfferings/productOfferings.actions";

import { LocationDescriptorObject } from "history";
export { LocationDescriptorObject } from "history";

import { routerActions } from "connected-react-router";

import {
	customerInteractions,
	CustomerInteractionsActions
} from "../models/customerInteractions/customerInteractions.actions";
export {
	customerInteractions,
	CustomerInteractionsActions,
	CustomerInteractionsActionPayload
} from "../models/customerInteractions/customerInteractions.actions";

import { support, SupportActions } from "../models/support/support.actions";
import { ChangeSimServiceSubmitData } from "../services/ChangeSimService";
import { ErrorForModal, Error } from "../services/ErrorContainer";
export { support, SupportActions } from "../models/support/support.actions";

import { MsisdnSelectionUseCase } from "../models/msisdnSelection/msisdnSelection.types";
import { msisdnSelection, MsisdnSelectionActions } from "../models/msisdnSelection/msisdnSelection.actions";
import { InitializeAddonConfig } from "../services/AddonService";
export { msisdnSelection, MsisdnSelectionActions } from "../models/msisdnSelection/msisdnSelection.actions";
import { ProvinceAndCityPayload, provinceAndCity, ProvinceAndCityActions } from "../models/provinceAndCity/provinceAndCity.actions";
export { ProvinceAndCityPayload, provinceAndCity, ProvinceAndCityActions } from "../models/provinceAndCity/provinceAndCity.actions";
import { workforce, WorkforceActions } from "../models/workforce/workforce.actions";
export { workforce, WorkforceActions } from "../models/workforce/workforce.actions";

const actions = {
	auth,
	b2cCheckout,
	base,
	basket,
	category,
	cmsAdmin,
	cms,
	comparison,
	consul,
	currency,
	customerCase,
	customer,
	delivery,
	changeSim,
	changePlan,
	recurringTopUp,
	digitalLife,
	activateSim,
	suspension,
	document,
	eligibility,
	error,
	basketError,
	feature,
	lifecycle,
	loadingOverlay,
	location,
	marketingConsent,
	msisdn,
	navBar,
	notification,
	organization,
	posCheckout,
	payment,
	portIn,
	productOfferingConfiguration,
	productOfferings,
	productLoan,
	provinceAndCity,
	router: routerActions,
	sales,
	salesRepSession,
	schema,
	service,
	session,
	support,
	toaster,
	translation,
	uriLocation,
	user,
	versionInformation,
	customerInteractions,
	msisdnSelection,
	workforce,
};

export type AppActions = typeof actions;

export default actions;
