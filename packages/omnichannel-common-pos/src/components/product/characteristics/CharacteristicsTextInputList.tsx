import cssns from "../../../utils/cssnsConfig";
import CharacteristicsTextInput from "./CharacteristicsTextInput";
import { get } from "lodash";
import { Characteristic, NominationCharacteristics, ProductPath } from "../../../redux/types";
import { FormattedMessage } from "react-intl";
import  messages  from "./Characteristics.messages";

const { React } = cssns("CharacteristicsTextInputList");

interface CharacteristicsTextInputListProps {
	inputCharacteristic?: Characteristic;
	canAddMoreInputElements: boolean;
	removeTextInput: (indexToRemove: number) => void;
	addTextInput: () => void;
	isMandatory?: boolean;
	characteristicKey: string;
	characteristics: Array<{value: string}>;
	onChange: (path: ProductPath | undefined, characteristicKey: string, value: string, index: number) => void;
	nominationPOCharacteristics: NominationCharacteristics | null;
	isNominationPO?: boolean;
	characteristicsAliases: Record<string, string>;
	characteristicValidations: Array<{validIccid?: boolean, preactivatedIccid?: boolean}>;
}

const isNominationMsisdnSearchType = (key: string, nominationCharacteristics: NominationCharacteristics) => {
	return key === nominationCharacteristics.numberKey;
};

const isNominationICCSearchType = (key: string, nominationCharacteristics: NominationCharacteristics) => {
	return key === nominationCharacteristics.iccKey;
};

const CharacteristicsTextInputList = (props: CharacteristicsTextInputListProps) => {
	const getCharacteristicValue = (index: number, characteristics: Array<{value: string}>): string => get(characteristics, `[${index}].value`);

	const renderTextInputs = () => {
		const {
			characteristics,
			characteristicsAliases,
			characteristicValidations,
			removeTextInput,
			characteristicKey,
			onChange,
			nominationPOCharacteristics,
			isNominationPO,
			isMandatory,
		} = props;

		let tabIndex = 0;
		let styles: any;

		if (nominationPOCharacteristics && isNominationPO) {
			if (isNominationMsisdnSearchType(characteristicKey, nominationPOCharacteristics)
				|| isNominationICCSearchType(characteristicKey, nominationPOCharacteristics)) {

				tabIndex = -1;
				styles = {
					pointerEvents: "none",
				};
			}
		}

		const textInputs = [];
		const charLen = characteristics ? characteristics.length : 1;
		const iccCharacteristic = characteristicsAliases && characteristicsAliases.icc;

		for (let idx = 0; idx < charLen; idx++) {
			const key = `CharacteristicsTextInputList-${characteristicKey}-${idx}`;
			textInputs.push(
				<div className="wrapper" key={key} id={key}>
					<div className="textInputWrapper">
						<CharacteristicsTextInput
							index={idx}
							styles={styles}
							inputCharacteristic={props.inputCharacteristic}
							characteristicKey={characteristicKey}
							tabIndex={tabIndex}
							isMandatory={isMandatory}
							characteristicValue={getCharacteristicValue(idx, characteristics)}
							onChange={onChange}
						/>
						{characteristicKey === iccCharacteristic && (
						   <div className="textInputValidationError"> 
						        {characteristicValidations && !characteristicValidations[0]["preactivatedIccid"] && (
							    	<FormattedMessage {...messages.simCardNotPreactivated} />
						    	)}
							    {characteristicValidations && !characteristicValidations[0]["validIccid"] && (
							    	<FormattedMessage {...messages.simCardStateInvalid} />
						    	)}
						   </div>
						)}
					</div>
					<div className="closeIconWrapper">
						{idx > 0 && (
							<i
								onClick={() => {
									removeTextInput(idx);
								}}
								id={`CharacteristicsTextInputList-${characteristicKey}-close-${idx}`}
								className="fa fa-times"
							/>
						)}
					</div>
				</div>
			);
		}
		return textInputs;
	};

	const { canAddMoreInputElements, addTextInput } = props;
	return (
		<div>
			{canAddMoreInputElements && (
				<div>
					<i
						id="CharacteristicsTextInputList-add-more"
						onClick={addTextInput}
						className="fa fa-plus-circle fa-2x"
					/>
				</div>
			)}
			{renderTextInputs()}
		</div>
	);
};

export default CharacteristicsTextInputList;
export {
	CharacteristicsTextInputListProps,
};
