import { ConsulValues } from "../consul/consul.types";
import { ProductLoanConfigurationType } from "../../types";
import { getParsedValue } from "../../utils";
import { get } from "lodash";

export function extractProductLoanValues(payload: ConsulValues): ProductLoanConfigurationType {
	return {
		loanCategoryId: getParsedValue(get(payload, "eligibility-categories/product_loans_category_id")),
		dueDateCharacteristicPurpose: getParsedValue(get(payload, "features/ecare/product_loans/due_date_characteristic_purpose"))
	};
}
