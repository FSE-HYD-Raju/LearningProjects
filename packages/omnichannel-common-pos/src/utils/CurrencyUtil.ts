import { ContextType } from "../types";

class CurrencyUtil {
	static getFormattedString = (context: ContextType, amount: number, currency: string, minimumFractionDigits: number = 0): string => {
		const formattedNumber = context.intl.formatNumber(amount, {
			style: "currency",
			currency: currency,
			minimumFractionDigits: minimumFractionDigits,
			maximumFractionDigits: 2,
		});
		return formattedNumber.replace(/\s/g, "");
	};

}
export default CurrencyUtil;
