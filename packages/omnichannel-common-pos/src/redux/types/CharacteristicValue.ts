import { ValidityPeriod } from "./index";

export interface CharacteristicValue {
	name: string;
	value: string;
	language?: string | null;
	isDefault?: boolean | null;
	validFor?: ValidityPeriod | null;
}
