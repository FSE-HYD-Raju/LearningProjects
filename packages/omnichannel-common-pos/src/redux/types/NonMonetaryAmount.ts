import { UnitOfMeasureEnum } from "./UnitOfMeasure";

export interface NonMonetaryAmount {
	amount: number;
	unitOfMeasure: keyof UnitOfMeasureEnum;
}
