"use strict";

import * as auth from "../models/auth/auth.selectors";
import { RecurringTopUpSelector as recurringTopUp } from "../models/eCare/recurringTopUp/recurringTopUp.selectors";
import { ChangeSimSelector as changeSim } from "../models/eCare/changeSim/changeSim.selectors";
import { ChangePlanSelector as changePlan } from "../models/eCare/changeTariffPlan/changePlan.selectors";
import { ProductLoanSelector as productLoan } from "../models/productLoan/productLoan.selectors";
import { DeliverySelector as delivery } from "../models/delivery/delivery.selectors";
import * as digitalLife from "../models/digitalLife/digitalLife.selectors";
import * as eligibility from "../models/eligibility/eligibility.selectors";
import * as user from "../models/user/user.selectors";
import * as feature from "../models/feature/feature.selectors";

export {
	auth,
	changeSim,
	changePlan,
	delivery,
	digitalLife,
	eligibility,
	productLoan,
	user,
	feature,
	recurringTopUp,
};
