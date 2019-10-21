import {
	ServiceType,
	ServiceTypeEnum,
	TariffInformation,
	UnitOfMeasureType,
	UnitOfMeasureEnum,
	TariffZoneData
} from "../../../redux/types";
import { Time } from "../../../channelUtils";
import messages from "../Subscription.messages";
import * as moment from "moment";
import { unitOfMeasureMessages } from "../../../index";
import UnitOfMeasureUtil from "../../../utils/UnitOfMeasureUtil";

class ConsumptionUtil {
	static roundValue = (serviceType: ServiceType, value: number): string => {
		switch (serviceType) {
			case ServiceTypeEnum.data:
				return (Math.ceil(value * 100) / 100).toFixed(2);
			default:
				return value.toFixed(0);
		}
	};

	static getOverallInfo = (tariffInfo: TariffInformation[]): TariffInformation => {
		return tariffInfo.reduce((a, b) => {
			const sameUnit = a.unit === b.unit;
			return {
				current: a.current + (sameUnit ? b.current : UnitOfMeasureUtil.convertTo({
					amount: b.current,
					unitOfMeasure: b.unit as UnitOfMeasureEnum
				}, a.unit)),
				max: a.max + (sameUnit ? b.max : UnitOfMeasureUtil.convertTo({
					amount: b.max,
					unitOfMeasure: b.unit as UnitOfMeasureEnum
				}, a.unit)),
				unit: a.unit
			} as TariffInformation;
		});
	};

	static isUnlimited = (tariffInfo: TariffInformation[]): boolean => {
		return Boolean(tariffInfo.find(info => info.current === -1));
	};

	static getServiceMaxOrOverallValue = (zoneData: TariffZoneData, serviceType: ServiceTypeEnum):
		{ maxOrOverallInfo: string; isUnlimited: boolean; unit: string }  => {
		let maxOrOverallInfo = "";
		let unit = "";
		const data = zoneData.services.find(service => service.serviceType === serviceType);
		const information = data && data.information.filter(item => item.addon === false);
		let isUnlimited = false;

		if (information && information.length !== 0) {
			unit = information[0].unit;
			isUnlimited = ConsumptionUtil.isUnlimited(information);
			if (isUnlimited) {
				maxOrOverallInfo = information[0].max.toString();
			} else {
				const overallInfo = ConsumptionUtil.getOverallInfo(information);
				maxOrOverallInfo = ConsumptionUtil.roundValue(serviceType, overallInfo.max);
			}
		}
		return { maxOrOverallInfo, isUnlimited, unit };
	};

	static getLeftPercent = (tariffInfo: TariffInformation): number => {
		return (tariffInfo.current * 100) / tariffInfo.max;
	};

	static getUnitMessage = (serviceType: ServiceType, unit: UnitOfMeasureType) => {
		// @ts-ignore
		return serviceType === ServiceTypeEnum.sms ? messages.SMS : (messages[unit] || unitOfMeasureMessages[unit]);
	};

	static getEndDateInfo = (endDateString: string): {
		leftDays: number;
		formattedDate: string;
	} => {
		const now = moment();
		const endDate = moment(endDateString);

		return {
			leftDays: endDate.diff(now, "days"),
			formattedDate: Time.formatDate(endDate)
		};
	}
}

export { ConsumptionUtil };
