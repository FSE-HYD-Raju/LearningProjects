import { ErrorType, ErrorsType } from "./ErrorType";
import { PostalAddress } from "./PostalAddress";

interface PostalAddressValidationErrorType extends ErrorType {
	meta: {
		proposals: PostalAddress[];
		validAddressMandatory: Boolean;
	};
}
interface PostalAddressValidationErrorsType extends ErrorsType {
	errors?: PostalAddressValidationErrorType[];
}

export {
	PostalAddressValidationErrorType,
	PostalAddressValidationErrorsType
};
