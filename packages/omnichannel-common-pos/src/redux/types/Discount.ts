import { ValidityPeriod }  from "./ValidityPeriod";
import { UnitOfMeasureEnum } from "./UnitOfMeasure";
import { Interval } from "./Interval";

export type Discount = {
    amount: number;
    discountType: string;
    unitOfMeasure: UnitOfMeasureEnum;
    validFor: ValidityPeriod;
    deactivationConditions?: Array<string>;
    discountConditions?: Array<string>;

    interval?: Interval;
    priority?: number;
};
