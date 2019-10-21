import { UnitOfMeasureEnum } from "../redux/types";

const byteSize = require("byte-size");

interface ConversionOptions {
	units?: string;
}

const gbBytesMetricAmount: number = Math.pow(10, 9);

const getPrecision = (bytesAmount: number): number => {
	if (bytesAmount >= gbBytesMetricAmount) {
		return 2;
	}
	return 0;
};

const format = (amount: number, unitOfMeasure: UnitOfMeasureEnum,
				conversionOptions: ConversionOptions = {}): string => {
	let dataBytes;
	switch (unitOfMeasure) {
		case UnitOfMeasureEnum.BYTES:
			dataBytes = amount;
			break;
		case UnitOfMeasureEnum.KILOBYTES:
			dataBytes = amount * Math.pow(10, 3);
			break;
		case UnitOfMeasureEnum.MEGABYTES:
			dataBytes = amount * Math.pow(10, 6);
			break;
		case UnitOfMeasureEnum.GIGABYTES:
			dataBytes = amount * Math.pow(10, 9);
			break;
		case UnitOfMeasureEnum.TERABYTES:
			dataBytes = amount * Math.pow(10, 12);
			break;
		case UnitOfMeasureEnum.PETABYTES:
			dataBytes = amount * Math.pow(10, 15);
			break;
		default:
			throw new Error(`Unexpected unit of measure ${unitOfMeasure} for data`);
	}

	const precision = getPrecision(dataBytes);

	const result = byteSize(dataBytes, {
		...conversionOptions,
		precision
	});

	return `${result.value} ${result.unit}`;
};

class DataUtil {
	static format = format;
}

export {
	DataUtil
};
