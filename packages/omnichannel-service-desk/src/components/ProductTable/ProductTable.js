import _ from "lodash";
import {
	cssns,
	ProductOfferingUtil,
	contextTypesValidationMap,
	FormattedMessage,
	ComparisonSelectors,
	actions,
} from "omnichannel-common-pos";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import ProductTableRow from "./row/ProductTableRow";
import ProductTableHeaderBuilder from "./ProductTableHeaderBuilder";
import get from "lodash/get";
import set from "lodash/set";
import { Component } from "react";
import { connect } from "react-redux";
import messages from "./ProductTable.messages"
const { React } = cssns("ProductTable");

class ProductTableComponent extends Component {
	static contextTypes = contextTypesValidationMap;
	static propTypes = {
		indexKey: PropTypes.string,
		columns: PropTypes.array,
		defaultCriteria: PropTypes.string,
		defaultDirection: PropTypes.string,
		items: PropTypes.array,
		search: PropTypes.string,
		SalesActions: PropTypes.object,
		category: PropTypes.string,
		categoryName: PropTypes.string,
		BasketStore: PropTypes.object,
		BasketActions: PropTypes.object,
		children: PropTypes.node,
		CustomerCaseStore: PropTypes.object,
		configurations: PropTypes.object,
		nominationSubscriptionInformation: PropTypes.object,
		targetAgreementId: PropTypes.string,
		match: PropTypes.object,
		showStockAvailability: PropTypes.bool,
		compareItems: PropTypes.object,
		compareItemActions: PropTypes.object,
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
			criteria:
				ProductOfferingUtil.getPONameForSort ||
				props.defaultCriteria,
			direction: "asc" || props.defaultDirection,
			selectedSortCriteria: "name"
		};
	}

	static defaultProps = {
		items: []
	};

	handleSort = (sortValueGetter, selectedSortCriteria) => {
		let direction = this.state.direction;

		if (selectedSortCriteria !== this.state.selectedSortCriteria) {
			direction = "asc";
		} else if (direction === "asc") {
			direction = "desc";
		} else {
			direction = "asc";
		}

		this.setState({
			criteria: sortValueGetter,
			direction,
			selectedSortCriteria
		});
	};

	handleNominationModifications = (
		nominationSubscriptionInformation: Object,
		configurations: Object,
		originalPo: Object,
		salesPersonId: string
	) => {
		const newConfigurationId = get(
			nominationSubscriptionInformation,
			"productOffering.id"
		);
		configurations = _.cloneDeep(configurations);
		configurations = set(
			configurations,
			newConfigurationId,
			get(configurations, originalPo.id)
		);
		configurations = set(
			configurations,
			[newConfigurationId, "id"],
			newConfigurationId
		);
		const product = get(
			nominationSubscriptionInformation,
			"productOffering"
		);
		const dealerId = get(
			nominationSubscriptionInformation,
			"associatedWith"
		);
		const salesContext = {
			"dealer-id": dealerId,
			"sales-person-id": salesPersonId
		};

		return { configurations, product, salesContext };
	};

	addProductToBasket = _.debounce(
		({ product, hasCustomer }) => {
			const { activeBasket } = this.props.BasketStore;
			const configurations = this.props.configurations;
			const salesContext = null;
			const nominationSubscriptionInformation = get(this.props.nominationSubscriptionInformation, product.id);
			let properties = {
				product,
				configurations,
				parentBasketItem: null,
				basketId: _.get(activeBasket, "id"),
				hasCustomer: Boolean(hasCustomer),
				targetAgreementId: this.props.targetAgreementId,
				hasTopUps: null,
				salesContext
			};
			if (nominationSubscriptionInformation) {
				const nominationProperties = this.handleNominationModifications(
					nominationSubscriptionInformation,
					configurations,
					product,
					get(this.context.flux.stores.UserStore, "state.user.id")
				);
				properties = { ...properties, ...nominationProperties };
			}
			this.props.BasketActions.addProductToBasket(properties);
		},
		400,
		{ leading: true, trailing: false }
	);

	filterOfferingsBasedOnAddOnStatus = (items) => {
		const productOfferings = items.filter((item) => {
			const { attributes: { instanceCharacteristics } } = item;
			const addonStatus = instanceCharacteristics['addon-status'];
			if (addonStatus && addonStatus.values && addonStatus.values.length) {
				return addonStatus.values[0].value.includes('available');
			}
			return true;
		});
		return productOfferings;
	}
	render() {
		const sortCriteria = this.state.criteria;
		const { compareItemActions, compareItems } = this.props;

		/* Commented for now (Sep 5 2017) as it was agreed the comparison modal should be presented regardless of product types -Jussi */
		// const columns =
		// 	["device", "mobile-phone", "tablet", "wearable"].indexOf(
		// 		this.props.category
		// 	) >= 0
		// 		? this.props.columns
		// 		: this.props.columns.filter(c => c.type !== "COMPARISON");
		const columns = this.props.columns.filter(col => {
			if (!this.props.showStockAvailability && col.label === "stock") {
				return false;
			} else {
				return true;
			}
		});

		return (
			<div className="this" key={this.props.indexKey}>
				<ProductTableHeaderBuilder
					{...this.state}
					columns={columns}
					handleSort={this.handleSort}
					category={this.props.category}
				/>

				{this.props.items &&
					this.props.items.length > 0 &&
					_.map(
						_.orderBy(
							this.filterOfferingsBasedOnAddOnStatus(this.props.items),
							[
								item => sortCriteria(item),
								item =>
									ProductOfferingUtil.getPONameForSort(item)
							],
							[this.state.direction, "asc"]
						),
						(row, index) => (
							<div key={"product_table__" + row.id + index}>
								<ProductTableRow
									children={this.props.children}
									product={row}
									index={index}
									params={this.props.match.params}
									columns={columns}
									displayMode="table"
									actions={{
										addProductToBasket: this.addProductToBasket,
										toggleItem: compareItemActions && compareItemActions.toggleItem
									}}
									category={this.props.category}
									isItemInComparison={(item) => {
										return ComparisonSelectors.isItemInComparison(item, compareItems)
									}}
									customer={_.get(
										this.props.CustomerCaseStore,
										"activeCustomerCase.attributes.activeCustomer"
									)}
									showNoCustomerWarning={_.get(
										this.props.BasketStore,
										"showNoCustomerWarning"
									)}
									showBlacklistedCustomerWarning={_.get(
										this.props.BasketStore,
										"showBlacklistedCustomerWarning"
									)}
									configurations={ this.props.configurations }
								/>
							</div>
						)
					)}

				{this.props.items &&
				this.props.items.length === 0 && (
					<div className="no-products-found">
						<h3>
							{this.props.search && this.props.search !== "" ? (
								<FormattedMessage
									{...messages.noProductFoundForSearch}
									values={{
										search: <b>{this.props.search}</b>,
										category: (
											<i>{this.props.categoryName}</i>
										)
									}}
								/>
							) : (
								<FormattedMessage
									{...messages.noProductFound}
									values={{
										category: (
											<i>{this.props.categoryName}</i>
										)
									}}
								/>
							)}
						</h3>
					</div>
				)}
			</div>
		);
	}
}

const ProductTable = withRouter(ProductTableComponent);
ProductTable.displayName = "ProductTable";

const mapStateToProps = (state) => {
	return {
		compareItems: state.comparison && state.comparison.items,
	}
}

const mapDispatchToProps = (dispatch) => ({
	compareItemActions: {
		toggleItem: (item) => { dispatch(actions.comparison.toggleItem(item)); }
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductTable);