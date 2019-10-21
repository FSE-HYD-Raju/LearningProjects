import { FormattedMessageDescriptor } from "../../channelUtils";

interface ErrorType {
	code: string | number | null;
	status?: number | string;
	detail?: string;
}

interface ErrorsType {
	errors?: Array<ErrorType>;
	status?: string | number;
	title?: string;
	link?: {
		id: string,
		class?: string,
		message?: FormattedMessageDescriptor,
		route: string
	};
}

export {
	ErrorType,
	ErrorsType
};
