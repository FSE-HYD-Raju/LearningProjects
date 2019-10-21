import {
	Characteristic,
	ProductOffering,
	Price,
	CharacteristicValue, Cardinality
} from "../../../redux/types";
import cssns from "../../../utils/cssnsConfig";
import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";
import OcSelect from "../../ocComponents/OcSelect";
import { get } from "lodash";
import { ReactNode, FC } from "react";
import { ContextType, contextTypesValidationMap } from "../../../types";
import { ProductPath } from "../../../redux";
import withProductOfferingConfigurationActions, { WithProductOfferingConfigurationActionsProps } from "../withProductOfferingConfigurationActions";

const { React } = cssns("CharacteristicsDropdown");

const OPTIONAL_OPTION_VALUE = "";

interface CharacteristicsOwnDropdownProps {
	path?: ProductPath;
	inputCharacteristic?: Characteristic;
	characteristicKey: string;
	inputtedCharacteristics?: Record<string, string>;
	enhancedCharacteristics?: Record<string, Array<any>>;
	product?: ProductOffering;
}

type CharacteristicsDropdownProps = CharacteristicsOwnDropdownProps &  WithProductOfferingConfigurationActionsProps;

const CharacteristicsDropdown: FC<CharacteristicsDropdownProps> = (props: CharacteristicsDropdownProps, context: ContextType) => {
	const {
		inputCharacteristic,
		inputtedCharacteristics,
		enhancedCharacteristics,
		path,
		characteristicKey,
		product,
	} = props;

	const cardinality: Cardinality | undefined = inputCharacteristic && inputCharacteristic.cardinality;
	const value = inputCharacteristic && inputCharacteristic.name || characteristicKey;
	const isMultiSelect = !!(cardinality && cardinality.max && cardinality.max > 1);
	let selectedValue;
	if (inputtedCharacteristics && characteristicKey && characteristicKey.indexOf("~") !== -1) {
		const keys = characteristicKey.split("~");
		const value1 = inputtedCharacteristics[keys[0]];
		const value2 = inputtedCharacteristics[keys[1]];
		if (value1 && value2) {
			selectedValue = `${value1}~${value2}`;
		}
	} else {
		selectedValue = characteristicKey ?
			(isMultiSelect ? get(enhancedCharacteristics, characteristicKey) : get(inputtedCharacteristics, characteristicKey))
			: undefined;
	}

	const getFormattedNumber = (price?: Price) => {
		return price && price.taxFreeAmount ? context.intl.formatNumber(price.taxFreeAmount, {
				style: "currency",
				currency: price.currency
			})
			: "";
	};

	const handleSelectChange = (event: any) => {
		if (isMultiSelect) {
			const options: Array<any> = event.target.options || [];
			const values: Array<string>  = options
				.filter((option: any): boolean => !!option.selected)
				.map((option: any): string => option.value)
				.filter((value: string) => value !== OPTIONAL_OPTION_VALUE);
			if (cardinality && cardinality.max && values.length <= cardinality.max) {
				props.actions.setEnhancedCharacteristics(path!, characteristicKey, values);
			}
		} else {
			if (characteristicKey.indexOf("~") !== -1 && event.target.value.indexOf("~") !== -1) {
				const keys = characteristicKey.split("~");
				const values = event.target.value.split("~");
				keys.forEach((key, index) => props.actions.setInputtedCharacteristic(path!, key, values[index]));
			} else {
				props.actions.setInputtedCharacteristic(path!, characteristicKey, event.target.value);
			}
		}
	};

	const renderOptions = () => {
		const values = inputCharacteristic && inputCharacteristic.values;
		const shouldHaveOptionalOption = cardinality && cardinality.min === 0;
		let resultValues: Array<ReactNode> = [];
		if (shouldHaveOptionalOption) {
			resultValues = [<option key="optionalOption" value={OPTIONAL_OPTION_VALUE}/>];
		}
		if (Array.isArray(values)) {
			resultValues = resultValues.concat(values.filter((value: CharacteristicValue) => value.value).map((option: CharacteristicValue) => {
				const prices: Array<Price> = product && (product.attributes && product.attributes.prices || product.prices) || [];
				const priceObject = prices.find((price: Price) => {
					return Boolean(price.conditions && characteristicKey && price.conditions[characteristicKey] === option.name);
				});
				const optionValueString = `${option.name || option.value} ${getFormattedNumber(priceObject)}`;
				return (
					<option
						key={option.value}
						id={`icc_select_${ProductOfferingUtil.pathToStringFromPathType(path)}_${characteristicKey}_option-${option.value}`}
						value={option.value}
					>
						{optionValueString}
					</option>
				);
			}));
			return resultValues;
		}

		return null;
	};

	return (
		<OcSelect
			className="this"
			multiple={isMultiSelect}
			label={value}
			id={`icc_select_${ProductOfferingUtil.pathToStringFromPathType(path)}_${characteristicKey}`}
			value={selectedValue}
			onChange={handleSelectChange}
			placeholder={value}
		>
			{renderOptions()}
		</OcSelect>
	);
};

CharacteristicsDropdown.contextTypes = contextTypesValidationMap;

export default withProductOfferingConfigurationActions<CharacteristicsDropdownProps>(CharacteristicsDropdown);
export {
	CharacteristicsDropdownProps,
	CharacteristicsOwnDropdownProps,
};
