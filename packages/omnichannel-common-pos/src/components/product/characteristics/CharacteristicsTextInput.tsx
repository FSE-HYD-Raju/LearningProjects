import cssns from "../../../utils/cssnsConfig";
import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";
import { get } from "lodash";
import { FC } from "react";
import { Characteristic, ProductPath } from "../../../redux/types";
import { OcTextInput } from "../../ocComponents/input/OcTextInput";
import { OcInputLabelPosition } from "../../ocComponents/input/OcInputContainer";

const { React } = cssns("CharacteristicsTextInput");

interface CharacteristicsTextInputProps {
	path?: ProductPath;
	inputCharacteristic?: Characteristic;
	characteristicKey: string;
	characteristicValue: string;
	isMandatory?: boolean;
	onChange: (path: ProductPath | undefined, characteristicKey: string, value: string, index: number) => void;
	index: number;
	styles: Record<string, string | number>;
	tabIndex?: number;
}

const CharacteristicsTextInput: FC<CharacteristicsTextInputProps> = (props: CharacteristicsTextInputProps) => {
	const {
		inputCharacteristic,
		characteristicKey,
		characteristicValue,
		path,
		isMandatory,
		onChange,
		index,
		styles,
		tabIndex
	} = props;

	const name = get(inputCharacteristic, "name", characteristicKey);
	const validation = inputCharacteristic && inputCharacteristic.validation;

	return (
		<OcTextInput
			className="this"
			labelWidth={"120px"}
			label={name}
			labelPosition={OcInputLabelPosition.LEFT}
			id={`icc_input_${ProductOfferingUtil.pathToStringFromPathType(path)}_${characteristicKey}-${index}`}
			placeholder={name}
			value={characteristicValue}
			onChange={(event: any) => onChange(path, characteristicKey, event.target.value, index)}
			required={isMandatory}
			pattern={validation ? validation : ".*"}
			style={styles}
			tabIndex={tabIndex ? tabIndex : 0}
		/>
	);
};

export default CharacteristicsTextInput;
export {
	CharacteristicsTextInputProps,
};
