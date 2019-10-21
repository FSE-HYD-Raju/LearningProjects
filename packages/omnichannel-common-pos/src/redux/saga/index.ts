"use strict";

import { all, fork } from "redux-saga/effects";
import { consulSaga } from "../models/consul/consul.saga";
import { cmsSaga } from "../models/cms/cms.saga";
import { cmsAdminSaga } from "../models/cmsAdmin/cmsAdmin.saga";
import { locationSaga } from "../models/location/location.saga";
import { posCheckoutSaga } from "../models/posCheckout/posCheckout.saga";
import { lifecycleSaga } from "../models/lifecycle/lifecycle.saga";
import { digitalLifeSaga } from "../models/digitalLife/digitalLife.saga";
import { activateSimSaga } from "../models/eCare/activateSim/activateSim.saga";
import { suspensionSaga } from "../models/eCare/suspension/suspension.saga";
import { customerInteractionsSaga } from "../models/customerInteractions/customerInteractions.saga";
import { userSaga } from "../models/user/user.saga";
import { eligibilitySaga } from "../models/eligibility/eligibility.saga";
import { productOfferingsSaga } from "../models/productOfferings/productOfferings.saga";
import { provinceAndCitySaga } from "../models/provinceAndCity/provinceAndCity.saga";
import { organizationSaga } from "../models/organization/organization.saga";
import { supportSaga } from "../models/support/support.saga";
import { versionInformationSaga } from "../models/versionInformation/versionInformation.saga";
import { msisdnSaga } from "../models/msisdn/msisdn.saga";
import { deliverySaga } from "../models/delivery/delivery.saga";
import { changeSimSaga } from "../models/eCare/changeSim/changeSim.saga";
import { basketSaga } from "../models/basket/basket.saga";
import { b2cCheckoutSaga } from "../models/b2cCheckout/b2cCheckout.saga";
import { paymentSaga } from "../models/payment/payment.saga";
import { salesSaga } from "../models/sales/sales.saga";
import { categorySaga } from "../models/category/category.saga";
import { productLoanSaga } from "../models/productLoan/productLoan.saga";
import { portInSaga } from "../models/portIn/portIn.saga";
import { msisdnSelectionSaga } from "../models/msisdnSelection/msisdnSelection.saga";
import { authSaga } from "../models/auth/auth.saga";
import { recurringTopUpSaga } from "../models/eCare/recurringTopUp/recurringTopUp.saga";
import { notificationSaga } from "../models/notification/notification.saga";
import { sessionSaga } from "../models/session/session.saga";
import { productOfferingConfigurationSaga } from "../models/productOfferingConfiguration/productOfferingConfiguration.saga";
import { changePlanSaga } from "../models/eCare/changeTariffPlan/changePlan.saga";
import { documentSaga } from "../models/document/document.saga";
import { workforceSaga } from "../models/workforce/workforce.saga";

export default function* rootSaga(): any {
	yield all([
		fork(categorySaga),
		fork(consulSaga),
		fork(cmsSaga),
		fork(cmsAdminSaga),
		fork(locationSaga),
		fork(posCheckoutSaga),
		fork(customerInteractionsSaga),
		fork(digitalLifeSaga),
		fork(activateSimSaga),
		fork(suspensionSaga),
		fork(userSaga),
		fork(lifecycleSaga),
		fork(eligibilitySaga),
		fork(productOfferingsSaga),
		fork(provinceAndCitySaga),
		fork(organizationSaga),
		fork(supportSaga),
		fork(versionInformationSaga),
		fork(msisdnSaga),
		fork(notificationSaga),
		fork(deliverySaga),
		fork(changeSimSaga),
		fork(b2cCheckoutSaga),
		fork(paymentSaga),
		fork(basketSaga),
		fork(salesSaga),
		fork(portInSaga),
		fork(productLoanSaga),
		fork(msisdnSelectionSaga),
		fork(authSaga),
		fork(recurringTopUpSaga),
		fork(changePlanSaga),
		fork(sessionSaga),
		fork(productOfferingConfigurationSaga),
		fork(documentSaga),
		fork(workforceSaga),
	]);
}

export {
	categorySaga,
	consulSaga,
	cmsSaga,
	cmsAdminSaga,
	locationSaga,
	posCheckoutSaga,
	eligibilitySaga,
	organizationSaga,
	productOfferingsSaga,
	provinceAndCitySaga,
	digitalLifeSaga,
	activateSimSaga,
	suspensionSaga,
	customerInteractionsSaga,
	userSaga,
	supportSaga,
	versionInformationSaga,
	msisdnSaga,
	b2cCheckoutSaga,
	changeSimSaga,
	paymentSaga,
	basketSaga,
	salesSaga,
	productLoanSaga,
	portInSaga,
	msisdnSelectionSaga,
	recurringTopUpSaga,
	changePlanSaga,
	authSaga,
	sessionSaga,
	documentSaga,
	workforceSaga,
};
