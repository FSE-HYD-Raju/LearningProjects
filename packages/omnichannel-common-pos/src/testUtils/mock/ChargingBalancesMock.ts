import { ChargingBalances } from "../../redux/types";

class ChargingBalancesMock {
	static MONETARY_100_EUR: ChargingBalances = {
		id: "test-monetary-balance-eur-1000",
		name: "test monetary charging balance",
		value: 1000,
		currency: "EUR",
		unitOfMeasure: "MONETARY"
	};
}
export { ChargingBalancesMock };
