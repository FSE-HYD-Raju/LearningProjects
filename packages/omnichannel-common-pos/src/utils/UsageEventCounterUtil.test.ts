import { UsageEventCounterUtil } from "./UsageEventCounterUtil";
import {
	EventType,
	UnitOfMeasureEnum,
	UsageCounterEventType,
	UsageEvent
} from "../redux/types";

describe("UsageEventCounterUtil", () => {
	describe("group", () => {

		const dataPossibleUnits: Array<UnitOfMeasureEnum> = [
			UnitOfMeasureEnum.BYTES,
			UnitOfMeasureEnum.KILOBYTES,
			UnitOfMeasureEnum.MEGABYTES,
			UnitOfMeasureEnum.GIGABYTES,
			UnitOfMeasureEnum.TERABYTES,
			UnitOfMeasureEnum.PETABYTES
		];

		it("should group and sum usage events by event type", () => {

			const dataUsageEvents: Array<UsageEvent> = dataPossibleUnits.map(unit => ({
				attributes: {
					eventType: EventType.DATA,
					usedServiceUnits: [
						{
							amount: 1,
							unitOfMeasure: unit,
							usageType: "TOTAL_DATA",
						}
					]
				}
			} as UsageEvent));

			const additionalServices: Array<UsageEvent> = [EventType.ONE_TIME, EventType.CONTENT].map(eventType => ({
				attributes: {
					eventType: eventType,
					usedServiceUnits: [
						{
							amount: 1,
							unitOfMeasure: UnitOfMeasureEnum.SERVICE_SPECIFIC,
							usageType: "SERVICE_SPECIFIC",
						}
					]
				}
			} as UsageEvent));

			const dataSum = {
				attributes: {
					eventType: EventType.DATA,
					usedServiceUnits: [
						{
							amount: 1
								+ Math.pow(10, 3)
								+ Math.pow(10, 6)
								+ Math.pow(10, 9)
								+ Math.pow(10, 12)
								+ Math.pow(10, 15),
							unitOfMeasure: UnitOfMeasureEnum.BYTES,
							usageType: "TOTAL_DATA",
						}
					]
				}
			};

			const additionalSum = {
				attributes: {
					eventType: UsageCounterEventType.ADDITIONAL,
					usedServiceUnits: [
						{
							amount: 2,
							unitOfMeasure: UnitOfMeasureEnum.SERVICE_SPECIFIC,
							usageType: "SERVICE_SPECIFIC",
						}
					]
				}
			};

			const usageEvents = [
				...dataUsageEvents,
				...additionalServices,
			];

			const groups = UsageEventCounterUtil.group(usageEvents);
			expect(groups).toContainEqual(
				expect.objectContaining(dataSum));

			expect(groups).toContainEqual(
				expect.objectContaining(additionalSum));
		});

		it("should filter incorrect unitOfMeasure for Data events", () => {
			const dataUsageEvents: Array<UsageEvent> = [{
				attributes: {
					eventType: EventType.DATA,
					usedServiceUnits: [
						{
							amount: 1,
							unitOfMeasure: UnitOfMeasureEnum.BYTES,
							usageType: "TOTAL_DATA",
						}
					]
				}
			} as UsageEvent,
				{
					attributes: {
						eventType: EventType.DATA,
						usedServiceUnits: [
							{
								amount: 1,
								unitOfMeasure: UnitOfMeasureEnum.HOURS,
								usageType: "TOTAL_DATA",
							}
						]
					}
				} as UsageEvent];

			const dataSum = {
				attributes: {
					eventType: EventType.DATA,
					usedServiceUnits: [
						{
							amount: 1,
							unitOfMeasure: UnitOfMeasureEnum.BYTES,
							usageType: "TOTAL_DATA",
						}
					]
				}
			};

			const usageEvents = [
				...dataUsageEvents
			];

			const groups = UsageEventCounterUtil.group(usageEvents,
				UsageEventCounterUtil.dataEventServiceUnitFilter);

			expect(groups).toContainEqual(
				expect.objectContaining(dataSum));
		});
	});
});
