import * as React from "react";
import OcModal from "./ocComponents/OcModal";
import { get } from "lodash";
import { FormattedMessage } from "../channelUtils";
import { Basket, BasketActionAddProductToBasket } from "../redux/types";
import { ContextType, contextTypesValidationMap } from "../types";
import {
	withMsisdnConfiguration,
	MsisdnConfigurationProps,
	MsisdnConfigurationProviderProps,
} from "./product/msisdn/withMsisdnConfiguration";
import MsisdnConfigurationUtils from "./product/msisdn/utils/msisdnConfiguration.utils";
import messages from "./ProductOfferingConfiguration.messages";
import { OcButton, OcButtonType } from "./ocComponents/button/OcButton";
import ProductOfferingConfigurationContainer from "./product/ProductOfferingConfigurationContainer";

interface ProductOfferingConfigurationModalStateProps extends MsisdnConfigurationProviderProps {
	activeBasket?: Basket;
}

interface ProductOfferingConfigurationModalOwnProps {
	addProduct: () => void;
}

interface ProductOfferingConfigurationModalActionProps {
	actions: {
		handleClose: () => void;
		addProductToBasket: BasketActionAddProductToBasket;
	};
}

type ProductOfferingConfigurationModalEnhancedProps = ProductOfferingConfigurationModalStateProps
	& ProductOfferingConfigurationModalActionProps & ProductOfferingConfigurationModalOwnProps;

type ProductOfferingConfigurationModalProps = ProductOfferingConfigurationModalEnhancedProps
	& MsisdnConfigurationProps
	& ProductOfferingConfigurationModalOwnProps;

const ProductOfferingConfigurationModal = (props: ProductOfferingConfigurationModalProps, context: ContextType) => {
	if (!props.product) {
		return null;
	}

	const handleSubmit = (event: any) => {
		event.preventDefault();
		if (props.msisdnConfig && MsisdnConfigurationUtils.isMsisdnNeedToBeConfigured(props.msisdnConfig)) {
			props.toggleMsisdnModal(true);
		} else {
			props.addProduct();
		}
	};

	const showModal = Boolean(props.product);

	return (
		<OcModal
			showModal={showModal}
			onClose={props.actions.handleClose}
			noFooter={true}
			fitScreen={false}
			largeModal={true}
			style={{
				filter: props.msisdnModalVisible ? "grayscale(100%) brightness(50%) blur(2px)" : "none"
			}}
			title={
				<FormattedMessage
					{...messages.pleaseConfigure}
					values={{productName: get(props.product, "attributes.name")}}
				/>
			}
		>
			<form
				className="form"
				onSubmit={handleSubmit}
			>
				<div className="po-config">
					<ProductOfferingConfigurationContainer
						flux={context.flux}
						msisdnConfig={props.msisdnConfig}
						toggleMsisdnModal={props.toggleMsisdnModal}
						userOpened={props.userOpened}
						msisdnModalVisible={props.msisdnModalVisible}
						product={props.product}
					/>
				</div>

				<div className="button-container">
					<OcButton buttonType={OcButtonType.DEFAULT} onClick={props.actions.handleClose}>
						<FormattedMessage {...messages.close}/>
					</OcButton>
					<OcButton htmlBtnType="submit" buttonType={OcButtonType.PRIMARY}>
						<FormattedMessage {...messages.addToBasket} />
					</OcButton>
				</div>
			</form>
		</OcModal>
	);
};

ProductOfferingConfigurationModal.contextTypes = contextTypesValidationMap;

const ProductOfferingConfigurationModalWithMsisdn =
	withMsisdnConfiguration<ProductOfferingConfigurationModalProps>(ProductOfferingConfigurationModal);

export {
	ProductOfferingConfigurationModalStateProps,
	ProductOfferingConfigurationModalWithMsisdn as ProductOfferingConfigurationModal,
	ProductOfferingConfigurationModalActionProps,
	ProductOfferingConfigurationModalEnhancedProps,
	ProductOfferingConfigurationModalOwnProps,
	ProductOfferingConfigurationModalProps,
};
