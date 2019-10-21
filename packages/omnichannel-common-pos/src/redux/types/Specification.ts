import { Characteristic, SpecSubType, SpecType } from "./index";

interface Specification {
	name: string;
	id: string;
	specSubType?: SpecSubType;
	specType?: SpecType;
	instanceCharacteristics: Record<string, Characteristic>;
	inputCharacteristics: Record<string, Characteristic>;
	featureCharacteristics: Array<Characteristic>;
}

export {
	Specification
};
