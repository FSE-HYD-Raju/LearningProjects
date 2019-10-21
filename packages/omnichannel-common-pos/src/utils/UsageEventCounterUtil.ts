import {
	EventType,
	EventTypeDetails,
	ServiceUnit,
	UnitOfMeasureEnum,
	UsageCounterEventType,
	UsageEvent,
	UsageEventCounter
} from "../redux/types";
import { get, flatten, groupBy, toPairs } from "lodash";
import UnitOfMeasureUtil, { UnitOfMeasureValue } from "./UnitOfMeasureUtil";

type ServiceUnitFilter = (eventType: string, serviceUnits: Array<ServiceUnit>) =>  Array<ServiceUnit>;

const defaultServiceUnitsFilter = (eventType: string, serviceUnits: Array<ServiceUnit>): Array<ServiceUnit> =>
	serviceUnits.filter(su => UnitOfMeasureUtil.isCorrectConsumptionByUnitUsageType(eventType, su as UnitOfMeasureValue));

const prepareResultingUsageEvents = (usageEvents: Array<UsageEvent>, usageCountersFromEvents: boolean) => {
	UsageEventCounterUtil.addUnitForMessageEvents(usageEvents);
	const usageEventCounters: Array<UsageEventCounter> = usageCountersFromEvents ?
		UsageEventCounterUtil.group(usageEvents, UsageEventCounterUtil.dataEventServiceUnitFilter) : [];
	return {
		usageEvents,
		usageEventCounters,
	};
};

const addUnitForMessageEvents = (usageEvents: Array<UsageEvent>) => {
	usageEvents.forEach((usageEvent: UsageEvent) => {
		const eventDetails = usageEvent.attributes && usageEvent.attributes.eventDetails;
		const serviceUnits = usageEvent.attributes && usageEvent.attributes.usedServiceUnits;

		if (serviceUnits) {
			serviceUnits.forEach(su => {
				let unitOfMeasure: UnitOfMeasureEnum;

				switch (eventDetails && eventDetails.eventType) {
					case EventTypeDetails.SMS:
						unitOfMeasure = UnitOfMeasureEnum.SMS;
						break;
					case EventTypeDetails.MMS:
						unitOfMeasure = UnitOfMeasureEnum.MMS;
						break;
					default:
						unitOfMeasure = su.unitOfMeasure!;
				}

				su.unitOfMeasure = unitOfMeasure;
			});
		}
	});
};

const group = (usageEvents: Array<UsageEvent>, filterServiceUnits: ServiceUnitFilter = defaultServiceUnitsFilter): Array<UsageEventCounter> => {
	const events = usageEvents.map((ue: UsageEvent) => {
		let eventType: UsageCounterEventType | EventType | undefined = ue.attributes && ue.attributes.eventType || undefined;
		switch (eventType) {
			case EventType.DATA:
				eventType = UsageCounterEventType.DATA;
				break;
			case EventType.VOICE:
				eventType = UsageCounterEventType.VOICE;
				break;
			case EventType.MESSAGE:
				eventType = UsageCounterEventType.MESSAGE;
				break;
			default:
				eventType = UsageCounterEventType.ADDITIONAL;
		}
		return {
			...ue,
			attributes: {
				...ue.attributes,
				eventType,
			},
		};
	});
	return toPairs(groupBy(events, "attributes.eventType")).map(eventGroup => {
		const allUsedUnits = flatten(eventGroup[1].map(val => {
			const serviceUnits = get(val, "attributes.usedServiceUnits");
			return filterServiceUnits ? filterServiceUnits(eventGroup[0], serviceUnits) : serviceUnits;
		}));

		const eventType = eventGroup[0];

		const usedServiceUnits = UnitOfMeasureUtil.sum(allUsedUnits);

		if (eventType === UsageCounterEventType.MESSAGE) {
			usedServiceUnits.sort((a, b) => {
				if (b.unitOfMeasure === UnitOfMeasureEnum.SMS && a.unitOfMeasure === UnitOfMeasureEnum.MMS) {
					return 1;
				} else if (b.unitOfMeasure === UnitOfMeasureEnum.MMS && a.unitOfMeasure === UnitOfMeasureEnum.SMS) {
					return -1;
				}
				return 0;
			});
		}

		return {
			attributes: {
				eventType,
				usedServiceUnits
			}
		} as UsageEventCounter;
	});
};

const dataPossibleUnits: Array<UnitOfMeasureEnum> = [
	UnitOfMeasureEnum.BYTES,
	UnitOfMeasureEnum.KILOBYTES,
	UnitOfMeasureEnum.MEGABYTES,
	UnitOfMeasureEnum.GIGABYTES,
	UnitOfMeasureEnum.TERABYTES,
	UnitOfMeasureEnum.PETABYTES
];

const dataEventServiceUnitFilter = (eventType: string, serviceUnits: Array<ServiceUnit>): Array<ServiceUnit> => {
	const defaultFiltered = defaultServiceUnitsFilter(eventType, serviceUnits);
	if (eventType === EventType.DATA) {
		return defaultFiltered.filter(unit =>
			unit.unitOfMeasure ? dataPossibleUnits.includes(unit.unitOfMeasure) : false);
	}
	return defaultFiltered;
};

class UsageEventCounterUtil {
	static group = group;
	static addUnitForMessageEvents = addUnitForMessageEvents;
	static dataEventServiceUnitFilter = dataEventServiceUnitFilter;
	static prepareResultingUsageEvents = prepareResultingUsageEvents;
}

export {
	UsageEventCounterUtil,
	ServiceUnitFilter
};
