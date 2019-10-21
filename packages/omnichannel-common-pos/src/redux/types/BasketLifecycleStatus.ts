enum BasketLifecycleStatusEnum {
	OPEN = "OPEN",
	CANCELED = "CANCELED",
	SUBMITTED = "SUBMITTED",
	COMMITTED = "COMMITTED",
	IN_PROGRESS = "IN_PROGRESS",
}

type BasketLifecycleStatus = keyof typeof BasketLifecycleStatusEnum;

export {
	BasketLifecycleStatusEnum,
	BasketLifecycleStatus
};
