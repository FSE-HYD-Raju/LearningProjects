// @flow
import { type Location, type RouterHistory, withRouter } from "react-router";
import {
	AltContainer,
	cssns,
	FilterControlsContainer,
	Flex,
	FluidContainer,
	ProductUtil,
	withObjectCustomization,
	ServiceDeskObjectCustomizationPoints,
	contextTypesValidationMap,
	FormattedMessage,
	OcAlert,
	OcAlertType,
	OcTextInput,
	OcInputLabelPosition, OcButtonType, OcButton
} from "omnichannel-common-pos";
import { omit } from "lodash";
import ProductTable from "./ProductTable";
import { Component } from "react";
import MultiProductTable from "./MultiProductTable";
// $FlowFixMe
import defaultColumns from "./column/productTableColumns";
import type { ProductOffering } from "omnichannel-flow-pos";
import messages from "./ProductTable.messages";
const { React } = cssns("ProductWrapper");

const columns = withObjectCustomization(
	ServiceDeskObjectCustomizationPoints.PRODUCT_TABLE_COLUMNS,
	defaultColumns
);

type Props = {
	items: Array<ProductOffering>,
	category: string,
	hasSubCategories: boolean,
	subCategories: Array<*>,
	expanded: boolean,
	store: Object,
	label: string,
	mainCategories: Array<*>,
	filterProducts: (Array<ProductOffering>) => void,
	searchTerm: string,
	handleSearch: () => void,
	resetSearch: () => void,
	resetFilters: () => void,
	shoppingForAgreement: Object,
	targetAgreementId: string,
	agreements: Array<Object>,
	history: RouterHistory,
	location: Location,
	match: { params: Object },
	skipFilters: boolean,
	activeAgreementId: string
};

type State = {
	filtersVisible: boolean,
	items: Array<any>,
	subCategories: Array<any>,
	filter?: string
};

class ProductTableContainer extends Component<Props, State> {
	static displayName = "ProductTableContainer";
	static contextTypes = contextTypesValidationMap;

	static defaultProps = {
		items: [],
		subCategories: [],
		searchTerm: ""
	};

	state = {
		items: [],
		subCategories: [],
		filtersVisible: false
	};

	handleSearchInput = (e: SyntheticEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;
		this.setState({
			filter: value
		});
	};

	findCategoryByCategoryId = (id: string = this.props.category) => {
		let categoryById = null;
		if (this.props.mainCategories && this.props.mainCategories.length > 0) {
			categoryById = this.props.mainCategories.find(
				category => {
					return id === category.id;
				}
			);
		}
		return categoryById;
	};

	toggleFilters = () => {
		/* $FlowFixMe */
		const { filtersVisible } = this.state;

		const show = !filtersVisible;
		if (!show) {
			this.props.resetFilters();
		}

		this.setState({
			filtersVisible: show
		});
	};

	render() {
		const activeCategory = this.findCategoryByCategoryId(this.props.category);
		const { formatMessage } = this.context.intl;

		const filteredProducts = !this.props.skipFilters
			? this.props.filterProducts(this.props.items) || []
			: this.props.items;

		const { agreements, activeAgreementId } = this.props;

		const shoppingForAgreement =
			agreements &&
			activeAgreementId &&
			agreements.find(agreement => agreement.id === activeAgreementId);

		const planProduct = ProductUtil.getProducts(shoppingForAgreement).find(product => product.isPlan === true);

		const phoneNumber =
			planProduct &&
			(ProductUtil.findPhoneNumber(planProduct) || ProductUtil.getProductName(planProduct) || "");

		const productCount = filteredProducts.length;

		return (
			<div className="this">
				<header className="header w-box-header">
					<h3>
						{activeCategory && activeCategory.name}
					</h3>
					{this.props.category &&
					!this.props.hasSubCategories && (
						<OcTextInput
							id="service-desk-product-table-search-input"
							label={formatMessage(messages.searchLabel)}
							labelPosition={OcInputLabelPosition.LEFT}
							inputType="text"
							value={this.props.searchTerm}
							onChange={this.props.handleSearch}
							placeholder={formatMessage(messages.search)}
							style={{ paddingRight: "41px" }}
							addonRight={
								this.props.searchTerm.length === 0 ? (
									<OcButton
										buttonType={OcButtonType.LINK}
										className="button-icon button-icon-color"
									>
										<i className="fa fa-search" />
									</OcButton>
								) : (
									<OcButton
										className="button-icon"
										buttonType={OcButtonType.LINK}
										onClick={() => {
											this.props.resetSearch();
										}}
									>
										<i className="fa fa-times" />
									</OcButton>
								)
							}
						/>
					)}
				</header>
				{shoppingForAgreement && (
					<OcAlert alertType={OcAlertType.INFO}>
						<Flex
							direction="row"
							className="shopping-for-notification"
							justifyContent="space-between"
						>
							<FormattedMessage
								{...messages.subscriptionShopping}
								values={{
									phoneNumber
								}}
							/>
						</Flex>
					</OcAlert>
				)}
				<Flex direction="column" style={{ overflow: "hidden" }}>
					<Flex
						justifyContent="space-between"
						flex={1}
						style={{ padding: "10px 0px 10px 0px" }}
					>
						<a
							style={{ cursor: "pointer" }}
							onClick={this.toggleFilters}
						>
							{this.state.filtersVisible ? (
								<span>
									<i className="fa fa-caret-up" />
									{` `}
									<FormattedMessage {...messages.filtersHideAndReset} />

								</span>
							) : (
								<span>
									<i className="fa fa-caret-down" />
									{` `}
									<FormattedMessage {...messages.showFilters} />
								</span>
							)}
						</a>
						<FormattedMessage
							{...messages.productFound}
							values={{ productCount }}
						/>
					</Flex>

					<FluidContainer
						height={this.state.filtersVisible ? "auto" : 0}
					>
						<Flex
							style={{
								background: "#F5F5F5",
								border: "1px solid #E1E1E1",
								borderRadius: 2,
								padding: 10,
								marginTop: 10,
								marginBottom: 20
							}}
						>
							<FilterControlsContainer flux={this.context.flux}/>
						</Flex>
					</FluidContainer>
				</Flex>
				<div>
					<AltContainer
						stores={{
							CustomerCaseStore: this.context.flux.stores.CustomerCaseStore,
							BasketStore: this.context.flux.stores.BasketStore,
						}}
						actions={{
							BasketActions: this.context.flux.actions.BasketActions
						}}
						transform={({
							BasketActions,
							CustomerCaseStore,
							BasketStore,
						}) => {
							return {
								BasketActions,
								CustomerCaseStore,
								BasketStore,
								configurations: this.context.flux.reduxStore.getState().productOfferingConfiguration.configurations,
								showStockAvailability: this.context.flux.reduxStore.getState().feature.showStockAvailability,
								nominationSubscriptionInformation: this.context.flux.reduxStore.getState()
									.productOfferingConfiguration.nominationSubscriptionInformation,
							};
						}}
					>
						{this.props.hasSubCategories ? (
							<MultiProductTable
								{...omit(this.props, "store")}
								items={this.props.subCategories}
								search={this.props.searchTerm}
								columns={columns}
								categoryName={activeCategory && activeCategory.name}
								targetAgreementId={this.props.targetAgreementId}
							/>
						) : (
							<ProductTable
								{...omit(this.props, "store")}
								items={filteredProducts}
								search={this.props.searchTerm}
								columns={columns}
								categoryName={activeCategory && activeCategory.name}
								targetAgreementId={this.props.targetAgreementId}
							/>
						)}
					</AltContainer>
				</div>
			</div>
		);
	}
}

export default withRouter(ProductTableContainer);
