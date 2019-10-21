import * as moment from "moment";
import { Moment } from "moment";
import {
	ChargingBalances,
	Agreement,
	Product,
	TariffZoneData,
	TariffConfig,
	ProductLifecycleStatus,
	ServiceConfig,
	TariffInformation,
	UnitOfMeasureEnum,
	Allowance,
	ChargingBalancesTypeEnum,
	CommercialEnrichmentNameEnum
} from "../../../redux/types";
import ProductUtil from "../../../utils/product/ProductUtil";
import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";
import UnitOfMeasureUtil from "../../../utils/UnitOfMeasureUtil";
import Time from "../../../channelUtils/Time";
interface SubscriptionBalances {
	overallBalance: ChargingBalances | undefined;
	cashBalance: ChargingBalances | undefined;
	bonusBalance: ChargingBalances | undefined;
	bonusBalances: Array<ChargingBalances> | undefined;
}

class SubscriptionUtils {
	static getRecurringPeriodStartDateFromProduct(product: Product | undefined): Date | undefined {
		if (!product) {
			return undefined;
		}
		const chargingBalances = product.attributes ?
			product.attributes.chargingBalances : product.chargingBalances || [];
		const now = new Date();
		const startDates: Array<Moment> = chargingBalances
			.filter((cb: ChargingBalances) => cb.validFor && cb.validFor.startDate)
			.map((cb: ChargingBalances) => moment(cb.validFor!.startDate!))
			.filter((cbEndMoment: Moment) => cbEndMoment.isAfter(now));
		if (startDates.length > 0) {
			return moment.min(startDates).toDate();
		}
		return undefined;
	}

	static getAgreementChargingBalances = (agreement: Agreement): Array<ChargingBalances> => {
		return (agreement.attributes && agreement.attributes.chargingBalances) || agreement.chargingBalances;
	};

	static getMainBalance = (agreement: Agreement): ChargingBalances | undefined => {
		const agreementChargingBalances = SubscriptionUtils.getAgreementChargingBalances(agreement);
		return ProductUtil.findMonetaryChargingBalance(agreementChargingBalances, ChargingBalancesTypeEnum.MAIN_BALANCE);
	};

	static getBalances = (agreement: Agreement, selectedCurrency: string): SubscriptionBalances => {
		const agreementChargingBalances = SubscriptionUtils.getAgreementChargingBalances(agreement);

		return {
			overallBalance: ProductUtil.sumMonetaryChargingBalance(agreementChargingBalances, selectedCurrency),
			cashBalance: ProductUtil.sumMonetaryChargingBalance(agreementChargingBalances, selectedCurrency,  ChargingBalancesTypeEnum.CASH_BALANCE),
			bonusBalance: ProductUtil.sumMonetaryChargingBalance(agreementChargingBalances, selectedCurrency, ChargingBalancesTypeEnum.BONUS_BALANCE),
			bonusBalances: ProductUtil.filterMonetaryChargingBalance(agreementChargingBalances, selectedCurrency, ChargingBalancesTypeEnum.BONUS_BALANCE)
		};
	};

	static getSubscriptionStatus = (subscription: Product): { showReason: boolean; lifeCycleStatus: string; reasonForDeActivation?: string } => {
		const showReason = subscription.lifeCycleStatus !== ProductLifecycleStatus.ACTIVE;
		const reasonForDeActivation = subscription.characteristics ? subscription.characteristics.reason_code : undefined;
		return {
			showReason,
			lifeCycleStatus: subscription.lifeCycleStatus,
			reasonForDeActivation
		};
	};

	static getSubscriptionActivationDate = (subscription: Product): string => {
		const startDate = subscription.validFor ? subscription.validFor.startDate : undefined;
		const endDate = subscription.validFor ? subscription.validFor.endDate : undefined;

		const startDateStr = startDate ? Time.formatDate(startDate) : "";
		const endDateStr = endDate ? Time.formatDate(endDate) : "";

		return endDateStr.length > 0 ? startDateStr + "\u00A0-\u00A0" + endDateStr : startDateStr;
	};

	static getPhoneNumber = (subscription: Product): string => {
		return ProductUtil.findPhoneNumber(subscription) || "";
	};

	static getConsumptionData = (subscriptionOrPlanProduct: Product, isSubscription: boolean, tariffZones: TariffConfig[],
								 serviceTypes: ServiceConfig[]): TariffZoneData[] => {
		const result: TariffZoneData[] = [];

		const putTariffInformation = (zoneName: string, serviceName: string, info: TariffInformation) => {
			const zoneType = tariffZones.find(zone => zone.name === zoneName)!.zoneType;
			const serviceType = serviceTypes.find(service => service.name === serviceName)!.serviceType;

			let tariffZoneData = result.find(zone => zone.zoneType === zoneType);
			if (!tariffZoneData) {
				tariffZoneData = {
					zoneType,
					services: []
				};
				result.push(tariffZoneData);
			}

			let serviceData = tariffZoneData.services.find(service => service.serviceType === serviceType);
			if (!serviceData) {
				serviceData = {
					serviceType,
					information: []
				};
				tariffZoneData.services.push(serviceData);
			}

			serviceData.information.push(info);
		};

		const getTariffInformation = (product: Product, allowances: Allowance[] | undefined) => {
			if (allowances && allowances.length) {
				allowances.forEach(allowance => {
					try {
						const destination = allowance.destination && allowance.destination[0];
						const info = destination.split("-");
						if (tariffZonesValues.includes(info[0]) && serviceTypesValues.includes(info[1])) {
							const tariffInformation = SubscriptionUtils.getTariffInformation(
								product,
								allowance
							);

							if (tariffInformation) {
								putTariffInformation(info[0], info[1], tariffInformation);
							}
						}
					} catch (ignore) {
					}
				});
			}
		};

		const childProducts = ProductUtil.getChildProductsRecursively(subscriptionOrPlanProduct);
		const tariffZonesValues = tariffZones.map(zone => zone.name);
		const serviceTypesValues = serviceTypes.map(service => service.name);

		if (isSubscription && childProducts && childProducts.length) {
			childProducts
				.filter((product: Product) => product.lifeCycleStatus === ProductLifecycleStatus.ACTIVE)
				.forEach((product: Product) => {
				const { allowances } = product;
				getTariffInformation(product, allowances);
			});
		} else if (!isSubscription) {
			const { allowances } = subscriptionOrPlanProduct;
			getTariffInformation(subscriptionOrPlanProduct, allowances);
		}

		const zoneArr = tariffZones.map(t => t.zoneType);
		result.sort((a, b) => zoneArr.indexOf(a.zoneType) - zoneArr.indexOf(b.zoneType));

		return result;
	};

	static getTariffInformation = (
		product: Product,
		allowance: Allowance
	): TariffInformation | undefined => {
		const chargingBalances = product.chargingBalances;

		const destinationInfo = allowance.destination[0].split("-");
		const tariffZone = destinationInfo[0];
		const serviceType = destinationInfo[1];

		const chargingBalance = chargingBalances.find(balance => {
			const now = new Date();
			const endDate = new Date(balance.validFor!.endDate!);
			return Boolean(balance.balanceType && balance.balanceType.startsWith(`${tariffZone}-${serviceType}`) && endDate.getTime() > now.getTime());
		});

		const name =
			ProductOfferingUtil.getCommercialEnrichmentValueInternal(allowance.commercialEnrichments, CommercialEnrichmentNameEnum.names, "name") ||
			ProductOfferingUtil.getPOName(product);

		if (chargingBalance) {
			let current;
			if (allowance.value === -1) {
				current = -1;
			} else {
				current =
					chargingBalance.value! <= 0
						? chargingBalance.value!
						: UnitOfMeasureUtil.convertTo(
						{ amount: chargingBalance.value!, unitOfMeasure: chargingBalance.unitOfMeasure as UnitOfMeasureEnum },
						allowance.unitOfMeasure
						);
			}

			return {
				name,
				unit: allowance.unitOfMeasure,
				max: allowance.value,
				current,
				endDate: chargingBalance.validFor!.endDate!,
				addon: !product.isPlan
			};
		} else if (allowance.value === -1) {
			return {
				name,
				unit: allowance.unitOfMeasure,
				max: allowance.value,
				current: allowance.value,
				endDate: "",
				addon: !product.isPlan
			};
		}

		return undefined;
	};
}

export { SubscriptionUtils, SubscriptionBalances };
