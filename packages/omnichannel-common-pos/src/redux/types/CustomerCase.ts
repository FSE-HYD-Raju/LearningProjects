import { HasId, Person } from "./index";

enum CustomerCaseStatusEnum {
	ONGOING = "ONGOING",
	ONHOLD = "ONHOLD",
	ENDED = "ENDED"
}
type CustomerCaseStatus = keyof typeof CustomerCaseStatusEnum;

interface CustomerCaseAttributes extends HasId {
	status?: CustomerCaseStatus;
	startTime?: string;
	endTime?: string;
	activeCustomer?: Person;
	referenceIds?: Record<string, string>;
	salesRepUser: Person;
}

interface CustomerCase extends CustomerCaseAttributes {
	attributes?: CustomerCaseAttributes;
}

export {
	CustomerCaseAttributes,
	CustomerCase,
	CustomerCaseStatusEnum,
	CustomerCaseStatus
};
