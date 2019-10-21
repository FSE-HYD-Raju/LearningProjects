enum OrderLifeCycleStatusEnum {
	ACKNOWLEDGED = "ACKNOWLEDGED",
	IN_PROGRESS = "IN_PROGRESS",
	CANCELED = "CANCELED",
	COMPLETED = "COMPLETED",
	REJECTED = "REJECTED",
	PENDING = "PENDING",
	HELD = "HELD",
	FAILED = "FAILED",
	PARTIAL = "PARTIAL",
}

/*
* 	"keyof typeof" creates a string-type limited to list of enum keys
*
* 	So OrderLifeCycleStatus is actually = "ACKNOWLEDGED" | "IN_PROGRESS" ....
*
* 	And it is possible to use enum OrderLifeCycleStatusEnum to compare with property with OrderLifeCycleStatus type
*
* 	Examples:
* 	const t:OrderLifeCycleStatus = OrderLifeCycleStatusEnum.COMPLETED;
* 	or
* 	if (order.status === OrderLifeCycleStatusEnum.COMPLETED) ...
*/
type OrderLifeCycleStatus = keyof typeof OrderLifeCycleStatusEnum;

export {
	OrderLifeCycleStatus,
	OrderLifeCycleStatusEnum,
};
