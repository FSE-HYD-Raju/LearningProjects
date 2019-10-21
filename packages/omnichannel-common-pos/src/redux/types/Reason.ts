import { HasId } from "./index";

interface ReasonAttributes extends HasId {
	name: string;
	value: string;
	channels?: Array<string>;
}

interface Reason extends ReasonAttributes {
	attributes?: ReasonAttributes;
}

export {
	ReasonAttributes,
	Reason
};
