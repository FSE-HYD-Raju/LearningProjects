enum MsisdnLifecycleStatusEnum {
	available = "available",
	allocated = "allocated",
	reserved = "reserved",
	in_use = "in-use",
	porting_in = "porting-in",
	ported_out = "ported-out",
	quarantined = "quarantined",
	retired = "repatriating",
}

type MsisdnLifecycleStatus = keyof typeof MsisdnLifecycleStatusEnum;

export {
	MsisdnLifecycleStatus,
	MsisdnLifecycleStatusEnum
};
