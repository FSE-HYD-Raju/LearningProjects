import { ErrorType } from "./ErrorType";

interface QueryStatus {
	queryActive: boolean;
	queryResult?: boolean;
	error?: ErrorType;
}

export {
	QueryStatus
};
