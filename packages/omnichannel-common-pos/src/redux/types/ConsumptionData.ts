import { UnitOfMeasureType } from "./UnitOfMeasure";

enum TariffZoneEnum {
	national = "national",
	international = "international",
	roaming = "roaming"
}

type TariffZone = keyof typeof TariffZoneEnum;

enum ServiceTypeEnum {
	data = "data",
	sms = "sms",
	voice = "voice"
}

type ServiceType = keyof typeof ServiceTypeEnum;

interface TariffZoneData {
	zoneType: TariffZone;
	services: ServiceTypeData[];
}

interface ServiceTypeData {
	serviceType: ServiceType;
	information: TariffInformation[];
}

interface TariffInformation {
	name?: string;
	unit: UnitOfMeasureType;
	max: number;
	current: number;
	endDate: string;
	addon: boolean;
}

export { TariffZoneEnum, TariffZone,  ServiceTypeEnum, ServiceType, TariffZoneData, ServiceTypeData, TariffInformation };
