import { PostalAddress } from "./PostalAddress";

interface Location {
	id?: string;
	customerAccountId?: string;
	locationType?: string;
	postalAddressList?: PostalAddress[];
}

export {
	Location,
};
