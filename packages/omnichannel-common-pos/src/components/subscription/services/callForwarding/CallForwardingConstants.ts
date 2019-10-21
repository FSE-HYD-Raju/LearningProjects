enum ServiceStatusEnum {
	ENABLED = "1",
	DISABLED = "2"
}

enum CallForwardingService {
	CFUFWD = "CFUFWD",
	CFBFWD = "CFBFWD",
	CFNRYFWD = "CFNRYFWD",
	CFNRCFWD = "CFNRCFWD"
}

enum CallForwardingType {
	FORWARD_ALL = "forwardAll",
	FORWARD_IFBUSY = "forwardIfBusy"
}

enum CallForwardingCharacteristic {
	CFMSISDN = "CFMSISDN",
	CFSTATUS = "CFSTATUS",
	CFTIME = "CFTIME",
	SERVICEID = "SERVICEID"
}

export {
	ServiceStatusEnum,
	CallForwardingService,
	CallForwardingType,
	CallForwardingCharacteristic
};
