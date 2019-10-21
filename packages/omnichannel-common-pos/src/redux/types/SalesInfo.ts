enum SalesTypeEnum {
	ACQUISITION = "ACQUISITION",
	UPSELL = "UPSELL",
	RETENTION = "RETENTION",
	MIGRATION = "MIGRATION"
}

type SalesType = keyof typeof SalesTypeEnum;

interface SalesInfo {
	salesType: SalesType;
	batchId: string;
	chainId: string;
	channel: string;
	dealerId: string;
	salesPersonId: string;
}

export {
	SalesTypeEnum,
	SalesType,
	SalesInfo
};
