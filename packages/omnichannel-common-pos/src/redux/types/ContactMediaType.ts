enum ContactMediaTypeEnum {
	PRIMARY = "PRIMARY",
	HOME = "HOME",
	WORK = "WORK",
	BILLING = "BILLING",
	MARKETING = "MARKETING",
	DELIVERY = "DELIVERY"
}

type ContactMediaType = keyof typeof ContactMediaTypeEnum;

export {
	ContactMediaTypeEnum,
	ContactMediaType
};
