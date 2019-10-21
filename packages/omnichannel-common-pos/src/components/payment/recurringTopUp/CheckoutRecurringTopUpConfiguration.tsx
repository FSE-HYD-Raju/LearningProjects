import { Component } from "react";
import cssns from "../../../utils/cssnsConfig";
import { ProductOffering, ProductOfferingGroup } from "../../../redux/types";
import { FormattedHTMLMessageDescriptor } from "../../../channelUtils/FormattedHTMLMessage";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
import { ContextType, contextTypesValidationMap } from "../../../types";
import ProductUtil from "../../../utils/product/ProductUtil";
import { BasketItem } from "../../../redux/types";
import RecurringTopUpConfigurationFormContainer from "../../topUps/RecurringTopUpConfigurationFormContainer";
import { Link } from "react-router-dom";
import { isEmpty, head, concat, get } from "lodash";
import messages from "./CheckoutRecurringTopUp.messages";

const { React } = cssns("CheckoutRecurringTopUpConfiguration");

interface CheckoutRecurringTopUpConfigurationStateProps {
	basketItems?: Array<BasketItem>;
	productsWithTopUps: Array<ProductOffering>;
}

interface CheckoutRecurringTopUpConfigurationActionProps {
	actions: {
		handleStoreCustomerPaymentMethodSelection: (isStored: boolean) => void;
	};
}

interface CheckoutRecurringTopUpConfigurationState {
	selectedTypeMessage?: FormattedHTMLMessageDescriptor | null;
}

type Props = CheckoutRecurringTopUpConfigurationStateProps & CheckoutRecurringTopUpConfigurationActionProps;

/* TODO refactor into a function? */
class CheckoutRecurringTopUpConfiguration extends Component<Props, CheckoutRecurringTopUpConfigurationState> {
	static displayName = "CheckoutRecurringTopUpConfiguration";
	static contextTypes = contextTypesValidationMap;

	constructor(props: Props, context: ContextType) {
		super(props, context);
		this.state = {
			selectedTypeMessage: null
		};
	}

	// TODO: Refactor again at some point but make sure the functionality remains the same
	/* tslint:disable */
	getIncludedTopUpProductOfferingGroup(parentProduct: ProductOffering): any {
		const topUpPOG = head(
			[
				"TOPUP_THRESHOLD",
				"TOPUP_TIME_MONTH",
				"TOPUP_TIME_WEEK",
				"TOPUP_SMART"
			].reduce((acc, T_FORM_NAME_value): any => {
				const productOfferingGroup: ProductOffering | undefined = head(
					ProductUtil.getProductOfferingGroupInProductWithTFormName(
						parentProduct,
						T_FORM_NAME_value
					)
				);

				const arrayOfProductOfferings = [productOfferingGroup];

				if (productOfferingGroup) {
					const exists = acc.find((p: ProductOffering) => p.id === productOfferingGroup.id);
					return exists ? acc : concat(acc, arrayOfProductOfferings);
				} else {
					return acc;
				}
			}, [])
		);
		return topUpPOG;
	}
	/* tslint:enable */

	checkForExistingRecurringTopUp = (topUpProductOfferingGroup: any, basketItemsOfParentProduct: BasketItem | undefined) => {

		const recurringTopUpOfferings =
			((topUpProductOfferingGroup && topUpProductOfferingGroup.productOfferings) || []) as Array<ProductOffering>;

		const children = get(basketItemsOfParentProduct, "attributes.childBasketItems", []) as Array<BasketItem>;

		const existingRecurringTopUps = children.filter(child => {
			const productId = get(child, "product.id");
			return !!(productId && recurringTopUpOfferings.find(
				recurringOffering => recurringOffering.id === productId
			));
		});
		return existingRecurringTopUps.length > 0;
	};

	setSelectedTopupType = (typeMessage: FormattedHTMLMessageDescriptor): void => {
		this.setState({ selectedTypeMessage: typeMessage });
	};

	render() {
		const { basketItems } = this.props;
		const selectedTypeMessage: any = this.state.selectedTypeMessage;

		const productsWithTopUps = this.props.productsWithTopUps || [];
		const parentProductsToTopUpProductsMap: Array<any> =
			productsWithTopUps && productsWithTopUps.reduce(
				(acc: Array<any>, parentProduct: any) => {
					const topUpPOG = this.getIncludedTopUpProductOfferingGroup(parentProduct);
					return topUpPOG ? acc.concat({ parentProduct, topUpPOG }) : acc;
				},
				[]
			);

		if (isEmpty(parentProductsToTopUpProductsMap)) {
			return null;
		}

		return (
			<div className="this">
				<h3>
					<FormattedMessage {...messages.recurringTopUpHeader} />
				</h3>
				<div className="header">
					<p className="info-label">
						<FormattedMessage {...messages.recurringTopUpPaymentInfoLabel} />
					</p>
					<p className="info-label">
						<FormattedMessage {...messages.recurringTopUpPreferencesInfoLabel} />
					</p>
				</div>
				{parentProductsToTopUpProductsMap && parentProductsToTopUpProductsMap.map(
					(entry: { parentProduct: ProductOffering, topUpPOG: ProductOfferingGroup }, index: number) => {
						const basketItemsOfParentProduct: BasketItem | undefined = basketItems ? basketItems.find(
							(bi: BasketItem) => {
								return (bi.attributes && bi.attributes.product && bi.attributes.product.id === entry.parentProduct.id || false);
							}
						) : undefined;

						const alreadyConfigured = this.checkForExistingRecurringTopUp(
							entry.topUpPOG,
							basketItemsOfParentProduct
						);

						const link = (<Link
							id="subscription-summary-top-up-configuration-button-lnk"
							to="/digilife/financials/recurring-top-ups"
						>
							<FormattedMessage {...messages.eCare} />
						</Link>);

						return alreadyConfigured ? (
							<div className="alert alert-dismissible alert-success">
								<FormattedMessage
									{...messages.doneInfoLabel}
									values={{ messageType: selectedTypeMessage, topUpLink: link }}
								/>
							</div>
						) : (
								<RecurringTopUpConfigurationFormContainer
									// note that no payment methods passed into configuration form
									flux={this.context.flux}
									key={index}
									basketItemsOfParentProduct={basketItemsOfParentProduct}
									topUpProductOfferingGroup={entry.topUpPOG}
									setSelectedTopUpType={this.setSelectedTopupType}
									handleStoreCustomerPaymentMethodSelection={this.props.actions.handleStoreCustomerPaymentMethodSelection}
								/>
							);
					}
				)}
			</div>
		);
	}
}

export default CheckoutRecurringTopUpConfiguration;
export {
	CheckoutRecurringTopUpConfigurationStateProps,
	CheckoutRecurringTopUpConfigurationActionProps,
	CheckoutRecurringTopUpConfigurationState,
	Props,
};
