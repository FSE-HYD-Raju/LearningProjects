import { Product } from "../../redux/types";
import { ChargingBalancesMock } from "./ChargingBalancesMock";

interface MakeProductConfig {
	id?: string;
	childProducts?: MakeProductConfig[];
}
interface MakeSubscriptionProductConfig extends MakeProductConfig {
	phoneNumber?: string;
}

class ProductMock {
	static PLAN_CATEGORY_ID: string = "plan";
	static COMMERCIAL_CATEGORY_ID: string = "commercial";
	static ADDON_CATEGORY_ID: string = "additional";
	static ACTIVE_AGREEMENT_ID: string = "test-agreement";
	static SUBSCRIPTION_PHONE_NUMBER: string = "393809022519";

	static DEFAULT_PRODUCT_CONFIG: MakeProductConfig = {
		id: "product-id",
		childProducts: []
	};
	static DEFAULT_SUBSCRIPTION_PRODUCT_CONFIG: MakeSubscriptionProductConfig = {
		...ProductMock.DEFAULT_PRODUCT_CONFIG,
		phoneNumber: ProductMock.SUBSCRIPTION_PHONE_NUMBER
	};

	static ACTIVE_SUBSCRIPTION: Product = {
		id: "test-sub",
		name: "Test subscription",
		productOfferingId: "test-sub-po",
		lifeCycleStatus: "ACTIVE",
		usageCounters: [],
		realizingResources: [
			{
				id: "msisdn-resource",
				type: "MSISDN",
				primaryId: ProductMock.SUBSCRIPTION_PHONE_NUMBER,
				lifeCycleStatus: "ACTIVE",
			}
		],
		realizingServices: [],
		characteristics: {},
		commercialEnrichments: [],
		childProducts: [],
		categories: ["postpaid", "Plan"],
		categoriesIds: ["postpaid-cat", "plan"],
		simCards: [],
		billingAccountIds: ["billingaccount-postpaid"],
		agreementId: ProductMock.ACTIVE_AGREEMENT_ID,
		instanceCharacteristics: {},
		allowances: [],
		isPlan: true,
		enhancedCharacteristics: {},
		chargingBalances: [ChargingBalancesMock.MONETARY_100_EUR],
		allowedTransitions: []
	};
	static ACTIVE_SUBSCRIPTION_AS_PLAN: Product = {
		...ProductMock.ACTIVE_SUBSCRIPTION,
		id: "sub-as-plan-product",
		name: "Subscription as plan",
		categoriesIds: [ProductMock.COMMERCIAL_CATEGORY_ID, ProductMock.PLAN_CATEGORY_ID]
	};

	static BASE_ADDON: Product = {
		id: "base-addon",
		name: "Base addon",
		productOfferingId: "base-addon-po",
		lifeCycleStatus: "ACTIVE",
		usageCounters: [],
		realizingResources: [],
		realizingServices: [],
		characteristics: {},
		commercialEnrichments: [],
		childProducts: [],
		categories: ["Add-ons"],
		categoriesIds: [ProductMock.ADDON_CATEGORY_ID, ProductMock.COMMERCIAL_CATEGORY_ID],
		simCards: [],
		billingAccountIds: [],
		agreementId: ProductMock.ACTIVE_AGREEMENT_ID,
		instanceCharacteristics: {},
		allowances: [],
		isPlan: false,
		enhancedCharacteristics: {},
		chargingBalances: [],
		allowedTransitions: [],
		specType: "PRODUCT",
		specSubType: "ADDITIONAL"
	};
	static NOT_CONFIGURABLE_ACTIVE_ADDON: Product = {
		...ProductMock.BASE_ADDON,
		id: "non-configurable-active-addon",
		name: "Active addon",
		productOfferingId: "non-configurable-active-addon-po"
	};
	static NOT_ADDON: Product = {
		...ProductMock.BASE_ADDON,
		id: "not-addon",
		name: "Not addon",
		productOfferingId: "not-addon-po",
		specType: "SERVICE",
		specSubType: "BLOCKING",
		categoriesIds: []
	};
	static PLAN: Product = ({
		isPlan: true,
		id: "plan-product",
		name: "Tariff plan",
		productOfferingId: "not-addon-po",
		specType: "PRODUCT",
		specSubType: "MOBILE",
		categoriesIds: [ProductMock.COMMERCIAL_CATEGORY_ID, ProductMock.PLAN_CATEGORY_ID]
	} as Partial<Product>) as Product;

	static ACTIVE_SUBSCRIPTION_WITH_ADDONS: Product = {
		...ProductMock.ACTIVE_SUBSCRIPTION,
		childProducts: [ProductMock.NOT_CONFIGURABLE_ACTIVE_ADDON, ProductMock.NOT_ADDON, ProductMock.PLAN]
	};
	static ACTIVE_MULTILEVEL_SUBSCRIPTION_WITH_ADDONS: Product = ({
		isPlan: false,
		childProducts: [
			{
				...ProductMock.ACTIVE_SUBSCRIPTION,
				childProducts: [ProductMock.NOT_CONFIGURABLE_ACTIVE_ADDON, ProductMock.NOT_ADDON]
			}
		]
	} as Partial<Product>) as Product;

	static ACTIVE_SUBSCRIPTION_WITH_ADDONS_AND_PLAN: Product = {
		...ProductMock.ACTIVE_SUBSCRIPTION_WITH_ADDONS,
		childProducts: [...ProductMock.ACTIVE_SUBSCRIPTION_WITH_ADDONS.childProducts, ProductMock.PLAN]
	};

	static make(config: MakeProductConfig = {}): Product {
		const configWithDefaults = { ...ProductMock.DEFAULT_PRODUCT_CONFIG, ...config };
		return {
			...ProductMock.BASE_ADDON,
			id: configWithDefaults.id!,
			childProducts: (configWithDefaults.childProducts || []).map(ProductMock.make)
		};
	}
	static makeSubscription(config: MakeSubscriptionProductConfig = {}): Product {
		const configWithDefaults = { ...ProductMock.DEFAULT_SUBSCRIPTION_PRODUCT_CONFIG, ...config };
		return {
			...ProductMock.ACTIVE_SUBSCRIPTION,
			id: configWithDefaults.id!,
			realizingResources: [
				{
					id: "msisdn-resource",
					type: "MSISDN",
					primaryId: configWithDefaults.phoneNumber!,
					lifeCycleStatus: "ACTIVE",
				}
			]
		};
	}
}
export { ProductMock };
