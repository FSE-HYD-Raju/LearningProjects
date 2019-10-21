import { ContactMediaType } from "./ContactMediaType";

interface PostalAddress {
	role?: ContactMediaType;
	id?: string;
	street?: string;
	coAddress?: string;
	postalCode?: string;
	city?: string;
	country?: string;
	county?: string;
	description?: string;
	postOfficeBox?: string;
	stateOrProvince?: string;
	addressRegisterId?: string;
	building?: string;
	apartment?: string;
	[index: string]: string | ContactMediaType | undefined;
}

export {
	PostalAddress,
};
