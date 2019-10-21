import { Cardinality } from "./Cardinality";
import { ValidityPeriod } from "./ValidityPeriod";
import { UnitOfMeasureEnum } from "./UnitOfMeasure";
import { ValueRegulator } from "./ValueRegulator";
import { CharacteristicValue } from "./CharacteristicValue";

export interface Characteristic {
	values: Array<CharacteristicValue>;
	description?: string;
	source?: string | null;
	subType?: string | null;
	mandatory: boolean;
	validation?: string | null;
	name?: string;
	priority?: number | null;
	valueRegulator?: ValueRegulator | null;
	purpose?: string | null;
	dataType?: string;
	cardinality?: Cardinality;
	humanReadableId?: string | null;
	hidden?: boolean;
	maxValue?: string | null;
	minValue?: string | null;
	unitOfMeasure?: UnitOfMeasureEnum | null;
	validFor?: ValidityPeriod;
	inputType?: string;
};

export interface CharacteristicWithKey {
	key: string;
	characteristicObject: Characteristic;
}
