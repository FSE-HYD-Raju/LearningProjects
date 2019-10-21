import {
	Characteristic,
	ChargingBalances,
	CommercialEnrichments,
	EnhancedCharacteristic, HasId, HasPrices, HasPricesAttributes, LifecycleChangeAction, Owner, Price,
	ProductLifecycleStatus,
	Resource, Service, SimCard, SpecSubType, SpecType,
	UsageCounters,
} from "./index";
import { ValidityPeriod } from "./ValidityPeriod";
import { Allowance } from "./Allowance";

interface ProductAttributes extends HasId, HasPricesAttributes {
	name: string;
	productOfferingId: string;
	lifeCycleStatus: keyof typeof ProductLifecycleStatus;
	usageCounters: Array<UsageCounters>;
	realizingResources: Array<Resource>;
	realizingServices: Array<Service>;
	characteristics: Record<string, string>;
	commercialEnrichments?: Array<CommercialEnrichments>;
	childProducts: Array<Product>;
	categories: Array<string>;
	categoriesIds: Array<string>;
	parentProducts?: Array<string>;
	specType?: SpecType;
	specSubType?: SpecSubType;
	user?: Owner;
	owner?: Owner;
	payer?: Owner;
	validFor?: ValidityPeriod;
	simCards?: Array<SimCard>;
	billingAccountIds: Array<string>;
	agreementId: string;
	instanceCharacteristics: Record<string, Characteristic>;
	allowances?: Array<Allowance>;
	isPlan?: boolean;
	hasAlternateOfferings?: boolean;
	enhancedCharacteristics?: Record<string, Array<EnhancedCharacteristic>>;
	chargingBalances: Array<ChargingBalances>;
	allowedTransitions: Array<LifecycleChangeAction>;
}

interface Product extends ProductAttributes, HasPrices {
	attributes?: ProductAttributes;
}

export {
	Product,
	ProductAttributes
};
