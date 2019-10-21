import * as R from "react";
import cssns from "../../../../utils/cssnsConfig";
import OcModal from "../../../ocComponents/OcModal";
import OcLoadingSpinner from "../../../ocComponents/OcLoadingSpinner";
import { withMsisdnConfiguration, MsisdnConfigurationProps } from "../../../product/msisdn/withMsisdnConfiguration";
import { ProductConfigurationInputProps, withProductConfigurations } from "../../../product/withProductConfigurations";
import ProductOfferingUtil from "../../../../utils/ProductOfferingUtil";
import { FC } from "react";
import AddonCompatibilityView from "../../AddonCompatibilityView";
import messages from "../Plans.messages";
import {
	Configurations,
	Product,
	ProductOffering,
	ProductOfferingGroup, ProductPath
} from "../../../../redux/types/";
import FormattedMessage from "../../../../channelUtils/FormattedMessage";
import PlanUtils from "../Plan.utils";
import MsisdnConfigurationUtils from "../../../product/msisdn/utils/msisdnConfiguration.utils";
import ProductOfferingConfigurationContainer from "../../../product/ProductOfferingConfigurationContainer";
import { ContextType, contextTypesValidationMap } from "../../../../types";
import { OcButton, OcButtonType } from "../../../ocComponents";

const React = cssns("PlanConfigurationModal").React as typeof R;

interface PlanConfigurationModalStateProps {
	addons?: {
		compatible: Array<Product>,
		incompatible: Array<Product>
	};
	currentProduct?: Product;
	configurations?: Configurations;
	productOffering?: ProductOffering;
	newPlan?: boolean;
	msisdnReservationRequired?: boolean;
	hideConfigs?: boolean;
	showLoadingIndicator?: boolean;
}

// TODO: extract product offering actions from here to pass to ProductOfferingConfiguration when it is migrated to TS
interface PlanConfigurationModalActionProps {
	actions: {
		handleBack: () => void,
		handleClose: () => void,
		proceedToPayment: () => void,
		setInputtedCharacteristic: (path: ProductPath, key: string, value: string) => void,
		toggleProductOffering: (path: ProductPath, forceToggle?: boolean) => void,
		selectProductOffering: (path: ProductPath, value: string, productOfferings: ProductOffering[]) => void,
	};
}

type PlanConfigurationModalProps = PlanConfigurationModalStateProps & PlanConfigurationModalActionProps
	& ProductConfigurationInputProps & MsisdnConfigurationProps;

const PlanConfigurationModal: FC<PlanConfigurationModalProps> = (props: PlanConfigurationModalProps, context: ContextType) => {
	const { addons, productOffering, hideConfigs } = props;

	const titleMessage = !props.newPlan ? {...messages.confirmChange} : {...messages.addPlan};

	const title = (
		<FormattedMessage {...titleMessage} />
	);

	const productTypeText = (
		<span className="product-type">
				<FormattedMessage {...PlanUtils.getMessage(productOffering)} />
			</span>
	);

	const planNameTitle = !props.newPlan ? (
		<FormattedMessage
			{...messages.newProduct}
			values={{productType: productTypeText}}
		/>) : (<FormattedMessage {...messages.newPlan} />);

	const disableSubmit = !hideConfigs && props.msisdnConfig && MsisdnConfigurationUtils.isMsisdnNeedToBeConfigured(props.msisdnConfig);

	const doSubmit = () => {
		if (props.msisdnConfig && MsisdnConfigurationUtils.isMsisdnNeedToBeConfigured(props.msisdnConfig)) {
			props.toggleMsisdnModal(true);
		} else {
			props.actions.proceedToPayment();
		}
	};

	const description =
		ProductOfferingUtil.getCommercialEnrichmentValueFromPO(productOffering, "descriptions", "detailed") ||
		ProductOfferingUtil.getCommercialEnrichmentValueFromPO(productOffering, "descriptions", "description") ||
		ProductOfferingUtil.getCommercialEnrichmentValueFromPO(productOffering, "descriptions", "short-description") || "";

	const productRequiresConfiguration = (products: Array<ProductOffering>): boolean => {
		return products.reduce((total: any, current: ProductOffering) => {
			if (!current) {
				return total || false;
			}
			const input = (current.inputCharacteristics && Object.keys(current.inputCharacteristics)) ||
				(current.attributes && current.attributes.inputCharacteristics);

			if (input && Object.keys(input).length) {
				return true;
			}

			const offeringGroups = current.productOfferingGroups;
			let foundGroup = false;
			if (offeringGroups && offeringGroups.length) {
				offeringGroups.forEach((group: ProductOfferingGroup) => {
					const offerings = group.productOfferings;
					if (Array.isArray(offerings) && offerings.length) {
						foundGroup = true;
					}
				});
			}

			if (foundGroup) {
				return true;
			}

			const offerings = current.productOfferings;

			if (Array.isArray(offerings) && offerings.length) {
				return (
					productRequiresConfiguration(offerings) || total || false
				);
			}
			return total || false;
		}, false);
	};

	const needsConfiguration = !hideConfigs && productOffering && productRequiresConfiguration([productOffering]);

	return (
		<OcModal
			showModal={true}
			title={title}
			style={PlanUtils.stylesForOcModal}
			onClose={props.actions.handleClose}
		>
			{props.showLoadingIndicator ? (
				<OcLoadingSpinner loading={true} />
			) : (
				<div className="configuration" >
					{props.currentProduct && (
						<div className="data-row-one">
							<div className="message-container">
								<FormattedMessage
									{...messages.currentProductType}
									values={{productType: productTypeText}}
								/>
							</div>
							<div className="name-message-container">
								{props.currentProduct.name || props.currentProduct.attributes && props.currentProduct.attributes.name}
							</div>
						</div>
					)}
					<div className="data-row-two">
						<div className="plan-name-title">
							{planNameTitle}
						</div>
						<div className="product-name" data-test-name="selected-offering-name">
							{props.productOffering && props.productOffering.attributes && props.productOffering.attributes.name}
						</div>
					</div>

					<div className="data-row-two">
						<div className="plan-name-title">
							<FormattedMessage {...messages.description} />
						</div>
						<div className="product-name">
							{description}
						</div>
					</div>

					{addons && (
						<div className="data-row-two">
							<div className="plan-name-title">
								<FormattedMessage {...messages.relatedServices} />
							</div>
							<div className="product-name">
								<div className="addon-compatibility-container" >
									<AddonCompatibilityView addons={addons} />
								</div>
							</div>
						</div>
					)}

					<div>
						{needsConfiguration &&  <hr />}
						{needsConfiguration  && (
							<h4 className="configuration-header">
								<FormattedMessage {...messages.configuration} />
							</h4>
						)}

						<form
							onSubmit={event => {
								event.preventDefault();
								doSubmit();
							}}
							id="plan-configuration-modal-form"
						>
							<div className="product-offering-configuration-container">
								{needsConfiguration && (
									<ProductOfferingConfigurationContainer
										flux={context.flux}
										product={props.product!}
										msisdnConfig={props.msisdnConfig}
										msisdnModalVisible={props.msisdnModalVisible}
										toggleMsisdnModal={props.toggleMsisdnModal}
										userOpened={props.userOpened}
									/>
								)}
							</div>
							<div className="OcModal-footer-container button-container">
								<OcButton
									id="buttonBackInModal"
									onClick={() => props.actions.handleBack()}
									buttonType={OcButtonType.DEFAULT}
								>
									<FormattedMessage {...messages.back}/>
								</OcButton>
								<OcButton
									id="buttonCancelPlanConfiguration"
									buttonType={OcButtonType.DEFAULT}
									onClick={props.actions.handleClose}
								>
									<FormattedMessage {...messages.cancel} />
								</OcButton>
								<OcButton
									id="buttonProceedToPayment"
									buttonType={OcButtonType.PRIMARY}
									htmlBtnType="submit"
									disabled={disableSubmit}
								>
									<FormattedMessage {...messages.proceedToPayment} />
								</OcButton>
							</div>
						</form>
					</div>
				</div>
			)}
		</OcModal>
	);
};

PlanConfigurationModal.contextTypes = contextTypesValidationMap;
export default withMsisdnConfiguration<PlanConfigurationModalProps>(withProductConfigurations<PlanConfigurationModalProps>(PlanConfigurationModal));
export {
	PlanConfigurationModal,
	PlanConfigurationModalProps,
	PlanConfigurationModalStateProps,
	PlanConfigurationModalActionProps,
};
