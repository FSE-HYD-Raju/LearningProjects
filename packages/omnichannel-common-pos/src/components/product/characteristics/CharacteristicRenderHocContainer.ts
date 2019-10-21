"use strict";

import { connect } from "react-redux";
import {
	CharacteristicRenderHocStateProps,
	CharacteristicRenderHocActionProps,
	default as CharacteristicRenderHoc
} from "./CharacteristicRenderHoc";
import { Dispatch, AnyAction } from "redux";
import {
	AppState,
	Characteristic,
	ProductOffering,
	ProductPath,
	AutoCharacteristicConfigurationType,
	HasFlux,
	actions,
} from "../../../redux";
import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";

export interface CharacteristicRenderHocContainerProps extends HasFlux {
	pathKey: string;
	icc_display_mode?: string;
	path: ProductPath;
	inputCharacteristic?: Characteristic;
	inputtedCharacteristics?: Record<string, string>;
	enhancedCharacteristics?: Record<string, Array<any>>;
	product: ProductOffering;
	isNominationPO?: boolean;
}

const mapStateToProps = (state: AppState, ownProps: CharacteristicRenderHocContainerProps): CharacteristicRenderHocStateProps => {
	const agreements = state.customerCase.agreements || state.digitalLife.agreements;
	const characteristicValue = ProductOfferingUtil.getValueForCharacteristic({
		config: state.feature.internalCharacteristicsConfiguration || {},
		inputCharacteristic: ownProps.inputCharacteristic || {},
		inputCharacteristicKey: ownProps.pathKey,
		parentId: ProductOfferingUtil.getSubscriptionProductIdFromAgreements(agreements),
		flow: ownProps.isNominationPO ? "nomination" : "direct",
		inputtedValue: ownProps.inputtedCharacteristics && ownProps.inputtedCharacteristics[ownProps.pathKey]
	});

	return {
		productOfferingErrors: state.error.productOfferingErrors,
		characteristicValue: (characteristicValue || {hidden: false}) as AutoCharacteristicConfigurationType,
		icc_display_mode: ownProps.icc_display_mode,
		path: ownProps.path,
		inputCharacteristic: ownProps.inputCharacteristic,
		inputtedCharacteristics: ownProps.inputtedCharacteristics,
		enhancedCharacteristics: ownProps.enhancedCharacteristics,
		characteristicKey: ownProps.pathKey,
		isMandatory: ownProps.inputCharacteristic ? ownProps.inputCharacteristic.mandatory : false,
		validation: ownProps.inputCharacteristic && ownProps.inputCharacteristic.validation ? ownProps.inputCharacteristic.validation : "",
		product: ownProps.product,
		isNominationPO: ownProps.isNominationPO,
		nominationPOCharacteristics: state.feature.nominationPOCharacteristics && state.feature.nominationPOCharacteristics.characteristics,
		key: ownProps.pathKey
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): CharacteristicRenderHocActionProps => {
	return {
		clearProductOfferingErrors: () => {
			dispatch(actions.error.clearProductOfferingErrors());
		},
		setInputtedCharacteristic: (path: ProductPath, key: string, value: string) => {
			dispatch(actions.productOfferingConfiguration.setInputtedCharacteristic(path, key, value));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacteristicRenderHoc);
