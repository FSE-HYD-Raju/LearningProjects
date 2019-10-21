import { agreement as testAgreement, selectedCurrency, product1 as testProduct } from "./testData/agreement";
import { subscription as consumptionSubscription } from "./testData/subscription";
import { SubscriptionUtils } from "./Subscription.utils";
import {
	ChargingBalances,
	ChargingBalancesTypeEnum,
	UnitOfMeasureEnum,
	ProductLifecycleStatus,
	TariffConfig,
	ServiceConfig
} from "../../../redux/types";

const testChargingBalances: Array<ChargingBalances> = [{
	id: "juanita-charging-balance-main",
	balanceType: ChargingBalancesTypeEnum.MAIN_BALANCE,
	name: "Main balance",
	validFor: {
		startDate: "2016-11-01T00:00:00Z"
	},
	value: 99,
	currency: "USD",
	unitOfMeasure: UnitOfMeasureEnum.MONETARY
}];

describe("SubscriptionUtils", () => {

	it("returns agreement charging balances", () => {
		let chargingBalances = SubscriptionUtils.getAgreementChargingBalances(testAgreement);
		expect(chargingBalances).toEqual(undefined);

		const agreement = { ...testAgreement, chargingBalances: testChargingBalances };
		chargingBalances = SubscriptionUtils.getAgreementChargingBalances(agreement);
		expect(chargingBalances).toEqual(testChargingBalances);
	});

	it("returns monetary charging balance", () => {
		let mainBalance = SubscriptionUtils.getMainBalance(testAgreement);
		expect(mainBalance).toEqual(undefined);

		const agreement = { ...testAgreement, chargingBalances: testChargingBalances };
		mainBalance = SubscriptionUtils.getMainBalance(agreement);
		expect(mainBalance).toEqual(testChargingBalances[0]);
	});

	it("returns 3 types of balances (overall, cash, bonus)", () => {
		let balances = SubscriptionUtils.getBalances(testAgreement, selectedCurrency);
		expect(balances).toEqual({
			overallBalance: undefined,
			cashBalance: undefined,
			bonusBalance: undefined,
			bonusBalances: []
		});

		const chargingBalances = [...testChargingBalances];
		const agreement = { ...testAgreement, chargingBalances };
		balances = SubscriptionUtils.getBalances(agreement, selectedCurrency);
		expect(balances.overallBalance).toEqual(chargingBalances[0]);
		expect(balances.cashBalance).toEqual(undefined);
		expect(balances.bonusBalance).toEqual(undefined);
		expect(balances.bonusBalances).toEqual([]);

		chargingBalances.push({
			...testChargingBalances[0],
			balanceType: ChargingBalancesTypeEnum.CASH_BALANCE,
			value: 15
		});

		chargingBalances.push({
			...testChargingBalances[0],
			balanceType: ChargingBalancesTypeEnum.BONUS_BALANCE,
			value: 89
		});

		agreement.chargingBalances = chargingBalances;
		balances = SubscriptionUtils.getBalances(agreement, selectedCurrency);
		expect(balances.overallBalance).toEqual({
			...chargingBalances[0],
			value: 203
		});
		expect(balances.cashBalance).toEqual(chargingBalances[1]);
		expect(balances.bonusBalance).toEqual(chargingBalances[2]);
		expect(balances.overallBalance!.value).toEqual(203);
		expect(balances.cashBalance!.value).toEqual(15);
		expect(balances.bonusBalance!.value).toEqual(89);
	});

	it("returns subscription status and deactivation details (if applicable)", () => {
		let status = SubscriptionUtils.getSubscriptionStatus(testProduct);
		expect(status.lifeCycleStatus).toEqual(ProductLifecycleStatus.ACTIVE);
		expect(status.showReason).toEqual(false);
		expect(status.reasonForDeActivation).toEqual(undefined);

		const product = { ...testProduct };
		product.lifeCycleStatus = ProductLifecycleStatus.TERMINATED;
		product.characteristics.reason_code = "The end";
		status = SubscriptionUtils.getSubscriptionStatus(product);
		expect(status.lifeCycleStatus).toEqual(ProductLifecycleStatus.TERMINATED);
		expect(status.showReason).toEqual(true);
		expect(status.reasonForDeActivation).toEqual("The end");
	});

	it("returns subscription activation date(s)", () => {
		let activationDate = SubscriptionUtils.getSubscriptionActivationDate(testProduct);
		expect(activationDate).toEqual("");

		const product = { ...testProduct };
		product.validFor = {
			startDate: "2016-11-03T00:00:00Z"
		};
		activationDate = SubscriptionUtils.getSubscriptionActivationDate(product);
		expect(activationDate).toEqual("03/11/2016");

		product.validFor = {
			startDate: "2016-11-03T00:00:00Z",
			endDate: "2019-11-03T00:00:00Z"
		};
		activationDate = SubscriptionUtils.getSubscriptionActivationDate(product);
		expect(activationDate).toEqual("03/11/2016 - 03/11/2019");
	});

	it("returns consumption data from subscription", () => {
		const product = { ...consumptionSubscription };
		const tariffZones: TariffConfig[] = [
			{
				zoneType: "national",
				name: "National"
			},
			{
				zoneType: "international",
				name: "International"
			},
			{
				zoneType: "roaming",
				name: "Roaming"
			}
		];
		const serviceTypes: ServiceConfig[] = [
			{
				serviceType: "data",
				name: "Data"
			},
			{
				serviceType: "sms",
				name: "SMS"
			},
			{
				serviceType: "voice",
				name: "Voice"
			}
		];

		const expectedResult = [
			{
				zoneType: "national",
				services: [
					{
						serviceType: "data",
						information: [
							{
								name: "Wind Young - Digital Edition",
								unit: "GIGABYTES",
								max: 40,
								current: 40,
								endDate: "3019-01-07T00:00:00Z",
								addon: false
							}
						]
					},
					{
						serviceType: "voice",
						information: [
							{
								name: "Wind Young - Digital Edition",
								unit: "MINUTES",
								max: 1000,
								current: 1000,
								endDate: "3019-01-07T00:00:00Z",
								addon: false
							}
						]
					}
				]
			},
			{
				zoneType: "international",
				services: [
					{
						serviceType: "voice",
						information: [
							{
								name: "International Plus",
								unit: "MINUTES",
								max: 100,
								current: 100,
								endDate: "3019-01-12T00:00:00Z",
								addon: true
							}
						]
					}
				]
			},
			{
				zoneType: "roaming",
				services: [
					{
						serviceType: "data",
						information: [
							{
								name: "Wind Young - Digital Edition",
								unit: "GIGABYTES",
								max: 4.5,
								current: 2.147483648,
								endDate: "3019-01-07T00:00:00Z",
								addon: false
							}
						]
					}
				]
			}
		];

		const consumptionData = SubscriptionUtils.getConsumptionData(product, true, tariffZones, serviceTypes);

		expect(consumptionData).toEqual(expectedResult);
	});
});
