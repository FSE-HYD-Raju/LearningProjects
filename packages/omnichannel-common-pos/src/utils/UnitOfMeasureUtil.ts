import { UnitOfMeasureType, UnitOfMeasureEnum, EventType, ServiceUnitUsageTypeEnum } from "../redux/types";
import { groupBy, toPairs } from "lodash";
import { DurationUtil } from "./DurationUtil";
import { DataUtil } from "./DataUtil";

type UnitOfMeasureValueConverter = (value: UnitOfMeasureValue) => UnitOfMeasureValue;
type UnitOfMeasureConvertToUnit = (value: UnitOfMeasureValue, unit: UnitOfMeasureType) => number;

interface UnitOfMeasureValue {
	amount: number;
	unitOfMeasure: UnitOfMeasureEnum;
	usageType?: ServiceUnitUsageTypeEnum;
}

enum UnitOfMeasureGroupEnum {
	DECIMAL_MAGNITUDE = "DEC_MAGNITUDE",
	BINARY_MAGNITUDE = "BIN_MAGNITUDE",
	TIME = "TIME",
	SIMPLE = "SIMPLE"
}

const unitGroupMap: { [key: string]: UnitOfMeasureGroupEnum; } = {};

const addUnitGroup = (group: UnitOfMeasureGroupEnum, units: Array<UnitOfMeasureType>): void => {
	units.forEach(unit => {
		unitGroupMap[unit] = group;
	});
};

addUnitGroup(UnitOfMeasureGroupEnum.DECIMAL_MAGNITUDE, [
	UnitOfMeasureEnum.BYTES,
	UnitOfMeasureEnum.KILOBYTES,
	UnitOfMeasureEnum.MEGABYTES,
	UnitOfMeasureEnum.GIGABYTES,
	UnitOfMeasureEnum.TERABYTES,
	UnitOfMeasureEnum.PETABYTES
]);

addUnitGroup(UnitOfMeasureGroupEnum.BINARY_MAGNITUDE, [
	UnitOfMeasureEnum.BITS,
	UnitOfMeasureEnum.KIBIBYTES,
	UnitOfMeasureEnum.MEBIBYTES,
	UnitOfMeasureEnum.GIBIBYTES,
	UnitOfMeasureEnum.PEBIBYTES,
	UnitOfMeasureEnum.TEBIBYTES
]);

addUnitGroup(UnitOfMeasureGroupEnum.TIME, [
	UnitOfMeasureEnum.SECONDS,
	UnitOfMeasureEnum.MINUTES,
	UnitOfMeasureEnum.HOURS
]);

const unitGroupToBaseConverter: { [key: string]: UnitOfMeasureValueConverter } = {};
const unitGroupToSpecificUnitConverter: { [key: string]: UnitOfMeasureConvertToUnit } = {};

unitGroupToBaseConverter[UnitOfMeasureGroupEnum.SIMPLE] = (value: UnitOfMeasureValue) => value;
unitGroupToSpecificUnitConverter[UnitOfMeasureGroupEnum.SIMPLE] = (value: UnitOfMeasureValue) => value.amount;

unitGroupToBaseConverter[UnitOfMeasureGroupEnum.TIME] = (value: UnitOfMeasureValue) => {
	switch (value.unitOfMeasure) {
		case (UnitOfMeasureEnum.SECONDS):
			return value;
		case (UnitOfMeasureEnum.MINUTES):
			return { amount: value.amount * 60, unitOfMeasure: UnitOfMeasureEnum.SECONDS };
		case (UnitOfMeasureEnum.HOURS):
			return { amount: value.amount * Math.pow(60, 2), unitOfMeasure: UnitOfMeasureEnum.SECONDS };
		default:
			throw new Error(`Unknown UnitOfMeasure '${value.unitOfMeasure}' for TIME group`);
	}
};

unitGroupToSpecificUnitConverter[UnitOfMeasureGroupEnum.TIME] = (value: UnitOfMeasureValue, unit: UnitOfMeasureType) => {
	const baseValue = unitGroupToBaseConverter[UnitOfMeasureGroupEnum.TIME](value);

	switch (unit) {
		case (UnitOfMeasureEnum.SECONDS):
			return baseValue.amount;
		case (UnitOfMeasureEnum.MINUTES):
			return baseValue.amount / 60;
		case (UnitOfMeasureEnum.HOURS):
			return baseValue.amount / Math.pow(60, 2);
		default:
			throw new Error(`Unknown UnitOfMeasure '${value.unitOfMeasure}' for TIME group`);
	}
};

unitGroupToBaseConverter[UnitOfMeasureGroupEnum.DECIMAL_MAGNITUDE] = (value: UnitOfMeasureValue) => {
	switch (value.unitOfMeasure) {
		case (UnitOfMeasureEnum.BYTES):
			return value;
		case (UnitOfMeasureEnum.KILOBYTES):
			return { amount: value.amount * Math.pow(10, 3), unitOfMeasure: UnitOfMeasureEnum.BYTES };
		case (UnitOfMeasureEnum.MEGABYTES):
			return { amount: value.amount * Math.pow(10, 6), unitOfMeasure: UnitOfMeasureEnum.BYTES };
		case (UnitOfMeasureEnum.GIGABYTES):
			return { amount: value.amount * Math.pow(10, 9), unitOfMeasure: UnitOfMeasureEnum.BYTES };
		case (UnitOfMeasureEnum.TERABYTES):
			return { amount: value.amount * Math.pow(10, 12), unitOfMeasure: UnitOfMeasureEnum.BYTES };
		case (UnitOfMeasureEnum.PETABYTES):
			return { amount: value.amount * Math.pow(10, 15), unitOfMeasure: UnitOfMeasureEnum.BYTES };
		default:
			throw new Error(`Unknown UnitOfMeasure '${value.unitOfMeasure}' for DECIMAL_MAGNITUDE group`);
	}
};

unitGroupToSpecificUnitConverter[UnitOfMeasureGroupEnum.DECIMAL_MAGNITUDE] = (value: UnitOfMeasureValue, unit: UnitOfMeasureType) => {
	const baseValue = unitGroupToBaseConverter[UnitOfMeasureGroupEnum.DECIMAL_MAGNITUDE](value);

	switch (unit) {
		case (UnitOfMeasureEnum.BYTES):
			return baseValue.amount;
		case (UnitOfMeasureEnum.KILOBYTES):
			return baseValue.amount / Math.pow(10, 3);
		case (UnitOfMeasureEnum.MEGABYTES):
			return baseValue.amount / Math.pow(10, 6);
		case (UnitOfMeasureEnum.GIGABYTES):
			return baseValue.amount / Math.pow(10, 9);
		case (UnitOfMeasureEnum.TERABYTES):
			return baseValue.amount / Math.pow(10, 12);
		case (UnitOfMeasureEnum.PETABYTES):
			return baseValue.amount / Math.pow(10, 15);
		default:
			throw new Error(`Unknown UnitOfMeasure '${value.unitOfMeasure}' for DECIMAL_MAGNITUDE group`);
	}
};

unitGroupToBaseConverter[UnitOfMeasureGroupEnum.BINARY_MAGNITUDE] = (value: UnitOfMeasureValue) => {
	switch (value.unitOfMeasure) {
		case (UnitOfMeasureEnum.BITS):
			return value;
		case (UnitOfMeasureEnum.BYTES):
			return { amount: value.amount * Math.pow(2, 3), unitOfMeasure: UnitOfMeasureEnum.BITS };
		case (UnitOfMeasureEnum.KIBIBYTES):
			return { amount: value.amount * Math.pow(2, 13), unitOfMeasure: UnitOfMeasureEnum.BITS };
		case (UnitOfMeasureEnum.MEBIBYTES):
			return { amount: value.amount * Math.pow(2, 23), unitOfMeasure: UnitOfMeasureEnum.BITS };
		case (UnitOfMeasureEnum.GIBIBYTES):
			return { amount: value.amount * Math.pow(2, 33), unitOfMeasure: UnitOfMeasureEnum.BITS };
		case (UnitOfMeasureEnum.TEBIBYTES):
			return { amount: value.amount * Math.pow(2, 43), unitOfMeasure: UnitOfMeasureEnum.BITS };
		case (UnitOfMeasureEnum.PEBIBYTES):
			return { amount: value.amount * Math.pow(2, 53), unitOfMeasure: UnitOfMeasureEnum.BITS };
		default:
			throw new Error(`Unknown UnitOfMeasure '${value.unitOfMeasure}' for BINARY_MAGNITUDE group`);
	}
};

unitGroupToSpecificUnitConverter[UnitOfMeasureGroupEnum.BINARY_MAGNITUDE] = (value: UnitOfMeasureValue, unit: UnitOfMeasureType) => {
	const baseValue = unitGroupToBaseConverter[UnitOfMeasureGroupEnum.BINARY_MAGNITUDE](value);

	switch (unit) {
		case (UnitOfMeasureEnum.BITS):
			return baseValue.amount;
		case (UnitOfMeasureEnum.BYTES):
			return baseValue.amount / Math.pow(2, 3);
		case (UnitOfMeasureEnum.KIBIBYTES):
			return baseValue.amount / Math.pow(2, 13);
		case (UnitOfMeasureEnum.MEBIBYTES):
			return baseValue.amount / Math.pow(2, 23);
		case (UnitOfMeasureEnum.GIBIBYTES):
			return baseValue.amount / Math.pow(2, 33);
		case (UnitOfMeasureEnum.TEBIBYTES):
			return baseValue.amount / Math.pow(2, 43);
		case (UnitOfMeasureEnum.PEBIBYTES):
			return baseValue.amount / Math.pow(2, 53);
		default:
			throw new Error(`Unknown UnitOfMeasure '${value.unitOfMeasure}' for BINARY_MAGNITUDE group`);
	}
};

const sum = (units: Array<UnitOfMeasureValue>): Array<UnitOfMeasureValue> => {
	return toPairs(groupBy(units, unit => unitGroupMap[unit.unitOfMeasure] || unit.unitOfMeasure))
		.map(group => {
			const groupConverter = unitGroupToBaseConverter[group[0]]
				|| unitGroupToBaseConverter[UnitOfMeasureGroupEnum.SIMPLE];
			return group[1].reduce((left, right) => {
				const lConverted = groupConverter(left);
				const rConverted = groupConverter(right);
				return {
					amount: lConverted.amount + rConverted.amount,
					unitOfMeasure: lConverted.unitOfMeasure,
					usageType: lConverted.usageType,
				};
			});
		});
};

const convertTo = (value: UnitOfMeasureValue, convertToUnit: UnitOfMeasureType): number => {
	const groupEnum = unitGroupMap[convertToUnit] || UnitOfMeasureGroupEnum.SIMPLE;
	const groupToSpecificUnitConverter = unitGroupToSpecificUnitConverter[groupEnum];

	return groupToSpecificUnitConverter(value, convertToUnit);
};

const format = (eType: string, amount: UnitOfMeasureValue, fallback: () => any): string | any => {
	switch (eType) {
		case EventType.VOICE:
			try {
				return DurationUtil.format(amount.amount, amount.unitOfMeasure);
			} catch (e) {
				console.warn(e);
				return null;
			}
		case EventType.DATA:
			try {
				return DataUtil.format(amount.amount, amount.unitOfMeasure);
			} catch (e) {
				console.warn(e);
				return null;
			}
		case EventType.MESSAGE:
			return `${amount.amount} ${amount.unitOfMeasure}`;
		default:
			return fallback();
	}
};

const isCorrectConsumptionByUnitUsageType = (eType: string, value: UnitOfMeasureValue) => {
	switch (eType) {
		case EventType.MESSAGE:
			return value.usageType === "SERVICE_SPECIFIC";
		case EventType.DATA:
			return value.usageType === "TOTAL_DATA";
		default:
			return true;
	}
};

class UnitOfMeasureUtil {
	static sum = sum;
	static convertTo = convertTo;
	static format = format;
	static isCorrectConsumptionByUnitUsageType = isCorrectConsumptionByUnitUsageType;
}

export default UnitOfMeasureUtil;

export {
	UnitOfMeasureUtil,
	UnitOfMeasureValue,
};
