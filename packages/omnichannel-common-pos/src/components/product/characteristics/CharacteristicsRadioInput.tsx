import cssns from "../../../utils/cssnsConfig";
import { get } from "lodash";
import OcInput from "../../ocComponents/OcInput";
import ProductOfferingConfigurationPrice from "../ProductOfferingConfigurationPrice";
import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";
import { Characteristic, CharacteristicValue, Price, PriceTypeEnum, ProductOffering, ProductPath } from "../../../redux/types";
import { FC } from "react";
import withProductOfferingConfigurationActions, { WithProductOfferingConfigurationActionsProps } from "../withProductOfferingConfigurationActions";

const { React } = cssns("CharacteristicsRadioInput");

interface CharacteristicsRadioInputProps extends WithProductOfferingConfigurationActionsProps {
	characteristicKey: string;
	product?: ProductOffering;
	inputtedCharacteristics?: Record<string, string>;
	inputCharacteristic?: Characteristic;
	path: ProductPath;
}

const CharacteristicsRadioInput: FC<CharacteristicsRadioInputProps> = (props) => {
	const {
		inputCharacteristic,
		inputtedCharacteristics,
		characteristicKey,
		product,
		path,
	} = props;

	const values = inputCharacteristic && inputCharacteristic.values;

	return (
		<div className="container">
			{values && values.map((cValue: CharacteristicValue) => {
					const priceObject = (product && product.prices || []).find((price: Price) => {
						return (price && get(price, ["conditions", characteristicKey]) === get(cValue, "name"));
					});

					const selected = get(inputtedCharacteristics, characteristicKey) === get(cValue, "value");

					const upfrontPrice = priceObject && priceObject.type === PriceTypeEnum.ONE_TIME ? priceObject : undefined;
					const recurringPrice = priceObject && priceObject.type === PriceTypeEnum.RECURRENT ? priceObject : undefined;

					return (
						<div className="wrapper" key={`CharacteristicsRadioInput-${cValue.value}`}>
							<OcInput
								id={`icc_radio_${ProductOfferingUtil.pathToStringFromPathType(path)}_${cValue.value}`}
								type="radio"
								label={cValue.name}
								onChange={() => {
									props.actions.setInputtedCharacteristic(path, characteristicKey, cValue.value);
								}}
								checked={selected}
							/>

							<div>
								<ProductOfferingConfigurationPrice
									upfrontPrice={upfrontPrice}
									recurringPrice={recurringPrice}
									selected={selected}
								/>
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default withProductOfferingConfigurationActions<CharacteristicsRadioInputProps>(CharacteristicsRadioInput);
export {
	CharacteristicsRadioInputProps,
};
