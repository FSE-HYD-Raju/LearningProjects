import { ContextType, contextTypesValidationMap } from "../../../../types";
import { isEmpty } from "lodash";
import { FC } from "react";
import {
	MsisdnConfiguration,
	ProductPath,
	MsisdnConfig,
	SimplePrice,
	ProductOffering,
	ProductOfferingGroup,
	MsisdnWithCost,
	Basket,
	BasketActionAddProductToBasket,
	Configurations, MsisdnSofReservationInfo,
} from "../../../../redux";
import MsisdnConfigurationModalContainer from "../../msisdn/MsisdnConfigurationModalContainer";
import { default as PosMsisdnConfigurationModalContainer } from "../../msisdn/PosMsisdnConfigurationModalContainer";
import MsisdnNumber from "./msisdn/MsisdnNumber";
import OcModal from "../../../ocComponents/OcModal";
import cssns from "../../../../utils/cssnsConfig";
import messages from "./ProductOfferingConfigurationMsisdnSelection.messages";
import MsisdnConfigurationUtils from "../../msisdn/utils/msisdnConfiguration.utils";
import FormattedMessage from "../../../../channelUtils/FormattedMessage";
import ProductOfferingUtil from "../../../../utils/ProductOfferingUtil";
import ProductOfferingConfigurationPrice from "../../ProductOfferingConfigurationPrice";
import { isChannelPos } from "../../../../utils/Channel.utils";
import { OcButton, OcButtonSize, OcButtonType } from "../../../ocComponents/button/OcButton";

const { React } = cssns("ProductOfferingGroupMsisdnSelection");

interface ProductOfferingGroupMsisdnSelectionStateProps {
	userOpened: boolean;
	validIcc: boolean;
	product: ProductOffering;
	pog: ProductOfferingGroup;
	path: ProductPath;
	upfrontPrice?: SimplePrice;
	recurringPrice?: SimplePrice;
	msisdnConfig: MsisdnConfig;
	toggleMsisdnModal: (visibility: boolean, userOpened?: boolean) => void;
	msisdnModalVisible: boolean;
	selectedMsisdn?: MsisdnWithCost;
	activeBasket: Basket;
	configurations: Configurations;
	activeReservationId?: string;
}

interface ProductOfferingGroupMsisdnSelectionActionProps {
	actions: {
		selectProductOffering: (path: ProductPath, value: string, productOfferings: ProductOffering[]) => void;
		releaseMsisdn: (releaseId: string, reservedFor: string) => void;
		addProduct: BasketActionAddProductToBasket;
		saveMsisdn: (key: string, msisdnNumber: string | number | undefined, path: ProductPath, activeReservationId?: string) => void;
		addProductToBasket: BasketActionAddProductToBasket;
	};
}

type ProductOfferingGroupMsisdnSelectionProps = ProductOfferingGroupMsisdnSelectionStateProps & ProductOfferingGroupMsisdnSelectionActionProps;

const ProductOfferingGroupMsisdnSelection: FC<ProductOfferingGroupMsisdnSelectionProps> = (props, context: ContextType) => {
	const {
		product,
		pog,
		path,
		upfrontPrice,
		recurringPrice,
		msisdnConfig,
		msisdnModalVisible,
		userOpened,
		validIcc,
		selectedMsisdn,
		activeBasket,
		configurations
	} = props;
	const shouldRenderOneTimePrice = upfrontPrice || (isEmpty(upfrontPrice) && isEmpty(recurringPrice));
	const shouldRenderRecurringPrice = !isEmpty(recurringPrice);
	const mandatoryConfiguration = MsisdnConfigurationUtils.findMandatoryConfiguration(msisdnConfig, product.id);

	const existingMsisdn = mandatoryConfiguration && mandatoryConfiguration.msisdn;

	const buttonText = (!mandatoryConfiguration || !mandatoryConfiguration.msisdn)
		? (<FormattedMessage {...messages.selectNumber}/>)
		: (<FormattedMessage {...messages.changeNumber}/>);

	const modalTitle = (<FormattedMessage {...messages.selectNewNumber}/>);

	const disableButton = !validIcc;

	const buttonMessage = !userOpened
		? (<FormattedMessage {...messages.addToBasket} />)
		: (mandatoryConfiguration && mandatoryConfiguration.msisdn
			? (<FormattedMessage {...messages.changeNumber} />)
			: (<FormattedMessage {...messages.selectNumber} />));

	const onButtonAction = async () => {
		const msisdn = props.selectedMsisdn && props.selectedMsisdn.msisdn;
		if (!userOpened) {
			await props.actions.addProductToBasket({
				product: product,
				configurations: configurations!,
				basketId: activeBasket.id,
				hasCustomer: true,
			});
		}
		props.actions.saveMsisdn(
			"CH_NumberResource",
			msisdn as string, // ??
			props.path
		);
		props.toggleMsisdnModal(false, false);
	};

	return (
		<div>
			<h4 className="group-title">{ProductOfferingUtil.getPOGName(pog)}</h4>
			<div className="product-container">
				<div className="header-container">
					<div className="text-wrap">
						<h5>
							<FormattedMessage {...messages.msisdn}/>
						</h5>
					</div>
					<div className="price-container">
						{shouldRenderOneTimePrice && (
							<ProductOfferingConfigurationPrice upfrontPrice={upfrontPrice} selected={true}/>
						)}
						{shouldRenderRecurringPrice && (
							<ProductOfferingConfigurationPrice recurringPrice={recurringPrice} selected={true}/>
						)}
					</div>
				</div>
				<div className="text-wrap">
					<div className="content-box-no-margin">
						<div className="number">
							{mandatoryConfiguration && (
								<div>
									<MsisdnNumber mandatoryConfiguration={mandatoryConfiguration}/>
								</div>
							)}

							{mandatoryConfiguration && (
								<div className="select-number-button-container">
									<OcButton
										id={`buttonOpenPlanConfigurationModal-${ProductOfferingUtil.pathToStringFromPathType(path)}`}
										buttonType={OcButtonType.PRIMARY}
										buttonSize={OcButtonSize.SMALL}
										onClick={() => {
											props.toggleMsisdnModal(true, true);
											props.actions.releaseMsisdn(props.activeReservationId as string,"")}}
										disabled={disableButton}
									>
										{buttonText}
									</OcButton>
									{msisdnModalVisible && isChannelPos() ? (
										<OcModal
											showModal={msisdnModalVisible}
											bsSize="lg"
											noFooter={true}
											title={modalTitle}
											onClose={() => props.toggleMsisdnModal(false, false)}
										>
											<PosMsisdnConfigurationModalContainer
												flux={context.flux}
												product={product}
												userOpened={userOpened}
												addProduct={props.actions.addProduct}
												msisdnConfig={mandatoryConfiguration}
												toggleMsisdnModal={props.toggleMsisdnModal}
												msisdnPog={pog}
												path={path}
												selectedNumber={existingMsisdn}
											/>
										</OcModal>
									) : (
										<OcModal
											showModal={msisdnModalVisible}
											bsSize="lg"
											noFooter={false}
											title={modalTitle}
											onClose={() => props.toggleMsisdnModal(false, false)}
											onOk={() => onButtonAction()}
											okDisabled={!selectedMsisdn}
											okButtonLabel={buttonMessage}
										>
											<MsisdnConfigurationModalContainer
												flux={context.flux}
												product={product}
												saveMsisdn={props.actions.saveMsisdn}
												userOpened={userOpened}
												addProduct={props.actions.addProduct}
												msisdnConfig={mandatoryConfiguration as MsisdnConfiguration}
												toggleMsisdnModal={props.toggleMsisdnModal}
												path={path}
												selectedNumber={existingMsisdn}
											/>
										</OcModal>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

ProductOfferingGroupMsisdnSelection.contextTypes = contextTypesValidationMap;

export default ProductOfferingGroupMsisdnSelection;
export {
	ProductOfferingGroupMsisdnSelectionProps,
	ProductOfferingGroupMsisdnSelectionStateProps,
	ProductOfferingGroupMsisdnSelectionActionProps,
};
