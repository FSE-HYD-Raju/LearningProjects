declare type PostalAddressType = { // eslint-disable-line
	role?: string,
	id?: string,
	coAddress?: string,
	description?: string,
	stateOrProvince?: string,
	county?: string,
	street: string,
	postalCode: string,
	country: string,
	city: string,
	building?: string,
	apartment?: string
};

export {
	PostalAddressType
};
