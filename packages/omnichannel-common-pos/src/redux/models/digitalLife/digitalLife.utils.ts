"use strict";

import { get, filter, isEmpty, union, sortBy, find, cloneDeep } from "lodash";
import { getParsedValue, getSafeParsedValue } from "../../utils";
import {
	ConsulValues,
	User,
	PersonsResponse,
	Person,
	Basket,
	BasketItem,
	PhoneNumber,
	EmailAddress,
	Product,
	ProductsExclusionConfiguration,
	SpecSubType,
	Order,
	OrderItem,
	OrderCancel,
	PersonsOrderData,
} from "../../types";
import { Agreement, AgreementLifecycleStatusEnum } from "../../types/Agreement";
import { DigitalLifeState } from "./digitalLife.types";
import ProductUtil from "../../../utils/product/ProductUtil";

export {
	readPersonData,
	extractValues,
	sortAgreements,
	sortPeople,
	mergeAgreements,
	getBaskets,
	getOrders,
	updatePhoneNumbers,
	updateContactEmails,
	updateCharacteristicsForProduct,
	filterExcludedProductsFromAgreements,
	updatePersonOrderStatus,
};

function extractValues(payload: ConsulValues): Partial<DigitalLifeState> {
	const values = {};
	const reasons = get(payload, "change-msisdn/reasons");
	const parseData = (data: any) => getParsedValue(data, {});

	Object.assign(values, {
		agreementOverviewPresentationConfiguration: parseData(get(payload, "digilife/things/agreement_overview_presentation_configuration")),
		deviceDetailsPresentationConfiguration: parseData(get(payload, "digilife/things/device_details_presentation_configuration")),
		accessoryDetailsPresentationConfiguration: parseData(get(payload, "digilife/things/accessory_details_presentation_configuration")),
		subscriptionPlanConfiguration: get(payload, "digilife/things/subscription_plan_name", "Plan"),
		detailSpecificationsVisibilityToggle: get(payload, "digilife/things/detail_specifications_visibility_toggle", "Plan"),
		securitySettingsUrl: get(payload, "features/security_settings_url"),
		topUpPaymentMethodsFilters: parseData(get(payload, "digilife/top-ups/payment_methods_filters")),
		allowUsingNewCreditCardForOneTimeTopUp: get(payload, "digilife/top-ups/allow_using_new_credit_card_for_onetime") === "true",
		allowUsingNewCreditCardForRecurringTopUp: get(payload, "digilife/top-ups/allow_using_new_credit_card_for_recurring") === "true",
		productsExclusionConfiguration: getSafeParsedValue(get(payload, "digilife/products/exclusion_configuration"), {}),
	});

	if (reasons) {
		Object.assign(values, {
			changeMsisdnReasons: getParsedValue(reasons, [])
		});
	}
	return values;
}

function readPersonData(resp: PersonsResponse, user: User) {
	if (!(resp && resp.data && resp.included)) {
		return {};
	}
	const person = resp.data;
	const agreements = sortAgreements(resp.included.filter(({ type }) => type === "agreements"));
	const people = filter(resp.included, { type: "persons" } as {}) as Array<any>;
	const customerAccounts = filter(resp.included, { type: "customerAccounts" } as {});

	let personAndRelatedPeople: Array<Person> = [];
	if (person) {
		personAndRelatedPeople.push(person);
	}
	if (people && !isEmpty(people)) {
		personAndRelatedPeople = personAndRelatedPeople.concat(
			people
		);
	}

	return {
		people: sortPeople(user, personAndRelatedPeople),
		agreements,
		user,
		customerAccounts
	};
}

function mergeAgreements(agreements: Array<Agreement>, newAgreements: Array<Agreement>): Array<Agreement> {
	return newAgreements.map((item) => {
		const existed = find(agreements, {id: item.id});
		return item || existed;
	});
}

function sortAgreements(agreements: Array<Agreement> = []): Array<Agreement> {
	const pending: any = [];
	const active: any = [];
	const terminated: any = [];

	agreements.forEach((agreement) => {
		switch (agreement.attributes.lifeCycleStatus) {
			case AgreementLifecycleStatusEnum.PENDING:
				pending.push(agreement);
				break;
			case AgreementLifecycleStatusEnum.ACTIVE:
				active.push(agreement);
				break;
			case AgreementLifecycleStatusEnum.TERMINATED:
				terminated.push(agreement);
				break;
			default:
		}
	});

	return union(pending, active, terminated);
}

function sortPeople(user: Person, people: Array<Person> = []) {
	let otherPeople: any = [];
	const userArray: any = [];

	people
		.filter((item) => item)
		.forEach((peep) => {
			if (peep.id !== user.id) {
				otherPeople.push(peep);
			} else {
				userArray.push(peep);
			}
		});

	otherPeople = sortBy(otherPeople, (item: Person) => item.attributes.firstName);

	return union(userArray, otherPeople);
}

function getBaskets(basketData: Array<Basket>, basketItemData: Array<BasketItem>): Array<Basket> {
	if (basketData) {
		basketData.forEach((basket: Basket) => {
			const basketItemReferences: Array<{id: string}> = get(basket, "relationships.basketItems.data") || [];
			const basketItemReferenceIds: Array<string> = basketItemReferences.map(ref => {
				return ref.id;
			});

			basket.basketItems = basketItemData.filter((basketItem: BasketItem) =>
				basketItemReferenceIds.includes(basketItem.id)
			);
		});
	}

	return basketData;

}
function getOrders(orderData: Array<Order>, orderItemData: Array<OrderItem>): Array<Order> {
	if (orderData) {
		orderData.forEach((order: Order) => {
			const orderItemReferences: Array<{id: string}> = get(order, "relationships.orderItems.data") || [];
			const orderItemReferenceIds: Array<string> = orderItemReferences.map(ref => {
				return ref.id;
			});

			order.orderItems = orderItemData.filter((orderItem: OrderItem) =>
				orderItemReferenceIds.includes(orderItem.id)
			);
		});
	}
	return orderData;
}

function updatePhoneNumbers(oldPhoneNumbers: PhoneNumber[], contactPhone: PhoneNumber) {
	const findExisting = oldPhoneNumbers.find(phone => phone.id === contactPhone.id);
	if (findExisting) {
		Object.assign(findExisting, contactPhone);
	} else {
		oldPhoneNumbers = [contactPhone, ...oldPhoneNumbers];
	}
	return oldPhoneNumbers;

}
// TODO prepare one method for mail or phone
function updateContactEmails(oldContactEmail: EmailAddress[], contactEmail: EmailAddress) {
	const oldContactEmailExceptUpdated = contactEmail.id
		? oldContactEmail.filter(phone => phone.id !== contactEmail.id)
		: oldContactEmail;
	const newContactEmail = [contactEmail, ...oldContactEmailExceptUpdated];
	return newContactEmail;
}

function updateCharacteristicsForProduct(agreement: Agreement, productId: string, configuration: Object): Agreement {
	const newAgreement = cloneDeep(agreement);

	const subscription = ProductUtil.getSubscriptionFromAgreement(newAgreement);
	const products = subscription ? ProductUtil.getChildProductsRecursively(subscription) : [];
	const productToChange = products.find((p: Product) => p.id === productId);

	if (productToChange) {
		const { characteristics } = productToChange;
		Object.keys(configuration).forEach(key => {
			characteristics[key] = String((configuration as any)[key]);
		});
	}

	return newAgreement;
}

function filterExcludedProductsFromAgreements(agreements?: Array<Agreement>, exclusionConfig?: ProductsExclusionConfiguration): Array<Agreement> | undefined {
	if (Array.isArray(agreements) && exclusionConfig
		&& (Array.isArray(exclusionConfig.specSubTypes) || Array.isArray(exclusionConfig.categoriesIds))) {
		agreements.forEach(agreement => {
			if (agreement.attributes && Array.isArray(agreement.attributes.products)) {
				agreement.attributes.products = agreement.attributes.products.filter((p: Product) => {
					const specSubType: SpecSubType = get(p, "specSubType") || get(p.attributes, "specSubType") as SpecSubType;
					const categoriesIds: Array<string> = (get(p, "categoriesIds") || get(p.attributes, "categoriesIds") || [])
						.map(c => c.toLowerCase());
					if (Array.isArray(exclusionConfig.specSubTypes) && specSubType
						&& exclusionConfig.specSubTypes.includes(specSubType)) {
						return false;
					}
					return !(Array.isArray(exclusionConfig.categoriesIds)
						&& exclusionConfig.categoriesIds.some(c => categoriesIds.includes(c.toLowerCase())));
				});
			}
		});
	}
	return agreements;
}

function updatePersonOrderStatus(personsOrderData: PersonsOrderData, orderCancel?: OrderCancel): PersonsOrderData | undefined {
	const orders: Array<Order> | undefined = personsOrderData ? personsOrderData.orders : undefined;
	const updatedOrderId: string | undefined = orderCancel && orderCancel.attributes && orderCancel.attributes.order
		? orderCancel.attributes.order.id
		: undefined;
	if (orders && updatedOrderId) {
		const order = orders.find(order => order.id === updatedOrderId);
		if (order && order.attributes) {
			order.attributes.status = orderCancel!.attributes!.order!.status;
			return {
				...personsOrderData,
				orders
			};
		}
	}
	return undefined;
}
