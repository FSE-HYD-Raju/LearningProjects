import _ from "lodash";
import BaseStore from "./BaseStore";
import { deprecated } from "../../redux/decorators";

const baskets = [];

const bills = [
	{
		id: 21123213,
		attributes: {
			amount: 140,
			due: "31.8.2015",
			status: "unpaid"
		}
	},
	{
		id: 1327721,
		attributes: {
			amount: 90,
			due: "29.7.2015",
			status: "paid"
		}
	}
];

const methods = [
	{
		id: 123312213213231312213,
		name: "My Mastercard",
		type: "Mastercard",
		number: "123456789",
		lastUsed: "12:34 21.08.2015"
	}
];

class DigitalLifeStore extends BaseStore {
	constructor() {
		super();
		this.bindActions(this.alt.actions.DigitalLifeActions);
		this.bindAction(
			this.alt.actions.ConsulActions.getValues,
			this.getConsulValues
		);
		this.bindAction(
			this.alt.actions.DigitalLifeActions.dispatchPersonForUser,
			this.getPersonForUser
		);
		this.state = {
			user: {},
			people: [],
			agreements: [],
			customerAccounts: [],
			relations: {},
			baskets,
			bills,
			paymentMethods: methods,
			usageDateRange: {
				startDate: null,
				endDate: null
			},
			usageEvents: {},
			usageCounters: {},
			basketPaymentReceipts: {},
			personsOrderData: {},
			billingBalances: [],
			subscriptionPlanConfiguration: "",
			initializedMsisdnChange: {},
			securitySettingsUrl: null
		};

		this.exportPublicMethods({
			getOrderItemsByOrderId: this.getOrderItemsByOrderId,
		});
	}

	@deprecated("Covered by consul.saga and consul.getValues()")
	getConsulValues(payload: any) {
		this.extractAgreementOverviewPresentationConfiguration(payload);
		this.extractDeviceDetailsPresentationConfiguration(payload);
		this.extractAccessoryDetailsPresentationConfiguration(payload);
		this.extractSubscriptionPlanConfiguration(payload);
		this.extractDetailSpecificationsVisibilityToggle(payload);
		this.extractSecuritySettingsUrl(payload);
	}

	@deprecated()
	extractAgreementOverviewPresentationConfiguration(payload: Object) {
		try {
			const agreementOverviewPresentationConfiguration = JSON.parse(
				_.get(
					payload,
					"digilife/things/agreement_overview_presentation_configuration"
				)
			);

			this.setState({ agreementOverviewPresentationConfiguration });
		} catch (e) {
			console.warn(
				"Failed to parse config 'agreement_overview_presentation_configuration'!"
			);
		}
	}

	@deprecated()
	extractSecuritySettingsUrl(payload: Object) {
		try {
			this.state.securitySettingsUrl = _.get(
				payload,
				"features/security_settings_url"
			);
		} catch (e) {
			console.warn("Failed to parse config 'security_settings_url'!");
		}
	}

	@deprecated()
	extractDeviceDetailsPresentationConfiguration(payload: Object) {
		try {
			const deviceDetailsPresentationConfiguration = JSON.parse(
				_.get(
					payload,
					"digilife/things/device_details_presentation_configuration"
				)
			);

			this.setState({ deviceDetailsPresentationConfiguration });
		} catch (e) {
			console.warn(
				"Failed to parse config 'device_details_presentation_configuration'!"
			);
		}
	}

	@deprecated()
	extractAccessoryDetailsPresentationConfiguration(payload: Object) {
		try {
			const accessoryDetailsPresentationConfiguration = JSON.parse(
				_.get(
					payload,
					"digilife/things/accessory_details_presentation_configuration"
				)
			);

			this.setState({ accessoryDetailsPresentationConfiguration });
		} catch (e) {
			console.warn(
				"Failed to parse config 'accessory_details_presentation_configuration'!"
			);
		}
	}

	@deprecated()
	extractSubscriptionPlanConfiguration(payload: Object) {
		try {
			const subscriptionPlanConfiguration = _.get(
				payload,
				"digilife/things/subscription_plan_name",
				"Plan"
			);

			this.setState({ subscriptionPlanConfiguration });
		} catch (e) {
			console.warn("Failed to parse config 'subscription_plan_name'!");
		}
	}

	@deprecated()
	extractDetailSpecificationsVisibilityToggle(payload: any) {
		try {
			const detailSpecificationsVisibilityToggle = _.get(
				payload,
				"digilife/things/detail_specifications_visibility_toggle",
				"Plan"
			);

			this.setState({ detailSpecificationsVisibilityToggle });
		} catch (e) {
			console.warn("Extraction error: ", e.message);
		}
	}

	getOrderItemsByOrderId = orderId => {
		const relatedOrderItems = [];
		const order = this.state.orders.find(order => order.id === orderId);
		const orderItemRelationships = _.get(
			order,
			"relationships.orderItems.data",
			[]
		);
		orderItemRelationships.forEach(orderItemRelation => {
			const orderItem = _.find(this.state.orderItems, orderItem => {
				return orderItem.id === orderItemRelation.id;
			});
			if (orderItem) {
				relatedOrderItems.push(orderItem);
			}
		});

		return relatedOrderItems;
	};

	getBasketItems = (basketData, basketItemData) => {
		const detailedBaskets = [];
		basketData &&
			basketData.forEach(basket => {
				const basketItemReferences =
					_.get(basket, "relationships.basketItems.data") || [];

				const basketItemReferenceIds = basketItemReferences.map(ref => {
					return ref.id;
				});
				// gets all the basket items mentioned in basket refereces to basket
				basket.basketItems = _(basketItemData)
					.keyBy("id")
					.at(basketItemReferenceIds)
					.value();

				detailedBaskets.push(basket);
			});
		return detailedBaskets;
	};

	setAgreements(data) {
		if (data.agreements) {
			this.setState({ agreements: data.agreements });
		}
	}

	@deprecated("digitalLife.reducers GET_PERSONS_COMPLETE")
	initAll(data) {
		// sets user, products, places, people
		this.setState({
			people: data.people,
			agreements: data.agreements,
			user: data.user,
			customerAccounts: data.customerAccounts
		});
	}

	getCustomerAccounts(customerAccounts) {
		this.setState({
			customerAccounts
		});
	}

	updateCustomerAccount(customerAccounts) {
		this.setState({
			customerAccounts
		});
	}

	@deprecated()
	getAgreements(agreements) {
		this.setState({
			agreements
		});
	}

	@deprecated()
	getAgreement(newAgreement) {
		const agreements = this.state.agreements;
		this.setState({
			agreements: agreements.map(
				agreement =>
					agreement.id === newAgreement.id
						? Object.assign({}, agreement, newAgreement)
						: agreement
			)
		});
	}

	addPerson(person) {
		console.warn("ADD PERSON", person);
		const people = this.state.people;
		if (!_.includes(people, person)) {
			console.log("Adding person to digiStore");
			const p = people.concat(person);
			this.setState({
				people: p,
				newPerson: person
			});
		}
		console.log("ADDING PERSON", person, this.state.people);
	}

	addThing(thing) {
		const agreements = this.state.agreements;
		if (!_.includes(agreements, thing)) {
			agreements.push(thing);
			this.setState({
				agreements
			});
		}
	}

	fetchCategoryUserProducts({ categoryUserProducts }) {
		this.setState({ categoryProducts: categoryUserProducts });
	}

	disableThing(id) {
		const agreements = this.state.agreements;
		const thing = _.find(agreements, { id });
		thing.attributes.productStatus = {
			status: "DISABLED"
		};
		this.setState({
			agreements
		});
	}

	enableThing(id) {
		const agreements = this.state.agreements;
		const thing = _.find(agreements, { id });
		const status = this.isBlocked(thing) ? "BLOCKED" : "OK";
		thing.attributes.productStatus = {
			status
		};
		this.setState({
			agreements
		});
	}

	isBlocked(thing) {
		if (thing.attributes.blockCalls) {
			if (thing.attributes.blockCalls.all) {
				return true;
			}
			if (thing.attributes.blockCalls.outgoing) {
				return true;
			}
			if (thing.attributes.blockCalls.incoming) {
				return true;
			}
			if (thing.attributes.blockCalls.roaming) {
				return true;
			}
		}
		if (thing.attributes.blockData) {
			if (thing.attributes.blockData.all) {
				return true;
			}
			if (thing.attributes.blockData.roaming) {
				return true;
			}
		}
		if (thing.attributes.blockSMS) {
			if (thing.attributes.blockSMS.all) {
				return true;
			}
			if (thing.attributes.blockSMS.outgoing) {
				return true;
			}
			if (thing.attributes.blockSMS.incoming) {
				return true;
			}
			if (thing.attributes.blockSMS.roaming) {
				return true;
			}
		}
		return false;
	}

	getPersonForUser(person) {
		this.setState({
			currentUserAsPerson: person
		});
	}

	setUsageDateRange(data) {
		this.setState({
			usageDateRange: {
				startDate: data.startDate,
				endDate: data.endDate
			}
		});
	}

	@deprecated()
	fetchTransactionEvents(payload) {
		this.setState({
			transactionEvents: payload.transactionEvents
		});
	}

	@deprecated()
	fetchAgreementUsageEvents(payload) {
		this.setState({
			usageEvents: {
				[payload.agreementId]: payload.usageEvents
			}
		});
	}

	@deprecated()
	fetchProductUsageCounters(payload) {
		this.setState({
			usageCounters: {
				[payload.productId]: payload.usageCounters
			}
		});
	}

	initializeLifecycleStatusChange(productModification) {
		this.setState({
			productModification: {
				resource: productModification.data,
				products:
					productModification.included &&
					productModification.included.reduce((stack, value) => {
						return stack.concat(value.attributes.product);
					}, []),
				basket:
					productModification.included &&
					_.find(productModification.included, { type: "baskets" })
			}
		});
	}

	@deprecated("Covered by digitalLife.getBasketPaymentReceipts()")
	getBasketPaymentReceipts() {
	}

	fetchNumberTypesForChangeMsisdnModal({ numberClasses = [] }) {
		numberClasses.sort((l, r) => {
			const leftPrice = _.get(
				_.get(l, "attributes.prices").find(
					price => price.type === "ONE_TIME"
				),
				"taxFreeAmount",
				0
			);
			const rightPrice = _.get(
				_.get(r, "attributes.prices").find(
					price => price.type === "ONE_TIME"
				),
				"taxFreeAmount",
				0
			);
			return leftPrice - rightPrice;
		});

		this.setState({
			numberClasses
		});
	}

	fetchMsisdnsForNumberClass({ msisdns }) {
		this.setState({
			msisdns
		});
	}

	initializeChangeMsisdn(payload) {
		this.setState({
			initializedMsisdnChange: {
				...payload.data,
				basketItems: payload.included.filter(
					include => include.type === "basketItems"
				)
			}
		});
	}

	clearChangeMsisdn() {
		this.setState({
			initializedMsisdnChange: null
		});
	}

	@deprecated("digitalLife.reducers GET_PERSON_ORDERS_COMPLETE")
	getPersonsOrders(payload) {
		this.setState({
			personsOrderData: payload
		});
	}
}

export default DigitalLifeStore;
