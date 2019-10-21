import { PostalAddress } from "./PostalAddress";

interface Store {
	locationLabel?: string;
	id: string;
	type: string;
	attributes?: {
		address: PostalAddress
	};
}

export {
	Store,
};
