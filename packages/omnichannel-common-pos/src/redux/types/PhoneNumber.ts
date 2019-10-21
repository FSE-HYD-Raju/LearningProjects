import { ContactMediaType } from "./ContactMediaType";

interface PhoneNumber {
	role?: ContactMediaType;
	id?: string;
	number: string;
}

export {
	PhoneNumber
};
