"use strict";
import { createStructuredSelector } from "reselect";
import { AppState } from "../../reducers";
import { AuthState } from "../auth/auth.types";
import { BasketState } from "../basket/basket.types";
import { CmsAdminState } from "../cmsAdmin/cmsAdmin.reducers";
import { CurrencyState } from "../currency/currency.types";
import { CustomerState } from "../customer/customer.types";
import { DigitalLifeState } from "../digitalLife/digitalLife.types";
import { LocationState } from "../location/location.types";
import { UserState } from "../user/user.types";
import { B2CCheckoutState } from "../b2cCheckout/b2cCheckout.types";
import { NavBarState } from "../navBar/navBar.reducers";
import { PaymentState } from "../payment/payment.reducers";
import { CustomerCaseState } from "../customerCase/customerCase.types";
import { PosCheckoutState } from "../posCheckout/posCheckout.reducers";
import { SalesRepSessionState } from "../salesRepSession/salesRepSession.reducers";
import { UriLocationState } from "../uriLocation/uriLocation.reducers";

interface SelectorStateTypes {
	auth: AuthState;
	basket: BasketState;
	currency: CurrencyState;
	digitalLife: DigitalLifeState;
	location: LocationState;
	navBar: NavBarState;
	payment: PaymentState;
	user: UserState;
	customer: CustomerState;
	customerCase: CustomerCaseState;
	posCheckout: PosCheckoutState;
	salesRepSession: SalesRepSessionState;
	b2cCheckout: B2CCheckoutState;
	uriLocation: UriLocationState;
	cmsAdmin: CmsAdminState;
}

const sessionSelector = createStructuredSelector<AppState, SelectorStateTypes>({
	auth: (state: AppState) => state.auth,
	basket: (state: AppState) => state.basket,
	b2cCheckout: (state: AppState) => state.b2cCheckout,
	currency: (state: AppState) => state.currency,
	digitalLife: (state: AppState) => state.digitalLife,
	location: (state: AppState) => state.location,
	navBar: (state: AppState) => state.navBar,
	payment: (state: AppState) => state.payment,
	user: (state: AppState) => state.user,
	customer: (state: AppState) => state.customer,
	customerCase: (state: AppState) => state.customerCase,
	cmsAdmin: (state: AppState) => state.cmsAdmin,
	posCheckout: (state: AppState) => state.posCheckout,
	salesRepSession: (state: AppState) => state.salesRepSession,
	uriLocation: (state: AppState) => state.uriLocation,
});

export default sessionSelector;
