import CurrencyUtil from "./CurrencyUtil";
import { injectIntl, IntlProvider } from "react-intl";
import { ContextType } from "../types";
import * as React from "react";

const intlProvider = new IntlProvider({ locale: "en" }, {});
const { intl } = intlProvider.getChildContext();

describe("CurrencyUtil()", () => {
	it("returns get formatted string", () => {
		const context = { intl};
		expect(CurrencyUtil.getFormattedString(context as ContextType, 100, "CHF", 2)).toBe("CHF100.00");
	});
});
