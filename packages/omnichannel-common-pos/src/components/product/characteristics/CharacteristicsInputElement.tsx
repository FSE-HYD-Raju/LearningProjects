import cssns from "../../../utils/cssnsConfig";
import CharacteristicsTextInputContainer from "./CharacteristicsTextInputContainer";
import CharacteristicsDropdown from "./CharacteristicsDropdown";
import CharacteristicsRadioInput from "./CharacteristicsRadioInput";
import CharacteristicsDate from "./CharacteristicsDate";
import { InputTypesEnum } from "./InputTypes";
import { FC } from "react";
import { POSFunctionCustomizationPoints, withCustomization } from "../../../customization";
import CharacteristicsNotifications from "./CharacteristicsNotifications";
import {
	Characteristic,
	ProductOffering,
	ProductPath,
	NominationCharacteristics
} from "../../../redux/types";
import { ContextType, contextTypesValidationMap } from "../../../types";

const { React } = cssns("CharacteristicsInputElement");

interface CharacteristicsInputElementProps {
	productOfferingErrors?: Array<any>; // TODO: add types here
	clearProductOfferingErrors: () => void;
	path: ProductPath;
	inputCharacteristic?: Characteristic;
	characteristicKey: string;
	inputtedCharacteristics?: Record<string, string>;
	enhancedCharacteristics?: Record<string, Array<any>>;
	isMandatory?: boolean;
	validation?: string;
	icc_display_mode?: string;
	product: ProductOffering;
	key?: string;
	nominationPOCharacteristics: NominationCharacteristics | null;
	isNominationPO?: boolean;
}

const hasValues = (values?: Array<any>) => {
	return Array.isArray(values) && values.length > 0;
};

// TODO: check if this is valid (in runtime)
const isDateType = (inputCharacteristic?: Characteristic): boolean => {
	const dataType = inputCharacteristic && inputCharacteristic.dataType;
	return (
		dataType === InputTypesEnum.DATE_TIME_PERIOD ||
		dataType === InputTypesEnum.DATE ||
		dataType === InputTypesEnum.DATE_TIME ||
		dataType === InputTypesEnum.TIME ||
		dataType === InputTypesEnum.TIME_OF_THE_DAY_PERIOD
	);
};

const getDateType = (inputCharacteristic: Characteristic): string | undefined => {
	const dataType = inputCharacteristic.dataType;
	if (dataType === InputTypesEnum.DATE) {
		return InputTypesEnum.DATE;
	} else if (dataType === InputTypesEnum.DATE_TIME_PERIOD) {
		return InputTypesEnum.DATE_TIME_PERIOD;
	} else if (dataType === InputTypesEnum.DATE_TIME) {
		return InputTypesEnum.DATE_TIME;
	} else if (dataType === InputTypesEnum.TIME) {
		return InputTypesEnum.TIME;
	} else if (dataType === InputTypesEnum.TIME_OF_THE_DAY_PERIOD) {
		return InputTypesEnum.TIME_OF_THE_DAY_PERIOD;
	}
	return undefined;
};

const getInputType = (props: CharacteristicsInputElementProps) => {
	const { inputCharacteristic, icc_display_mode } = props;
	if (inputCharacteristic && inputCharacteristic.inputType === "dropdown") {
		return InputTypesEnum.DROPDOWN;
	}
	if (isDateType(inputCharacteristic)) {
		return getDateType(inputCharacteristic!);
	}
	const values = inputCharacteristic && inputCharacteristic.values;
	if (hasValues(values) && icc_display_mode === InputTypesEnum.DROPDOWN) {
		return InputTypesEnum.DROPDOWN;
	}
	if (hasValues(values) && icc_display_mode === InputTypesEnum.RADIO) {
		return InputTypesEnum.RADIO;
	} else {
		return InputTypesEnum.TEXT;
	}
};

const BaselineRenderCharacteristicsInputElement = (props: CharacteristicsInputElementProps, context: ContextType) => {
	const { inputCharacteristic } = props;
	const inputType = getInputType(props);

	if (inputCharacteristic && inputCharacteristic.hidden) {
		return null;
	}

	if (isDateType(inputCharacteristic)) {
		return (
			 <CharacteristicsDate
				flux={context.flux}
				path={props.path}
				characteristicKey={props.characteristicKey}
				inputCharacteristic={props.inputCharacteristic}
				inputType={inputType}
			/>
		);
	}

	switch (inputType) {
		case InputTypesEnum.DROPDOWN:
			return (
				<CharacteristicsDropdown
					flux={context.flux}
					path={props.path}
					inputCharacteristic={props.inputCharacteristic}
					characteristicKey={props.characteristicKey}
					enhancedCharacteristics={props.enhancedCharacteristics}
					inputtedCharacteristics={props.inputtedCharacteristics}
					product={props.product}
				/>
			);
		case InputTypesEnum.RADIO:
			return (
				<CharacteristicsRadioInput
					flux={context.flux}
					characteristicKey={props.characteristicKey}
					inputtedCharacteristics={props.inputtedCharacteristics}
					product={props.product}
					path={props.path}
					inputCharacteristic={props.inputCharacteristic}
				/>
			);
		default:
			return (
				<CharacteristicsTextInputContainer
					flux={context.flux}
					path={props.path}
					isMandatory={props.isMandatory}
					inputCharacteristic={props.inputCharacteristic}
					characteristicKey={props.characteristicKey}
					inputtedCharacteristics={props.inputtedCharacteristics}
					product={props.product}
					nominationPOCharacteristics={props.nominationPOCharacteristics}
					isNominationPO={props.isNominationPO}
				/>
			);
	}
};

BaselineRenderCharacteristicsInputElement.contextTypes = contextTypesValidationMap;

const RenderCharacteristicsInputElementFunction = withCustomization<CharacteristicsInputElementProps>(
	POSFunctionCustomizationPoints.RENDER_CHARACTERISTICS_INPUT_ELEMENT,
	BaselineRenderCharacteristicsInputElement
);

const CharacteristicsInputElement: FC<CharacteristicsInputElementProps> = (props: CharacteristicsInputElementProps) => {
	return (
		<div className="container">
			<RenderCharacteristicsInputElementFunction {...props}/>
			<CharacteristicsNotifications
				mappedProductOfferingErrors={props.productOfferingErrors}
				targetCharacteristic={props.characteristicKey}
				clearProductOfferingErrors={props.clearProductOfferingErrors}
			/>
		</div>
	);
};

export default CharacteristicsInputElement;
export {
	CharacteristicsInputElementProps,
};
