import { get } from "lodash";
import ProductUtil from "../../../../utils/product/ProductUtil";
import ProductOfferingUtil from "../../../../utils/ProductOfferingUtil";
import { ReactNode, PureComponent } from "react";
import { LifecycleChangeAction, PriceTypeEnum, Product, ProductOffering } from "../../../../redux/types";
import FormattedMessage from "../../../../channelUtils/FormattedMessage";
import cssns from "../../../../utils/cssnsConfig";
import AddonPrice from "../AddonPrice";
import addonMessages from "../Addon.messages";
import OcButtonWithDropdown from "../../../ocComponents/OcButtonWithDropdown";
import { CommonCustomizationPoints, withCustomization } from "../../../../customization";
import SubscriptionState from "../../SubscriptionState";
import ProductServicesUtils from "../../services/ProductServices.utils";
import messages from "../../../../commonMessages";
import Time from "../../../../channelUtils/Time";
import { OcButton, OcButtonSize, OcButtonType } from "../../../ocComponents";

const { React } = cssns("AddonsTabView");

interface AddonRowProps {
	isActive: boolean;
	addon: ProductOffering | Product;
	lifecycleStatus: string;
	showActions: boolean;
	selectAddonForActivation: (addon: ProductOffering) => void;
	onChangeAddon: (addon: Product) => void;
	onConfigureAddon: (addon: Product) => void;
	stateTransitionByActionName?: Record<string, Array<string> | string>;
	initializeStateTransition: (addon: Product, transition: LifecycleChangeAction) => void;
}

class AddonRow extends PureComponent<AddonRowProps> {

	public renderActions(buttons: Array<ReactNode>): ReactNode {
		if (buttons && buttons.length > 0) {
			if (buttons.length > 1) {
				return (<OcButtonWithDropdown>{buttons}</OcButtonWithDropdown>);
			} else {
				return buttons;
			}
		}
		return null;
	}

	public getButtons(props: AddonRowProps): Array<ReactNode> {
		const { addon } = props;

		const actionButtons: Array<ReactNode> = [];
		if (!props.isActive) {
			actionButtons.push(
				<OcButton
					buttonType={OcButtonType.PRIMARY}
					buttonSize={OcButtonSize.SMALL}
					className="addon-activate"
					id={`linkAddAddonToBasket-${addon.id}-activate`}
					key={`linkAddAddonToBasket-${addon.id}-key`}
					onClick={() => props.selectAddonForActivation(addon as ProductOffering)}
				>
					<FormattedMessage {...messages.activateAddon} />
				</OcButton>
			);
		}

		const addonAsProduct: Product = addon as Product;
		if (props.isActive && addonAsProduct.hasAlternateOfferings) {
			actionButtons.push(
				<OcButton
					buttonType={OcButtonType.PRIMARY}
					buttonSize={OcButtonSize.SMALL}
					className="alternate"
					id={`buttonChangeAddon-${addon.id}`}
					key={`buttonChangeAddon-${addon.id}-key`}
					onClick={() => props.onChangeAddon(addonAsProduct)}
				>
					<FormattedMessage{...messages.subscriptionsChangeAddon}/>
				</OcButton>
			);
		}

		if (props.isActive && get(addon, "attributes.inputCharacteristics", addonAsProduct.characteristics)) {
			actionButtons.push(
				<OcButton
					buttonType={OcButtonType.PRIMARY}
					buttonSize={OcButtonSize.SMALL}
					className="configure"
					id={`buttonAction-${addon.id}-configure`}
					key={`buttonAction-${addon.id}-configure`}
					onClick={() => this.props.onConfigureAddon(addonAsProduct)}
				>
					<FormattedMessage {...messages.subscriptionsConfigureAddon}/>
				</OcButton>
			);
		}

		if (props.isActive
			&& addonAsProduct.allowedTransitions
			&& addonAsProduct.allowedTransitions.length > 0
			&& props.stateTransitionByActionName) {
			const stateTransitions = props.stateTransitionByActionName;
			addonAsProduct.allowedTransitions
				.map((transition: LifecycleChangeAction): LifecycleChangeAction => {
					return ProductServicesUtils.mapTransitions(transition, stateTransitions);
				})
				.forEach((transition: LifecycleChangeAction) =>
					actionButtons.push(
						<OcButton
							buttonType={OcButtonType.PRIMARY}
							buttonSize={OcButtonSize.SMALL}
							className={`${transition.id}`}
							id={`buttonModifyInitialize-${addon.id}-${transition.id}`}
							key={`buttonModifyInitialize-${addon.id}-${transition.id}-key`}
							onClick={(e) => {
								e.stopPropagation();
								props.initializeStateTransition(addonAsProduct, transition);
							}}
						>
							<SubscriptionState state={transition.name}/>
						</OcButton>
					)
				);
		}

		return actionButtons;
	}

	render() {
		const {addon, lifecycleStatus, showActions} = this.props;

		const name = ProductUtil.getProductName(addon) || " - ";
		const upfrontPrice = ProductOfferingUtil.getPriceRange(addon, PriceTypeEnum.ONE_TIME);
		const recurringPrice = ProductOfferingUtil.getPriceRange(addon, PriceTypeEnum.RECURRENT);
		const validForEndDate = get(addon, "validFor.endDate");
		const expiryDate = validForEndDate ? Time.formatDate(validForEndDate) : "-";
		const actionButtons = this.getButtons(this.props);

		return (
			<div className="list-item" id={`addon-item-${addon.id}`} data-customizable>
				<div className="list-item-column name">
					<span>{name}</span>
				</div>
				<div className="list-item-column fees">
					{ProductUtil.hasPrice(upfrontPrice) && (
						<>
							<FormattedMessage {...messages.subscriptionAddonActivationFee}/>
							<AddonPrice range={upfrontPrice}/>
						</>
					)}
					{ProductUtil.hasPrice(recurringPrice) && (
						<>
							<FormattedMessage {...messages.subscriptionAddonRecurringFee} />
							<AddonPrice range={recurringPrice}/>
						</>
					)}
					{!ProductUtil.hasPrice(upfrontPrice) && !ProductUtil.hasPrice(recurringPrice) && (
						<span className="customer-subscription-addons-free-addon">
							<FormattedMessage {...messages.productOfferingConfigFreeProduct} />
						</span>
					)}
				</div>
				<div className="list-item-column expiration">{expiryDate}</div>
				<div className={`list-item-column status status-${this.props.isActive ? "active" : "available"}`}>
					<FormattedMessage {...addonMessages.addonLifecycleStatus} values={{lifecycleStatus}}/>
				</div>
				<div className="list-item-column actions">
					{showActions && (this.renderActions(actionButtons))}
					{!showActions && (<FormattedMessage {...addonMessages.hyphen} />)}
				</div>
			</div>
		);
	}
}

const AddonRowCustomizable = withCustomization<AddonRowProps>(CommonCustomizationPoints.ADDON_ROW, AddonRow);

export {
	AddonRow as AddonRowBaseline,
	AddonRowCustomizable as AddonRow,
	AddonRowProps
};
