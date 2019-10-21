/**
 * Refers to com.soikea.omnichannel.common.model.bss.Service.LifeCycleStatus
 */
enum ServiceLifeCycleStatusEnum {
	ACTIVE = "ACTIVE", // FIXME: lowercase problem
	PENDING = "PENDING",
	TERMINATED = "TERMINATED",
	SUSPENDED = "SUSPENDED",
}

/**
 * For "keyof typeof" explanation see OrderLifeCycleStatus.ts
 */
type ServiceLifeCycleStatus = keyof typeof ServiceLifeCycleStatusEnum;

export {
	ServiceLifeCycleStatus,
	ServiceLifeCycleStatusEnum,
};
