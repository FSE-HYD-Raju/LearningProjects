import cssnsConfig from "../../../utils/cssnsConfig";
import { get, flatten, uniq, flatMap, startCase, toLower } from "lodash";
import ProductUtil from "../../../utils/product/ProductUtil";
import {
	Agreement,
	Basket,
	BasketActionAddProductToBasket,
	BasketActionDiscardBasket,
	BasketActionGetBasket,
	BasketActionGetBasketIncludeBasketItems,
	BasketActionUpdateOwnerToBasket,
	BasketItem,
	Configurations,
	Person,
	ProductOffering,
	BasketLifecycleStatusEnum,
} from "../../../redux/types";
import { PureComponent, ReactNode } from "react";
import messages from "../Basket.messages";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
import { CustomerCaseBasket } from "../../../redux/models/customerCase/customerCase.types";
import OcModal from "../../ocComponents/OcModal";
import OcListWidget from "../../ocComponents/OcListWidget";
import { commonServiceDeskRoutes } from "../../../routes/commonRoutesMap";
import Time from "../../../channelUtils/Time";
import { OcButton, OcButtonType } from "../../ocComponents/button/OcButton";
import { Error, ErrorForModal } from "../../../redux/services/ErrorContainer";

const { React } = cssnsConfig("CustomerBaskets");

interface CustomerBasketsStateProps {
	unidentifiedCustomerBasketProduct?: ProductOffering;
	basketData?: Array<CustomerCaseBasket>;
	agreements?: Array<Agreement>;
	activeAgreementId?: string;
	activeCustomer?: Person;
	activeBasket: Basket;
	configurations: Configurations;
}

interface CustomerBasketsActionProps {
	actions: {
		addProductToBasket: BasketActionAddProductToBasket;
		discardBasket: BasketActionDiscardBasket;
		showErrorModal: (error: ErrorForModal) => void;
		changeCustomerActiveAgreement: (activeAgreementId?: string | null, discardBasket?: boolean) => void;
		getBasket: BasketActionGetBasket;
		getBasketIncludeBasketItems: BasketActionGetBasketIncludeBasketItems;
		updateOwnerToBasket: BasketActionUpdateOwnerToBasket;
		endCustomerCase: (location?: Location) => void;
		createNewCustomerCase: (salesRepId?: string) => void;
		clearCustomerBasketsData: () => void;
		cancelAddProduct: () => void;
		historyPush: (newLocation: string) => void;
	};
}

interface CustomerBasketsState {
	expandedBaskets: Array<string>;
	showCustomerBasketModal: boolean;
}

interface BasketAndItems {
	basket: Basket;
	basketItems: Array<BasketItem>;
}

type CustomerBasketsProps = CustomerBasketsStateProps & CustomerBasketsActionProps;

class CustomerBaskets extends PureComponent<CustomerBasketsProps, CustomerBasketsState> {
	static displayName: string = "CustomerBaskets";

	constructor(props: CustomerBasketsProps) {
		super(props);
		this.state = {
			expandedBaskets: [],
			showCustomerBasketModal: true,
		};
	}

	componentWillReceiveProps(newProps: CustomerBasketsStateProps) {
		if (this.props.activeBasket && newProps.activeBasket) {
			const existingBasketSelected = newProps.activeBasket.id !== this.props.activeBasket.id;
			if (existingBasketSelected &&
				newProps.activeBasket.attributes.lifecycleStatus === BasketLifecycleStatusEnum.COMMITTED) {
				this.props.actions.clearCustomerBasketsData();
				this.props.actions.historyPush(commonServiceDeskRoutes.SERVICE_DESK_CHECKOUT.createLink());
			}
			if (existingBasketSelected &&
				newProps.activeBasket.attributes.lifecycleStatus === BasketLifecycleStatusEnum.OPEN) {
				this.props.actions.clearCustomerBasketsData();
				this.props.actions.historyPush(commonServiceDeskRoutes.SERVICE_DESK_SHOP.createLink());
			}
		}
	}

	checkAgreementIdValidity = (agreementId: string) => {
		return (this.props.agreements || []).filter(
			(agreement: Agreement) =>
				agreement.id === agreementId &&
				agreement.attributes.lifeCycleStatus === "ACTIVE"
		);
	};

	getBasketAgreementIds = (basketId: string) => {
		return uniq(flatMap(this.props.basketData && this.props.basketData.filter((basketData: BasketAndItems) => {
				return basketData.basket.id === basketId;
			})
				.map((basketAndItems: BasketAndItems) => {
					// filter falsy values
					return basketAndItems.basketItems.filter((basketItem: BasketItem) => {
						return get(basketItem, "attributes.targetAgreementId") ? true : false;
					})
					// return only string array
					.map((basketItem: BasketItem) => {
						return get(basketItem, "attributes.targetAgreementId");
					});
				})
			)
		);
	};

	updateOwnerToBasket = () => {
		if (this.props.activeBasket && this.props.activeCustomer) {
			this.props.actions.updateOwnerToBasket(this.props.activeBasket, this.props.activeCustomer);
		}
	};

	discardBasket = (basketId: string) => {
		if (this.props.activeCustomer) {
			this.props.actions.discardBasket(basketId, this.props.activeCustomer.customerAccountId || this.props.activeCustomer.id);
		}
	};

	showBasketItemValidationErrorModal = () => {
		this.props.actions.showErrorModal({
			errors: [
				new Error(undefined, undefined, undefined, "Selected basket contains invalid data. New basket is used")
			]
		});
	};

	createNewBasket = () => {
		this.updateOwnerToBasket();
		this.props.actions.clearCustomerBasketsData();
		this.props.actions.historyPush(commonServiceDeskRoutes.SERVICE_DESK_SHOP.createLink());
		this.setState({ showCustomerBasketModal : false });
	};

	setBasketToCustomer = (selectedBasket: string) => {
		const selectedBasketId = selectedBasket;
		if (selectedBasketId) {
			this.props.actions.getBasket(selectedBasketId);
			this.props.actions.getBasketIncludeBasketItems(selectedBasketId);
		} else {
			this.updateOwnerToBasket();
			this.props.actions.clearCustomerBasketsData();
			this.showBasketItemValidationErrorModal();
		}

		// If there is product waiting for adding to basket, add it now
		if (this.props.unidentifiedCustomerBasketProduct) {
			this.props.actions.addProductToBasket({
				product: this.props.unidentifiedCustomerBasketProduct,
				basketId: selectedBasketId,
				configurations: this.props.configurations,
				hasCustomer: true,
				targetAgreementId: this.props.activeAgreementId
			});
			// Clear unidentifiedCustomerBasket from basket store
			this.props.actions.cancelAddProduct();
		}
	};

	generateBasketRow(basket: CustomerCaseBasket, idx: number, expanded: boolean) {
		return {
			columns: [
				(
					<div
						className="basket-fa-caret"
						onClick={() => {
							const newExpandedBaskets = expanded ? this.state.expandedBaskets.filter((basketId: string) => {
									return basketId !== basket.basket.id;
								}
							) : this.state.expandedBaskets.concat(basket.basket.id);

							this.setState({
								expandedBaskets: newExpandedBaskets
							});
						}}
					>
						{expanded
							? (<i className="fa fa-caret-down customer-basket-icon" id={`basket-row-icon-${idx}`}/>)
							: (<i className="fa fa-caret-right customer-basket-icon" id={`basket-row-icon-${idx}`}/>)}
						{basket.basket.attributes && basket.basket.attributes.referenceNumber}
					</div>),
				basket.basketItems ? basket.basketItems.length : 0,
				basket.basket.attributes.createdAt ? Time.formatDateTimeHourMin(basket.basket.attributes.createdAt) : "",
				basket.basket.attributes.lastModifiedAt ? Time.formatDateTimeHourMin(basket.basket.attributes.lastModifiedAt) : "",
				(basket.basket.attributes.lifecycleStatus ?
					basket.basket.attributes.lifecycleStatus === BasketLifecycleStatusEnum.COMMITTED ?
						<span className="badge badge-info">{startCase(toLower(basket.basket.attributes.lifecycleStatus))} </span> :
						<span className="badge badge-light">{startCase(toLower(basket.basket.attributes.lifecycleStatus))} </span>
				: "")
			]
		};
	}

	handleClose = async () => {
		await this.props.actions.endCustomerCase();
		this.props.actions.createNewCustomerCase();
		this.setState({ showCustomerBasketModal : false });
	};

	// TODO: this all should be heavily refactored. starting from OcListWidget
	render() {
		const headers = [
			<FormattedMessage key="1" {...messages.basketReferenceNumber}/>,
			<FormattedMessage key="2" {...messages.numberOfItems}/>,
			<FormattedMessage key="3" {...messages.created}/>,
			<FormattedMessage key="4" {...messages.lastModified}/>,
			<FormattedMessage key="5" {...messages.status}/>
		];

		// TODO: remove it. styles should not be passed as props
		const layout = [
			{
				display: "flex",
				overflow: "hidden",
				justifyContent: "flex-start",
				flex: 9,
				cursor: "pointer"
			},
			{
				display: "flex",
				overflow: "hidden",
				justifyContent: "flex-start",
				flex: 3.5
			},
			{
				display: "flex",
				overflow: "hidden",
				justifyContent: "flex-start",
				flex: 3.5
			},
			{
				display: "flex",
				overflow: "hidden",
				justifyContent: "flex-start",
				flex: 3.5
			},
			{
				display: "flex",
				overflow: "hidden",
				justifyContent: "flex-start",
				flex: 2.5
			}
		];

		// TODO: refactor this to use new OcAccordion
		const basketItemsWithTargetmentId: Array<CustomerCaseBasket> = this.props.basketData && this.props.basketData.filter((basketAndItems: BasketAndItems) =>
		basketAndItems.basketItems && basketAndItems.basketItems.filter((basketItem: BasketItem) =>
			!!get(basketItem, "attributes.basketProductId")
		).length > 0
	) || [];
		const rows =
			flatten(
				basketItemsWithTargetmentId.map((basket: CustomerCaseBasket, idx: number) => {
					const expanded = this.state.expandedBaskets.find(id => id === basket.basket.id);

					const basketRows = [
						this.generateBasketRow(
							basket,
							idx,
							!!expanded,
						)
					];

					if (expanded) {
						// Create product (name) rows to follow basket row
						const productRows =
							basket.basketItems &&
							basket.basketItems.map((basketItem: BasketItem) => {
								return {
									columns: [
										(<div key="product-row" className="product-row"/>),
										(
											<div key="basket-product-row" className="basket-product-row">
												{ProductUtil.getProductName(basketItem)}
											</div>
										)
									]
								};
							});

						if (productRows) {

							productRows.forEach((productRow: any) => {
								basketRows.push(productRow);
							});

							let basketActionButton;
							if (basket.basket.attributes.lifecycleStatus === BasketLifecycleStatusEnum.COMMITTED) {
								basketActionButton = (
									<OcButton
										id="select-customer-basket-commit-button"
										buttonType={OcButtonType.PRIMARY}
										htmlBtnType="submit"
										onClick={() => {
											this.setBasketToCustomer(basket.basket.id);
										}}
									>
										<FormattedMessage {...messages.commitBasket}/>
									</OcButton>
								);
							} else {
								basketActionButton = (
									<OcButton
										id="select-customer-basket-edit-button"
										buttonType={OcButtonType.PRIMARY}
										htmlBtnType="submit"
										onClick={() => {
											this.setBasketToCustomer(basket.basket.id);
										}}
									>
										<FormattedMessage {...messages.editBasket}/>
									</OcButton>
								);
							}

							const buttonRow = {
								columns: [
									(<div key="product-row" className="product-row"/>),
									(
										<div key="basket-product-row" className="basket-product-row">
											{basketActionButton}
										</div>
									)
								]
							};

							basketRows.push(buttonRow);
						}
					}
					return basketRows;
				})
			);
		const widgetProps = {
			headers,
			rows: rows as Array<{columns: ReactNode[]}>,
			id: "customer-baskets-widget",
			toggleExpanded: () => {},
			expanded: true,
			expansionDisabled: false,
			accordionListStyle: {
				width: "98%",
				borderBottom: "1px solid #e5e5e5",
				borderTop: "1px solid #e5e5e5",
				paddingTop: "15px"
			},
			layout,
			titleDisabled: false
		};

		return (
			<div className="this">
				<OcModal
					id="select-customer-basket-modal"
					showModal={ this.state.showCustomerBasketModal }
					largeModal={true}
					bsSize={"large"}
					className="CustomerBaskets-modal"
					title={<FormattedMessage {...messages.basketList}/>}
					onClose={this.handleClose}
					keyboard={true}
					enforceFocus={true}
					onOk={() => {
						this.createNewBasket();
					}}
					okButtonLabel={<FormattedMessage {...messages.createNewBasket}/>}
				>
					<div className="main-container">
						<div className="customer-baskets-disclaimer">
							<i className="fa fa-info-circle customer-baskets-info-icon"/>
							<FormattedMessage {...messages.selectABasket}/>
						</div>
						<div className="basket-list-widget">
							<OcListWidget {...widgetProps} />
						</div>
					</div>
				</OcModal>
			</div>
		);
	}
}

export default CustomerBaskets;
export {
	BasketAndItems,
	CustomerBasketsProps,
	CustomerBasketsActionProps,
	CustomerBasketsStateProps,
	CustomerBasketsState
};
