import { ValidityPeriod, HasId } from "./index";

interface UsageLimits extends HasId {
	name: string;
	value: number;
	limit: boolean;
	validFor: ValidityPeriod;
}

export {
	UsageLimits
};
