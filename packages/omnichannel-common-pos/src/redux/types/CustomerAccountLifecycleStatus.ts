enum CustomerAccountLifecycleStatusEnum {
	INACTIVE = "INACTIVE",
	PENDING = "PENDING",
	SUSPENDED = "SUSPENDED",
	ACTIVE = "ACTIVE"
}

type CustomerAccountLifecycleStatus = keyof typeof CustomerAccountLifecycleStatusEnum;

export {
	CustomerAccountLifecycleStatusEnum,
	CustomerAccountLifecycleStatus
};
