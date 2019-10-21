import { UnitOfMeasureEnum } from "./UnitOfMeasure";
import { CommercialEnrichments } from "./CommercialEnrichments";

interface Allowance {
	destination: Array<string>;
	commercialEnrichments: Array<CommercialEnrichments>;
	externalId?: string;
	group: string;
	interval?: {
		interval: string;
		count: number;
	};
	unitOfMeasure: UnitOfMeasureEnum;
	value: number;
}
interface AllowanceInfo {
	name: string;
	value: number;
	unitOfMeasure: UnitOfMeasureEnum;
	isUnlimited: boolean;
}
export { Allowance, AllowanceInfo };
