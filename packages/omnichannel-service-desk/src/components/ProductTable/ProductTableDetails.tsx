import { Component } from "react";
import {
	cssns,
	contextTypesValidationMap,
	withMsisdnConfiguration,
	OcTabLink,
	ProductOfferingConfigurationContainer,
	ProductOfferingUtil,
	MsisdnConfigurationUtils,
	withCustomization,
	ContextType,
	ProductOffering,
	EmptyComponent,
	FormattedMessage,
	Basket,
	MsisdnConfigurationProps,
	User,
	BasketActionAddProductToBasket,
	Configurations,
} from "omnichannel-common-pos";
import messages from "../../index.messages";
import productMessages from "./ProductTable.messages";
import TechnicalDetails from "./details/TechnicalDetails";
import CommercialOffer from "./CommercialOffer";
import AvailabilityContainer from "./availability/AvailabilityContainer";
import { cloneDeep, set, get, debounce } from "lodash";
import { ServiceDeskComponentCustomizationPoints } from "../../customization/ServiceDeskComponentCustomizationPoints";
import { RouteComponentProps } from "react-router";
import commercialOfferMessages from "./CommercialOffer.messages";

const ProductPrice = require("./ProductPrice");
const ProductTableError = require("./ProductTableError");
const { React } = cssns("ProductTableDetails");
const MsisdnSelectionModal = withCustomization(ServiceDeskComponentCustomizationPoints.PRODUCT_DETAILS_CONFIG_MSISDN_CUSTOM_MODAL, EmptyComponent);

interface ProductTableDetailsStateProps {
	activeBasket: Basket;
	defaultStockLevel: number;
	errorToBeShownOnProductTable: string;
	nominationSubscriptionInformation: object,
	user?: User;
	activeAgreementId: string,
	activeCustomerCase: object,
	validIcc?: boolean;
	validFnF?: boolean;
	ICCIDPreactivationValidationPOs: Array<any>;
	showStockAvailability: boolean;
	configurations: Configurations;
	nonAddonProductPresentInBasket: boolean;
	commercialProductOfferingId: string;
}

interface ProductTableDetailsActionProps {
	actions: {
		addProductToBasket: BasketActionAddProductToBasket;
		clearErrorOnProductTable: () => void;
	}
}

type ProductTableDetailsProps = ProductTableDetailsStateProps & ProductTableDetailsActionProps & MsisdnConfigurationProps & RouteComponentProps<any>;

class ProductTableDetails extends Component<ProductTableDetailsProps> {
	static contextTypes = contextTypesValidationMap;

	constructor(props: ProductTableDetailsProps, context: ContextType) {
		super(props, context);
	}

	handleNominationModifications = (nominationSubscriptionInformation: Object, configurations: Configurations, salesPersonId: string | undefined, originalPo: ProductOffering) => {
		const newConfigurationId = get(nominationSubscriptionInformation, "productOffering.id");
		configurations = cloneDeep(configurations);
		configurations = set(configurations, newConfigurationId, get(configurations, originalPo.id));
		configurations = set(configurations, [newConfigurationId, "id"], newConfigurationId);
		const product = !get(nominationSubscriptionInformation, "productOffering.errorCode")
			? get(nominationSubscriptionInformation, "productOffering")
			: null;

			const dealerId = get(nominationSubscriptionInformation, "msisdn.associatedWith");
			const salesContext = {"dealer-id": dealerId, "sales-person-id": salesPersonId};

		return {
			configurations,
			product,
			salesContext
		};
	};

	addProductToBasket = debounce(
		({product, basketId}) => {
			const nominationSubscriptionInformation = get(this.props.nominationSubscriptionInformation, `${product.id}`);
			let properties = {
				product,
				configurations: this.props.configurations,
				basketId,
				hasCustomer: Boolean(get(this.props.activeCustomerCase, "attributes.activeCustomer")),
				targetAgreementId: this.props.activeAgreementId,
			};
			if (nominationSubscriptionInformation) {
				const nominationProperties = this.handleNominationModifications(nominationSubscriptionInformation, this.props.configurations!, get(this.props.user, "id"), product);
				properties = {...properties, ...nominationProperties};
			}
			if (get(properties, "product")) {
				this.props.actions.addProductToBasket(properties);
			}
		},
		400,
		{leading: true, trailing: false}
	);

	handleSubmit = (event: any) => {
		event.preventDefault();
		if (this.props.msisdnConfig && MsisdnConfigurationUtils.isMsisdnNeedToBeConfigured(this.props.msisdnConfig)) {
			this.props.toggleMsisdnModal(true);
		} else { // TODO: what if activeBasket is undefined?
			this.addProductToBasket({ product: this.props.product, basketId: this.props.activeBasket && this.props.activeBasket.id });
		}
	};

	render() {
		const {
			product,
			match: { params },
			errorToBeShownOnProductTable,
			validIcc,
			validFnF,
			ICCIDPreactivationValidationPOs,
			showStockAvailability,
			nonAddonProductPresentInBasket,
			commercialProductOfferingId,
		} = this.props;
		console.log(this.props)

		const tabStyles = {
			minHeight: "50px",
			margin: 0,
			border: "1px solid #e1e1e1",
			borderLeft: 0,
			borderRadius: 0,
			background: "#efefef",
			color: "#337ab7"
		};
		
		const showingDetails = this.props.match.params.sku && product!.id === this.props.match.params.sku;
		const commercialProductOfferingGroup = get(product, "attributes.productOfferingGroups").filter((productOfferingGroup: { id: string; }) => productOfferingGroup.id === commercialProductOfferingId);
		const commercialProductOfferings = commercialProductOfferingGroup.length > 0 && commercialProductOfferingGroup[0].productOfferings;
		return (
			<div className="this" id={`product_details__${product!.id}`}>
				{showingDetails && (
					(!commercialProductOfferingGroup.length ? (
					<form onSubmit={this.handleSubmit}>
						<div className="product-container" id={`ProductTableDetails-${product!.id}-product`}>
							<div className="links">
								<OcTabLink
									to={`/servicedesk/shop/${params.category}/${params.sku}`}
									id={`ProductDetails-tab-${params.category}-${params.sku}-basic`}
									onlyActiveOnIndex={true}
									style={tabStyles}
									className="OcTab-productDetails"
								>
									<FormattedMessage {...productMessages.detailsBasicInformation} />
								</OcTabLink>
								<OcTabLink
									to={`/servicedesk/shop/${params.category}/${params.sku}/technical`}
									id={`ProductDetails-tab-${params.category}-${params.sku}-technical`}
									style={tabStyles}
									className="OcTab-productDetails "
								>
									<FormattedMessage {...productMessages.detailsTechnicalInformation} />
								</OcTabLink>
								{
									showStockAvailability && (
										<OcTabLink
											to={`/servicedesk/shop/${params.category}/${params.sku}/availability`}
											id={`ProductDetails-tab-${params.category}-${params.sku}-availability`}
											style={tabStyles}
											className="OcTab-productDetails"
										>
											<FormattedMessage {...productMessages.detailsAvailability} />
										</OcTabLink>
									)
								}
								<div className="spacer"/>
							</div>
						</div>

						{!params.tabId && (
							<div className="container">
								<div className="container-inner">
									<ProductPrice
										configurations={this.props.configurations}
										product={product}
										defaultStockLevel={this.props.defaultStockLevel}
										validIcc={!ICCIDPreactivationValidationPOs || !ICCIDPreactivationValidationPOs.includes(product!.id) || validIcc}
										validFnF={!ProductOfferingUtil.isFnfProduct(get(product, "attributes.specificationId")) || validFnF}
										nonAddonProductPresentInBasket={nonAddonProductPresentInBasket}
									/>
								</div>

								{/* Product description */}
								<div className="error-container">
									<ProductTableError
										errorToBeShownOnProductTable={errorToBeShownOnProductTable}
										clearErrorOnProductTable={this.props.actions.clearErrorOnProductTable}
									/>
									<h3 className="label" id={`ProductTableDetails-${product!.id}-product-name`}>
										{ProductOfferingUtil.getPOName(product!)}
									</h3>
									<div id={`ProductTableDetails-${product!.id}-product-description-short`}>
										<div className="description">
											{ProductOfferingUtil.getCommercialEnrichmentValueFromPO(product, "descriptions", "short-description") || (
												<FormattedMessage {...messages.noDescription}/>
											)}
										</div>
										<ProductOfferingConfigurationContainer // TODO: container here?
											flux={this.context.flux}
											toggleMsisdnModal={this.props.toggleMsisdnModal}
											msisdnConfig={this.props.msisdnConfig}
											msisdnModalVisible={this.props.msisdnModalVisible}
											product={product!}
											userOpened={this.props.userOpened}
										/>
										<MsisdnSelectionModal/>
									</div>
								</div>
							</div>
						)}
						{params.tabId === "technical" && (
							<TechnicalDetails
								featureCharacteristics={get(product, "attributes.featureCharacteristics")}
								instanceCharacteristics={get(product, "attributes.instanceCharacteristics")}
							/>
						)}
						{showStockAvailability && params.tabId === "availability" && (
							<AvailabilityContainer flux={this.context.flux} sku={params.sku}/>
						)}
					</form>
					):(
							<form onSubmit={this.handleSubmit}>
								{!params.tabId && (<div className="commercial-offers-container" id={`ProductTableDetails-${product!.id}-product`}>
									<h4 className="commercial-offer-heading"><FormattedMessage {...commercialOfferMessages.commercialOffer} /></h4>
									{
										commercialProductOfferings && commercialProductOfferings.map(
											productOffering => <CommercialOffer productOffering={productOffering} />
										)
									}

								</div>)}
								{params.tabId === "commercial" && (
									<div className="commercial-offers-container">
										<OcTabLink
											to={`/servicedesk/shop/${params.category}/${params.sku}`}
											id={`ProductDetails-tab-${params.category}-${params.sku}-basic`}
											onlyActiveOnIndex={true}
											className="commercial-offer-heading"
										>
											<h4><FormattedMessage {...commercialOfferMessages.commercialOffer} /><i className="fas fa-angle-right commercial-forward-arrow"></i></h4>
										</OcTabLink>
										<div className="container">
											<div className="container-inner">
												<ProductPrice
													configurations={this.props.configurations}
													product={product}
													defaultStockLevel={this.props.defaultStockLevel}
													validIcc={!ICCIDPreactivationValidationPOs || !ICCIDPreactivationValidationPOs.includes(product!.id) || validIcc}
													validFnF={!ProductOfferingUtil.isFnfProduct(get(product, "attributes.specificationId")) || validFnF}
													nonAddonProductPresentInBasket={nonAddonProductPresentInBasket}
												/>
											</div>

											{/* Product description */}
											<div className="error-container">
												<ProductTableError
													errorToBeShownOnProductTable={errorToBeShownOnProductTable}
													clearErrorOnProductTable={this.props.actions.clearErrorOnProductTable}
												/>
												<h3 className="label" id={`ProductTableDetails-${product!.id}-product-name`}>
													{ProductOfferingUtil.getPOName(product!)}
												</h3>
												<div id={`ProductTableDetails-${product!.id}-product-description-short`}>
													<div className="description">
														{ProductOfferingUtil.getCommercialEnrichmentValueFromPO(product, "descriptions", "short-description") || (
															<FormattedMessage {...messages.noDescription} />
														)}
													</div>
													<ProductOfferingConfigurationContainer
														flux={this.context.flux}
														toggleMsisdnModal={this.props.toggleMsisdnModal}
														msisdnConfig={this.props.msisdnConfig}
														msisdnModalVisible={this.props.msisdnModalVisible}
														product={product!}
														userOpened={this.props.userOpened}
													/>
													<MsisdnSelectionModal />
												</div>
											</div>
										</div>
									</div>
								)}
							</form>
					)))
					}
			</div>
		);
	}
}

const ProductTableDetailsWithMsisdnConfiguration = withMsisdnConfiguration<ProductTableDetailsProps>(ProductTableDetails);
export default ProductTableDetailsWithMsisdnConfiguration;
export {
	ProductTableDetails,
	ProductTableDetailsStateProps,
	ProductTableDetailsActionProps,
	ProductTableDetailsProps,
};
