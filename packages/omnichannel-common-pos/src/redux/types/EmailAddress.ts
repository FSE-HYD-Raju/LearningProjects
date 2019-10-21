import { ContactMediaType } from "./ContactMediaType";

interface EmailAddress {
	email: string;
	role?: ContactMediaType;
	id?: string;
}

export {
	EmailAddress
};
