import { ChargingBalances } from "./ChargingBalances";

interface ChargingBalanceChanges {
	id: string;
	change?: number;
	changedAt?: string;
	valueAfter?: number;
	chargingBalances?: ChargingBalances;
}
export {
	ChargingBalanceChanges
};
