import cssns from "../../../utils/cssnsConfig";
import { get, isNil, debounce, isEmpty, values } from "lodash";
import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";
import ProductUtil from "../../../utils/product/ProductUtil";
import CharacteristicsTextInputList from "./CharacteristicsTextInputList";
import { PureComponent } from "react";
import {
	Characteristic,
	ProductOffering,
	ProductPath,
	NominationCharacteristics,
} from "../../../redux/types";
import withProductOfferingConfigurationActions, {
	WithProductOfferingConfigurationActionsProps,
	WithProductOfferingConfigurationStateProps,
} from "../withProductOfferingConfigurationActions";

const { React } = cssns("CharacteristicsTextInput");

interface CharacteristicsTextInputContainerProps extends WithProductOfferingConfigurationActionsProps, WithProductOfferingConfigurationStateProps {
	path: ProductPath;
	isMandatory?: boolean;
	inputCharacteristic?: Characteristic;
	characteristicKey: string;
	inputtedCharacteristics?: Record<string, string>;
	product: ProductOffering;
	nominationPOCharacteristics: NominationCharacteristics | null;
	isNominationPO?: boolean;
	specificationId?: string;
	characteristicsAliases: Record<string, string>;
	isValidIccid?: boolean;
	isPreactivatedIccid?: boolean;

}

interface CharacteristicsTextInputContainerState {
	characteristics: Array<{value: string}>;
	characteristicValidations: Array<{validIccid?: boolean, preactivatedIccid?: boolean}>;
}

class CharacteristicsTextInputContainer extends PureComponent<CharacteristicsTextInputContainerProps, CharacteristicsTextInputContainerState> {

	setInputtedCharacteristic = debounce(() => {
		const { path,
				characteristicKey,
				characteristicsAliases,
				ICCIDPreactivationValidationPOs,
				product,
				msisdnConfiguration : { countryCode },
				actions,
			  } = this.props;
		const { characteristics } = this.state;
		let value = get(characteristics, "[0].value");
		const msisdnNumberLengthWithoutCountryCode = 8;

		if (value !== "") {
		// Trigger also ICC validation if it's enabled and characteristic matches configuration
		const iccValidationEnabled = !ICCIDPreactivationValidationPOs || ICCIDPreactivationValidationPOs.includes(product.id);
		const iccCharacteristic = characteristicsAliases && characteristicsAliases.icc;
		const friendNumberCharacteristic = characteristicsAliases && characteristicsAliases.friendNumber;

			if (iccValidationEnabled && characteristicKey === iccCharacteristic) {
				actions.triggerICCIDPreactivationValidation({ iccid: value, path });
			}

			if (characteristicKey === friendNumberCharacteristic) {
				const specificationId = get(product, "attributes.specificationId");
				if (specificationId && specificationId.includes("FnF") && value.length === msisdnNumberLengthWithoutCountryCode) {
					value = `${countryCode}${value}`;
					this.setState({ characteristics: [{ value }] }, () =>
						actions.triggerFnfValidation({ fnfNumber: this.state.characteristics[0].value, path })
					);
				}
			}
			actions.setInputtedCharacteristic(path, characteristicKey, value);
		}
	}, 500);

	setEnhancedCharacteristics = debounce(() => {
		const { path, characteristicKey } = this.props;
		const { characteristics } = this.state;
		const restOffTheCharacteristics = characteristics.slice(1, characteristics.length);
		this.props.actions.setEnhancedCharacteristics(path, characteristicKey, restOffTheCharacteristics);
	}, 500);

	constructor(props: CharacteristicsTextInputContainerProps) {
		super(props);
		this.state = {
			characteristics: [{ value: "" }],
			characteristicValidations: [{validIccid: true, preactivatedIccid: true}]
		};
	}

	componentDidMount() {
		const { characteristicKey, product } = this.props;

		const inputtedCharacteristics = ProductOfferingUtil.getInputtedCharacteristics(product);
		const inputtedCharacteristicValue = get(inputtedCharacteristics, characteristicKey);

		const enhancedCharacteristicsValues: Record<string, Array<any>> = ProductOfferingUtil.getEnhancedCharacteristics(product) || {};
		const enhancedCharacteristics = enhancedCharacteristicsValues[characteristicKey];

		/* set the inputtedCharacteristics as a first value on the list. */
		if (inputtedCharacteristicValue) {
			const characteristics = [
				{ value: inputtedCharacteristicValue }
			].concat(enhancedCharacteristics);

			this.setState({ characteristics }, this.updateCharacteristics);
		}
		if (!inputtedCharacteristicValue && !enhancedCharacteristics) {
			this.setState({ characteristics: [{ value: "" }] });
		}
	}

	componentWillReceiveProps(newProps: CharacteristicsTextInputContainerProps) {
		if (newProps !== this.props) {
			const nominationPOCharacteristics = this.props;
			if (nominationPOCharacteristics) {
				const nominationKeys = values(nominationPOCharacteristics);
				if (nominationKeys.includes(newProps.characteristicKey)) {
					if (!isNil((newProps.inputtedCharacteristics as any)[newProps.characteristicKey])) {
						this.setState({
							characteristics: [
								{
									value: (newProps.inputtedCharacteristics as any)[newProps.characteristicKey]
								}
							],
							characteristicValidations: [
								{
									validIccid: newProps.isValidIccid,
									preactivatedIccid: newProps.isPreactivatedIccid
								}
							]
						});
					}
				}
			}
		}
	}

	canConfigureMore = () => {
		const { inputCharacteristic } = this.props;
		const { characteristics } = this.state;
		const max = get(inputCharacteristic, "cardinality.max");
		return max > characteristics.length;
	};

	addTextInput = () => {
		const characteristics = this.state.characteristics.concat({value: ""});
		this.setState({ characteristics });
	};

	removeTextInput = (indexToRemove: number) => {
		const characteristics = this.state.characteristics.map((oldValue: any, index: number) => {
			return index === indexToRemove ? {} : oldValue;
		}).filter(obj => {
			return !isEmpty(obj);
		});

		this.setState({
				characteristics: characteristics,
			},
			this.updateCharacteristics
		);
	};

	onChange = (path: ProductPath | undefined, characteristicsKey: string, value: string, indexToUpdate: number) => {
		const characteristics = this.state.characteristics.map((oldValue, index) => {
			return index === indexToUpdate ? { value } : oldValue;
		});
		this.setState({ characteristics }, () => {
			if (indexToUpdate > 0) {
				this.setEnhancedCharacteristics();
			} else {
				this.setInputtedCharacteristic();
			}
		});
	};

	updateCharacteristics = () => {
		this.setInputtedCharacteristic();
		this.setEnhancedCharacteristics();
	};

	render() {
		const {
			characteristicKey,
			characteristicsAliases,
			inputCharacteristic,
			nominationPOCharacteristics,
			isNominationPO,
			isMandatory,
		} = this.props;

		const { characteristics, characteristicValidations } = this.state;
		return (
			<CharacteristicsTextInputList
				inputCharacteristic={inputCharacteristic}
				removeTextInput={this.removeTextInput}
				addTextInput={this.addTextInput}
				characteristicKey={characteristicKey}
				characteristics={characteristics}
				characteristicsAliases={characteristicsAliases}
				characteristicValidations={characteristicValidations}
				canAddMoreInputElements={this.canConfigureMore()}
				onChange={this.onChange}
				isMandatory={isMandatory}
				nominationPOCharacteristics={nominationPOCharacteristics}
				isNominationPO={isNominationPO}
			/>
		);
	}
}

export default withProductOfferingConfigurationActions(CharacteristicsTextInputContainer);
export {
	CharacteristicsTextInputContainerProps,
	CharacteristicsTextInputContainer
};
