enum TargetLifecycleStatusEnum {
	pending = "pending",
	active = "active",
	terminated = "terminated",
	suspended = "suspended",
	inactive = "inactive"
}

type TargetLifecycleStatus = keyof typeof TargetLifecycleStatusEnum;

export {
	TargetLifecycleStatusEnum,
	TargetLifecycleStatus
};
