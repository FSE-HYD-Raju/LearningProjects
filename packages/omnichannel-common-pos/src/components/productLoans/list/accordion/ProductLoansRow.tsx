import cssns from "../../../../utils/cssnsConfig";
import { get } from "lodash";
import ProductUtil from "../../../../utils/product/ProductUtil";
import ProductOfferingUtil from "../../../../utils/ProductOfferingUtil";
import messages from "../../../../commonMessages";
import { CommercialEnrichmentNameEnum, PriceTypeEnum, Product, ProductOffering } from "../../../../redux/types";
import ProductLoansListMessages from "../productLoansList.messages";
import addonMessages from "../../../subscription/addon/Addon.messages";
import AddonPrice from "../../../subscription/addon/AddonPrice";
import OcDownloadButton from "../../../ocComponents/OcDownloadButton";
import { FC } from "react";
import { CommonCustomizationPoints, withCustomization } from "../../../../customization";
import FormattedMessage from "../../../../channelUtils/FormattedMessage";
import Time from "../../../../channelUtils/Time";
import { OcButton, OcButtonSize, OcButtonType } from "../../../ocComponents";

const { React } = cssns("AddonsTabView");

interface ProductLoansRowProps {
	loan: ProductOffering | Product;
	isActive: boolean;
	activateLoan: (loan: ProductOffering) => void;
	openTopUpModal: () => void;
}

const ProductLoansRow: FC<ProductLoansRowProps> = props => {
	const { loan, activateLoan, isActive } = props;
	const name = ProductUtil.getProductName(loan) || " - ";
	const upfrontPrice = ProductOfferingUtil.getPriceRange(loan, PriceTypeEnum.ONE_TIME);
	const recurringPrice = ProductOfferingUtil.getPriceRange(loan, PriceTypeEnum.RECURRENT);

	const description = ProductOfferingUtil.getCommercialEnrichmentValueFromPO(loan, CommercialEnrichmentNameEnum.descriptions, "description") || "";

	const validForEndDate = get(loan, "validFor.endDate");
	const expiryDate = validForEndDate ? Time.formatDate(validForEndDate) : "-";
	const actions = [];
	if (isActive) {
		actions.push(
			<OcButton
				buttonType={OcButtonType.PRIMARY}
				buttonSize={OcButtonSize.SMALL}
				outline={true}
				id={`product-loan-pay-back-now-button-link-${loan.id}`}
				key={`product-loan-pay-back-now-button-link-${loan.id}`}
				onClick={e => {
					e.stopPropagation();
					props.openTopUpModal();
				}}
			>
				<FormattedMessage {...ProductLoansListMessages.payBackNow} />
			</OcButton>
		);
	} else {
		actions.push(
			<OcButton
				buttonType={OcButtonType.PRIMARY}
				buttonSize={OcButtonSize.SMALL}
				id={`linkAddAddonToBasket-${loan.id}`}
				key={`linkAddAddonToBasket-${loan.id}-key`}
				onClick={e => {
					e.stopPropagation();
					activateLoan(loan as ProductOffering);
				}}
			>
				<FormattedMessage {...messages.activateAddon} />
			</OcButton>
		);
	}

	return (
		<div className="list-item">
			<div className="list-item-column name">
				<span>{name}</span>
				<div className="description">{description}</div>
			</div>
			<div className="list-item-column fees">
				{ProductUtil.hasPrice(upfrontPrice) && (
					<>
						<FormattedMessage {...messages.subscriptionAddonActivationFee}/>
						<AddonPrice range={upfrontPrice} />
					</>
				)}
				{ProductUtil.hasPrice(recurringPrice) && (
					<>
						<FormattedMessage {...messages.subscriptionAddonRecurringFee} />
						<AddonPrice range={recurringPrice} />
					</>
				)}
				{!ProductUtil.hasPrice(upfrontPrice) && !ProductUtil.hasPrice(recurringPrice) && (
					<span className="customer-subscription-addons-free-addon">
						<FormattedMessage {...messages.productOfferingConfigFreeProduct} />
					</span>
				)}
			</div>
			<div className="list-item-column expiration">{expiryDate}</div>
			<div className="list-item-column status">
				<FormattedMessage
					{...addonMessages.addonLifecycleStatus}
					values={{ lifecycleStatus: isActive ? "Active" : "Available" }}
				/>
			</div>
			<div className="list-item-column actions">
				{actions.length > 1
					? (<OcDownloadButton>{actions}</OcDownloadButton>)
					: actions[0]
				}
			</div>
		</div>
	);
};

const ProductLoansRowCustomization = withCustomization<ProductLoansRowProps>(
	CommonCustomizationPoints.PRODUCT_LOAN_ROW, ProductLoansRow);

export {
	ProductLoansRowCustomization as ProductLoansRow,
	ProductLoansRow as ProductLoansRowBaseline,
	ProductLoansRowProps
};
