import { Flux } from "omnichannel-common-pos";
import _ from "lodash";

const { BaseStore, ImmStore } = Flux;

@ImmStore
class CustomerCaseStore extends BaseStore {
	constructor() {
		super();
		this.bindActions(this.alt.actions.CustomerCaseActions);
		this.state = {
			activeCustomerCase: null,
			agreements: [],
			activeAddons: [],
			activeAgreementId: null,
			customerBasketSelectData: {
				customerBaskets: []
			}
		};

		this.exportPublicMethods({
			getFormattedPhoneAndName: this.getFormattedPhoneAndName,
			getFormattedAddress: this.getFormattedAddress,
			getCustomerOffers: this.getCustomerOffers,
			getSidebarNotifications: this.getSidebarNotifications
		});
	}

	createNewCustomerCase(data) {
		this.setState({
			activeCustomerCase: data
		});
	}

	getFormattedAddress() {
		const postalAddress = _.get(
			this,
			"activeCustomerCase.attributes.activeCustomer.postalAddresses[0]"
		);

		if (postalAddress) {
			const street = postalAddress.street;
			const postalCode = postalAddress.postalCode;
			const city = postalAddress.city;
			const country = postalAddress.country;

			return `${street}, ${postalCode} ${city}, ${country}`;
		}

		return null;
	}

	getFormattedPhoneAndName() {
		const firstName = _.get(
			this,
			"activeCustomerCase.attributes.activeCustomer.firstName",
			""
		);
		const lastName = _.get(
			this,
			"activeCustomerCase.attributes.activeCustomer.lastName",
			""
		);
		const name = `${firstName} ${lastName}`;
		return name;
	}

	updateCustomerCase(data) {
		if (typeof data !== "boolean") {
			if (data.attributes && data.attributes.status === "ENDED") {
				this.setState({
					activeCustomerCase: null,
					customerBasketSelectData: {
						customerBaskets: []
					}
				});
			} else {
				this.setState({ activeCustomerCase: data });
			}
		}
	}

	getSidebarNotifications() {
		/*
			TODOS: replace dummy data

			* API endpoint for data, request parameters etc.
			* Data model
		*/

		const notifications = [
			{
				itemType: "Contacts (dummy data)",
				time: new Date(),
				header: "Contact reason A, Contact reason D, Contact reason X",
				content: "Call handeled by some Agent",
				link: "/servicedesk/customer/contacts",
				font_awesome: "comment-o"
			},
			{
				itemType: "Transactions (dummy data)",
				time: new Date(),
				header: "Top-up for 50 €",
				content: "Credit card via ECare",
				link: "/servicedesk/customer/transactions",
				font_awesome: "credit-card"
			},
			{
				itemType: "Orders & Baskets (dummy data)",
				time: new Date(),
				header: "Open basket",
				content: "3 items, 150 €",
				link: "/servicedesk/customer/orders",
				font_awesome: "shopping-cart"
			},
			{
				itemType: "Cases (dummy data)",
				time: new Date(),
				header: "Customer case title lorem ipsum",
				content: "Call handeled by some Agent",
				link: "/servicedesk/customer/cases",
				font_awesome: "ticket"
			}
		];

		return notifications;
	}

	getCustomerOffers() {
		/*
			TODOS:
			* API endpoint for data, request params etc.

			* Does this need a own store & actions?

			* Bind different button actions to some alt actions

				* "Add to basket" - button
					- bind BasketActions#addProduct method to offer action buttons.

				* "Send to customer" button should bind some other Actions method (dont know what)

				* "Get it now" button (also no idea what it should do)

		*/

		const offerItems = [
			{
				type: "Special (dummy data)",
				header: "iPhone 7 fall campaign",
				description:
					"Promotional text here lorem ipsum dolor adipiscing elit sit amet consecterur Promotional text here lorem ipsum dolor adipiscing elit sit amet consecterur",
				actions: [{ text: "get it now", onClick: () => {} }],
				link: "/servicedesk/customer/offers"
			},
			{
				type: "Upgrade (dummy data)",
				header: "Prepaid Gold special",
				details: [
					"Upgrade fee 5 €",
					"Recurring fee 20€ /mth",
					"200 min calls",
					"Unlimited SMS",
					"2 GB data"
				],
				actions: [
					{ text: "send to customer", onClick: () => {} },
					{ text: "add to basket", onClick: () => {} }
				]
			}
		];

		return offerItems;
	}

	endCustomerCase(location) {
		this.alt.recycle(this.alt.stores.CustomerStore);
		this.alt.recycle(this.alt.stores.CustomerCaseStore);
		this.alt.recycle(this.alt.stores.MsisdnStore);

		if (location) {
			this.alt.history.push(location);
		}
	}

	getAgreements(agreements) {
		//Pick first valid agreement id
		const activeAgreementId = agreements
			? _.get(
					_.head(
						agreements.filter(
							agreement =>
								agreement.attributes.lifeCycleStatus === "ACTIVE"
						)
					),
					"id",
					null
				)
			: null;

		this.setState({
			agreements,
			availableAddons: null,
			//RUBT-70728 & RND-16741, set first valid agreement's id as active one, this will be the default one to use with basket-items add
			activeAgreementId
		});
	}

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

	setCustomerOpenBaskets(customerBaskets) {
		this.setState({
			customerBasketSelectData: {
				customerBaskets
			}
		});
	}

	clearCustomerBasketsData() {
		this.setState({
			customerBasketSelectData: {
				customerBaskets: []
			}
		});
	}

	changeCustomerActiveAgreement(activeAgreementId) {
		this.setState({
			activeAgreementId
		});
	}
}

export default CustomerCaseStore;
