"use strict";

import { MomentBuiltinFormat } from "moment";

import authReducer, { AuthState } from "../models/auth/auth.reducers";
import { AuthActionPayload } from "../models/auth/auth.actions";

import b2cCheckoutReducer, { B2CCheckoutState } from "../models/b2cCheckout/b2cCheckout.reducers";
import { B2CCheckoutActionPayload } from "../models/b2cCheckout/b2cCheckout.actions";

import baseReducer, { BaseState } from "../models/base/base.reducers";
import { BaseActionPayload } from "../models/base/base.actions";

import basketReducer, { BasketState } from "../models/basket/basket.reducers";
import { BasketActionPayload } from "../models/basket/basket.actions";

import categoryReducer, { CategoryState } from "../models/category/category.reducers";
import { CategoryActionPayload } from "../models/category/category.actions";

import cmsAdminReducer, { CmsAdminState } from "../models/cmsAdmin/cmsAdmin.reducers";
import { CmsAdminActionPayload } from "../models/cmsAdmin/cmsAdmin.actions";

import cmsReducer, { CmsState } from "../models/cms/cms.reducers";
import { CmsActionPayload } from "../models/cms/cms.actions";

import comparisonReducer, { ComparisonState } from "../models/comparison/comparison.reducers";
import { ComparisonActionPayload } from "../models/comparison/comparison.actions";

import consulReducer, { ConsulState } from "../models/consul/consul.reducers";
import { ConsulActionPayload } from "../models/consul/consul.actions";

import currencyReducer, { CurrencyState } from "../models/currency/currency.reducers";
import { CurrencyActionPayload } from "../models/currency/currency.actions";

import customerReducer, { CustomerState } from "../models/customer/customer.reducers";
import { CustomerActionPayload } from "../models/customer/customer.actions";

import customerCaseReducer, { CustomerCaseState } from "../models/customerCase/customerCase.reducers";
import { CustomerCaseActionPayload } from "../models/customerCase/customerCase.actions";

import deliveryReducer, { DeliveryState } from "../models/delivery/delivery.reducers";
import { DeliveryActionPayload } from "../models/delivery/delivery.actions";

import changeSimReducer, { ChangeSimState } from "../models/eCare/changeSim/changeSim.reducers";
import { ChangeSimActionPayload } from "../models/eCare/changeSim/changeSim.actions";

import recurringTopUpReducer, { RecurringTopUpState } from "../models/eCare/recurringTopUp/recurringTopUp.reducers";
import { RecurringTopUpActionPayload } from "../models/eCare/recurringTopUp/recurringTopUp.actions";

import digitalLifeReducer, { DigitalLifeState } from "../models/digitalLife/digitalLife.reducers";
import { DigitalLifeActionPayload } from "../models/digitalLife/digitalLife.actions";

import activateSimReducer, { ActivateSimState } from "../models/eCare/activateSim/activateSim.reducers";
import { ActivateSimActionPayload } from "../models/eCare/activateSim/activateSim.actions";

import suspensionReducer, { SuspensionState } from "../models/eCare/suspension/suspension.reducers";
import { SuspensionActionPayload } from "../models/eCare/suspension/suspension.actions";

import documentReducer, { DocumentState } from "../models/document/document.reducers";
import { DocumentActionPayload } from "../models/document/document.actions";

import errorReducer, { ErrorState } from "../models/error/error.reducers";
import { ErrorActionPayload } from "../models/error/error.actions";

import featureReducer, { FeatureState } from "../models/feature/feature.reducers";
import { FeatureActionPayload } from "../models/feature/feature.actions";

import lifecycleReducer, { LifecycleState } from "../models/lifecycle/lifecycle.reducers";
import { LifecycleActionPayload } from "../models/lifecycle/lifecycle.actions";

import loadingOverlayReducer, { LoadingOverlayState } from "../models/loadingOverlay/loadingOverlay.reducers";
import { LoadingOverlayActionPayload } from "../models/loadingOverlay/loadingOverlay.actions";

import locationReducer, { LocationState } from "../models/location/location.reducers";
import { LocationActionPayload } from "../models/location/location.actions";

import marketingConsentReducer, { MarketingConsentState } from "../models/marketingConsent/marketingConsent.reducers";
import { MarketingConsentActionPayload } from "../models/marketingConsent/marketingConsent.actions";

import msisdnReducer, { MsisdnState } from "../models/msisdn/msisdn.reducers";
import { MsisdnActionPayload } from "../models/msisdn/msisdn.actions";

import navBarReducer, { NavBarState } from "../models/navBar/navBar.reducers";
import { NavBarActionPayload } from "../models/navBar/navBar.actions";

import notificationReducer, { NotificationState } from "../models/notification/notification.reducers";
import { NotificationActionPayload } from "../models/notification/notification.actions";

import organizationReducer, { OrganizationState } from "../models/organization/organization.reducers";
import { OrganizationActionPayload } from "../models/organization/organization.actions";

import paymentReducer, { PaymentState } from "../models/payment/payment.reducers";
import { PaymentActionPayload } from "../models/payment/payment.actions";

import portInReducer, { PortInState } from "../models/portIn/portIn.reducers";
import { PortInActionPayload } from "../models/portIn/portIn.actions";

import posCheckoutReducer, { PosCheckoutState } from "../models/posCheckout/posCheckout.reducers";
import { PosCheckoutActionPayload } from "../models/posCheckout/posCheckout.actions";

import productOfferingConfReducer, {
	ProductOfferingConfigurationState
} from "../models/productOfferingConfiguration/productOfferingConfiguration.reducers";
import { ProductOfferingConfigurationActionPayload } from "../models/productOfferingConfiguration/productOfferingConfiguration.actions";

import productLoanReducer, { ProductLoanState } from "../models/productLoan/productLoan.reducers";
import { ProductLoanActionPayload } from "../models/productLoan/productLoan.actions";

import salesReducer, { SalesState } from "../models/sales/sales.reducers";
import { SalesActionPayload } from "../models/sales/sales.actions";

import salesRepSessionReducer, { SalesRepSessionState } from "../models/salesRepSession/salesRepSession.reducers";
import { SalesRepSessionActionPayload } from "../models/salesRepSession/salesRepSession.actions";

import schemaReducer, { SchemaState } from "../models/schema/schema.reducers";
import { SchemaActionPayload } from "../models/schema/schema.actions";

import serviceReducer, { ServiceState } from "../models/service/service.reducers";
import { ServiceActionPayload } from "../models/service/service.actions";

import sessionReducer, { SessionState } from "../models/session/session.reducers";
import { SessionActionPayload } from "../models/session/session.actions";

import toasterReducer, { ToasterState } from "../models/toaster/toaster.reducers";
import { ToasterActionPayload } from "../models/toaster/toaster.actions";

import translationReducer, { TranslationState } from "../models/translation/translation.reducers";
import { TranslationActionPayload } from "../models/translation/translation.actions";

import uriLocationReducer, { UriLocationState } from "../models/uriLocation/uriLocation.reducers";
import { UriLocationActionPayload } from "../models/uriLocation/uriLocation.actions";

import userReducer, { UserState } from "../models/user/user.reducers";
import { UserActionPayload } from "../models/user/user.actions";

import versionInformationReducer, {
	VersionInformationState
} from "../models/versionInformation/versionInformation.reducers";
import { VersionInformationActionPayload } from "../models/versionInformation/versionInformation.actions";
import { RouterState } from "connected-react-router";

import eligibilityReducer, { EligibilityState } from "../models/eligibility/eligibility.reducers";
import { EligibilityActionPayload } from "../models/eligibility/eligibility.actions";

import productOfferingsReducer, { ProductOfferingsState } from "../models/productOfferings/productOfferings.reducers";
import { ProductOfferingsActionPayload } from "../models/productOfferings/productOfferings.actions";

import customerInteractionsReducer, {
	CustomerInteractionsState
} from "../models/customerInteractions/customerInteractions.reducers";
import { CustomerInteractionsActionPayload } from "../models/customerInteractions/customerInteractions.actions";

import supportReducer, { SupportState } from "../models/support/support.reducers";
import { SupportActionPayload } from "../models/support/support.actions";

import msisdnSelectionReducer, { MsisdnSelectionState } from "../models/msisdnSelection/msisdnSelection.reducers";
import { MsisdnSelectionActionPayload } from "../models/msisdnSelection/msisdnSelection.actions";

import basketErrorReducer, { MiniBasketErrorState } from "../models/basketError/basketError.reducers";
import { BasketErrorPayload } from "../models/basketError/basketError.actions";

import { ChangePlanState } from "../models/eCare/changeTariffPlan/changePlan.types";
import changePlanReducer from "../models/eCare/changeTariffPlan/changePlan.reducers";

import provinceAndCityReducer, { ProvinceAndCityState } from "../models/provinceAndCity/provinceAndCity.reducers";

import workforceReducer, { WorkforceState } from "../models/workforce/workforce.reducers";

export interface AppState {
	auth: AuthState;
	b2cCheckout: B2CCheckoutState;
	base: BaseState;
	basket: BasketState;
	category: CategoryState;
	cmsAdmin: CmsAdminState;
	cms: CmsState;
	comparison: ComparisonState;
	consul: ConsulState;
	currency: CurrencyState;
	customer: CustomerState;
	customerCase: CustomerCaseState;
	delivery: DeliveryState;
	changeSim: ChangeSimState;
	changePlan: ChangePlanState;
	recurringTopUp: RecurringTopUpState;
	digitalLife: DigitalLifeState;
	activateSim: ActivateSimState;
	suspension: SuspensionState;
	document: DocumentState;
	eligibility: EligibilityState;
	error: ErrorState;
	basketError: MiniBasketErrorState;
	feature: FeatureState;
	lifecycle: LifecycleState;
	loadingOverlay: LoadingOverlayState;
	location: LocationState;
	marketingConsent: MarketingConsentState;
	msisdn: MsisdnState;
	navBar: NavBarState;
	notification: NotificationState;
	organization: OrganizationState;
	posCheckout: PosCheckoutState;
	payment: PaymentState;
	portIn: PortInState;
	productOfferingConfiguration: ProductOfferingConfigurationState;
	productOfferings: ProductOfferingsState;
	productLoan: ProductLoanState;
	provinceAndCity: ProvinceAndCityState;
	router: RouterState;
	sales: SalesState;
	salesRepSession: SalesRepSessionState;
	schema: SchemaState;
	service: ServiceState;
	session: SessionState;
	support: SupportState;
	toaster: ToasterState;
	translation: TranslationState;
	uriLocation: UriLocationState;
	user: UserState;
	versionInformation: VersionInformationState;
	customerInteractions: CustomerInteractionsState;
	msisdnSelection: MsisdnSelectionState;
	workforce: WorkforceState;
}

const reducers = {
	auth: authReducer,
	b2cCheckout: b2cCheckoutReducer,
	base: baseReducer,
	basket: basketReducer,
	category: categoryReducer,
	cmsAdmin: cmsAdminReducer,
	cms: cmsReducer,
	comparison: comparisonReducer,
	consul: consulReducer,
	currency: currencyReducer,
	customer: customerReducer,
	customerCase: customerCaseReducer,
	delivery: deliveryReducer,
	changeSim: changeSimReducer,
	changePlan: changePlanReducer,
	recurringTopUp: recurringTopUpReducer,
	digitalLife: digitalLifeReducer,
	activateSim: activateSimReducer,
	suspension: suspensionReducer,
	document: documentReducer,
	error: errorReducer,
	basketError: basketErrorReducer,
	eligibility: eligibilityReducer,
	feature: featureReducer,
	lifecycle: lifecycleReducer,
	loadingOverlay: loadingOverlayReducer,
	location: locationReducer,
	marketingConsent: marketingConsentReducer,
	msisdn: msisdnReducer,
	navBar: navBarReducer,
	notification: notificationReducer,
	organization: organizationReducer,
	payment: paymentReducer,
	portIn: portInReducer,
	posCheckout: posCheckoutReducer,
	productOfferingConfiguration: productOfferingConfReducer,
	productOfferings: productOfferingsReducer,
	productLoan: productLoanReducer,
	provinceAndCity: provinceAndCityReducer,
	sales: salesReducer,
	salesRepSession: salesRepSessionReducer,
	schema: schemaReducer,
	service: serviceReducer,
	session: sessionReducer,
	support: supportReducer,
	toaster: toasterReducer,
	translation: translationReducer,
	uriLocation: uriLocationReducer,
	user: userReducer,
	versionInformation: versionInformationReducer,
	customerInteractions: customerInteractionsReducer,
	msisdnSelection: msisdnSelectionReducer,
	workforce: workforceReducer,
};

export default reducers;
