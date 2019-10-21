import {
	Characteristic,
	ProductPath,
	ProductOffering,
	NominationCharacteristics,
	AutoCharacteristicConfigurationType,
} from "../../../redux";
import cssns from "../../../utils/cssnsConfig";
import { FC } from "react";
import CharacteristicsInputElement from "./CharacteristicsInputElement";
import AutoCharacteristicConfiguration from "./AutoCharacteristicConfiguration";

const { React } = cssns("CharacteristicRenderHoc");

interface CharacteristicRenderHocStateProps {
	productOfferingErrors?: Array<any>;
	characteristicValue: AutoCharacteristicConfigurationType;
	path: ProductPath;
	inputCharacteristic?: Characteristic;
	inputtedCharacteristics?: Record<string, string>;
	enhancedCharacteristics?: Record<string, Array<string>>;
	product: ProductOffering;
	characteristicKey: string;
	isMandatory?: boolean;
	validation?: string;
	icc_display_mode?: string;
	key?: string;
	isNominationPO?: boolean;
	nominationPOCharacteristics: NominationCharacteristics | null;
}

interface CharacteristicRenderHocActionProps {
	clearProductOfferingErrors: () => void;
	setInputtedCharacteristic: (path: ProductPath, key: string, value: string) => void;
}

type CharacteristicRenderHocProps = CharacteristicRenderHocActionProps & CharacteristicRenderHocStateProps;

const CharacteristicRenderHoc: FC<CharacteristicRenderHocProps> = props =>
	props.characteristicValue && props.characteristicValue.hidden ? (
		<AutoCharacteristicConfiguration
			setInputtedCharacteristic={props.setInputtedCharacteristic} // TODO: probably wrap this component into withProductConfigurationActions too
			inputtedCharacteristics={props.inputtedCharacteristics}
			characteristicKey={props.characteristicKey}
			characteristicValue={props.characteristicValue}
			path={props.path}
		/>
	) : (
		<CharacteristicsInputElement
			productOfferingErrors={props.productOfferingErrors}
			clearProductOfferingErrors={props.clearProductOfferingErrors}
			path={props.path}
			inputCharacteristic={props.inputCharacteristic}
			inputtedCharacteristics={props.inputtedCharacteristics}
			enhancedCharacteristics={props.enhancedCharacteristics}
			characteristicKey={props.characteristicKey}
			isMandatory={props.isMandatory}
			validation={props.validation}
			icc_display_mode={props.icc_display_mode}
			product={props.product}
			key={props.key}
			isNominationPO={props.isNominationPO}
			nominationPOCharacteristics={props.nominationPOCharacteristics}
		/>
	);

export default CharacteristicRenderHoc;
export {
	CharacteristicRenderHocStateProps,
	CharacteristicRenderHocActionProps,
};
