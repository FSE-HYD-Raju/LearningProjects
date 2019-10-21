import PropTypes from "prop-types";
import React, { Component } from "react";
import { Flex, FormattedMessage, actions, contextTypesValidationMap } from "omnichannel-common-pos";
import ProductTableContainer from "./ProductTableContainer";
import ProductTableAddressValidation from "./ProductTableAddressValidation";
import InstallationAddressSearchFormContainer from "./InstallationAddressSearchFormContainer";
import { get, find, some, isEqual } from "lodash";
import messages from "./ProductTable.messages";

export default class ServiceDeskProductTable extends Component {
	static contextTypes = contextTypesValidationMap;
	static propTypes = {
		SalesActions: PropTypes.object,
		match: PropTypes.object,
		SalesStore: PropTypes.object,
		BasketStore: PropTypes.object,
		children: PropTypes.node,
		mainCategories: PropTypes.array,
		selectedCurrency: PropTypes.string,
		getProductsFromCategory: PropTypes.func,
		getSubCategories: PropTypes.func,
		handleSearch: PropTypes.func,
		resetSearch: PropTypes.func,
		switchPriceType: PropTypes.func,
		resetFilters: PropTypes.func,
		location: PropTypes.object,
		agreements: PropTypes.array,
		targetAgreementId: PropTypes.string,
		saveTargetAgreementId: PropTypes.func,
		activeInventory: PropTypes.object,
		locale: PropTypes.string,
		categoriesBlacklist: PropTypes.Array,
		selectedCategoryId: PropTypes.string,
		activeAgreementId: PropTypes.string,
		validateStreetAddress: PropTypes.func,
		addressProposals: PropTypes.object,
		addressValidation: PropTypes.object,
	};

	componentWillMount() {
		const {
			match: { params: { category } },
			activeAgreementId,
			activeInventory,
			mainCategories
		} = this.props;
		const searchParams = new URLSearchParams(this.props.location && this.props.location.search);
		if (searchParams && searchParams.get("subcategories")) {
			this.props.getSubCategories(category);
		} else if (mainCategories.length) {
			const categoryId = this.filterCategoryIdFromMainCategoryList(mainCategories, category);
			this.fetchProductsFromCategory(categoryId, activeAgreementId, activeInventory);
		}

		//Let's reset price range filters to all prices price type, so that we can ensure that all products are shown
		this.props.switchPriceType("allPrices");
	}
	filterCategoryIdFromMainCategoryList = (mainCategories, id) => {
		const resultCategory = mainCategories.find((categoryItem) => {
			return categoryItem.id === id;
		});
		if (resultCategory && resultCategory.ids && resultCategory.ids.length) {
			return resultCategory.ids.join();
		}
		return resultCategory && resultCategory.id;
	}
	fetchProductsFromCategory = (categoryId, activeAgreementId, activeInventory) => {
		this.props.getProductsFromCategory(
			categoryId,
			activeAgreementId,
			activeInventory
		);
	}
	currencyHasChanged = newProps => {
		return (
			newProps.selectedCurrency !==
			this.props.selectedCurrency
		);
	};
	categoryHasChanged = newProps => {
		return (
			newProps.match.params.category !== this.props.match.params.category
		);
	};
	languageHasChanged = newProps => {
		return newProps.locale !== this.props.locale;
	};

	componentWillReceiveProps(newprops) {
		const { match: { params: { category } }, activeInventory, activeAgreementId, mainCategories } = newprops;

		/* Refetch products if either selected currency or category has changed */
		/* And set price-range filter to allPrices to ensure all products are shown */
		if (
			this.currencyHasChanged(newprops) ||
			this.categoryHasChanged(newprops) ||
			this.languageHasChanged(newprops)
		) {
			const searchQuery = new URLSearchParams(newprops.location.search);
			if (searchQuery && searchQuery.get("subcategories")) {
				this.props.getSubCategories(category);
			} else {
				const categoryId = this.filterCategoryIdFromMainCategoryList(mainCategories, category);
				this.fetchProductsFromCategory(categoryId, activeAgreementId, activeInventory);
			}

			this.props.switchPriceType("allPrices");
		}
		if (!isEqual(this.props.mainCategories, mainCategories)) {
			const categoryId = this.filterCategoryIdFromMainCategoryList(mainCategories, category);
			this.fetchProductsFromCategory(categoryId, activeAgreementId, activeInventory);
		}

		this.setAgreementIdFromQueryParameter(newprops);
	}

	/*
	catch request query parameter targetAgreementId=<AGREEMENT-ID>
	save as it as targetAgreementId to SalesStore
	fetch omnichannel-api/api/v0/contextualProducts?filter[agreementId]=<AGREEMENT-ID>
	*/
	setAgreementIdFromQueryParameter(newprops) {
		const searchQuery = new URLSearchParams(newprops.location.search);
		const targetAgreementIdFromQueryParam = searchQuery.get(
			"targetAgreementId"
		);

		const currentTargetAgreementId = this.props.targetAgreementId;
		const { match: { params: { category } }, activeInventory } = newprops;

		if (
			targetAgreementIdFromQueryParam &&
			targetAgreementIdFromQueryParam !== currentTargetAgreementId
		) {
			this.props.saveTargetAgreementId(targetAgreementIdFromQueryParam);
			this.props.getProductsFromCategory(
				category,
				targetAgreementIdFromQueryParam,
				activeInventory
			);
		}
	}

	render() {
		const { agreements, targetAgreementId } = this.props;

		const mainCategories = this.props.mainCategories || [];

		const productCategory =
			mainCategories &&
			find(mainCategories, {
				id: this.props.SalesStore.productCategory
			});

		const categoryName = get(productCategory, "name") || get(productCategory, "attributes.name");

		const products = this.props.SalesStore.products;

		const children = [];

		const searchQuery = new URLSearchParams(
			this.props.location && this.props.location.search
		);
		const hasSubCategories =
			(searchQuery && searchQuery.get("subcategories")) ||
			(get(productCategory, "subCategories") || get(productCategory, "attributes.subCategories"))
				? true
				: false;

		const {
			selectedCategoryId,
			categoriesBlacklist,
			activeAgreementId,
			addressValidation,
		} = this.props;

		const checkBlacklist = (categoriesBlacklist, selectedCategoryId) => {
			if (
				!activeAgreementId &&
				categoriesBlacklist &&
				selectedCategoryId
			) {
				return some(categoriesBlacklist, categoryId => {
					return categoryId === selectedCategoryId;
				});
			} else {
				return null;
			}
		};

		let blacklisted = false;

		if (!activeAgreementId && categoriesBlacklist && selectedCategoryId) {
			blacklisted = checkBlacklist(
				categoriesBlacklist,
				selectedCategoryId
			);
		}

		if (get(productCategory, "displayInstallationAddress") || get(productCategory, "attributes.displayInstallationAddress")) {
			children.push(
				<ProductTableAddressValidation
					key="addressValidation"
					validateStreetAddress={(streetName: string, additionalCategory?: string) =>
						this.context.flux.reduxStore.dispatch(actions.location.validateStreetAddress(streetName, additionalCategory))}
					addressProposals={this.context.flux.reduxStore.getState().location.addressProposals}
					productCategory={productCategory}
				/>
			);
		}

		const addressValidationRequired = get(productCategory, "addressValidationRequired") || get(productCategory, "attributes.addressValidationRequired");

		if (addressValidationRequired) {
			children.push(<InstallationAddressSearchFormContainer />);
		}
		const hasValidAddress = !!addressValidation.address;
		(addressValidationRequired ? hasValidAddress : true) && !blacklisted && products && products.length > 0
			? children.push(
					<ProductTableContainer
						key="productTable"
						children={this.props.children}
						items={this.props.SalesStore.products}
						category={this.props.SalesStore.productCategory}
						hasSubCategories={hasSubCategories}
						subCategories={this.props.SalesStore.subCategories}
						sku={this.props.match.params.sku}
						mainCategories={this.props.mainCategories}
						handleSearch={this.props.handleSearch}
						resetSearch={this.props.resetSearch}
						searchTerm={this.props.SalesStore.searchTerm}
						filterProducts={this.props.SalesStore.filterProducts}
						switchPriceType={this.props.switchPriceType}
						resetFilters={this.props.resetFilters}
						agreements={agreements}
						targetAgreementId={targetAgreementId}
						activeAgreementId={activeAgreementId}
					/>
				)
			: blacklisted
				? children.push(
						<Flex
							id="ServiceDeskProductTable-children-wrapper"
							key="categoryBlacklisted"
							alignItems="center"
							justifyContent="center"
							flex={1}
							style={{
								minHeight: "240px",
								padding: "0 40px",
								background: "white",
								marginTop: "15px"
							}}
						>
							<h3>
								<FormattedMessage {...messages.categoryBlacklisted} />
							</h3>
						</Flex>
					)
				: children.push(
						<Flex
							key="noProducts"
							alignItems="center"
							justifyContent="center"
							flex={1}
							style={{
								minHeight: "240px",
								padding: "0 40px",
								background: "white",
								marginTop: "15px"
							}}
						>
							<h3>
								<FormattedMessage {...messages.categoryNoProductsFound} />
								<span style={{ marginLeft: "8px" }}>
									{categoryName}
								</span>
							</h3>
						</Flex>
					);

		return <div>{children}</div>;
	}
}
