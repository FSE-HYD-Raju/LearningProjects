import * as React from "react";
import { get } from "lodash";
import {
	AutoCharacteristicConfigurationType,
	ProductPath
} from "../../../redux/types";

interface AutoCharacteristicConfigurationProps {
	setInputtedCharacteristic: (path: ProductPath, key: string, value: string) => void;
	inputtedCharacteristics?: Record<string, string>;
	characteristicKey?: string;
	characteristicValue?: AutoCharacteristicConfigurationType;
	path: ProductPath;
}

// this component just sets inputted characteristic automatically and renders nothing to the viewport
const AutoCharacteristicConfiguration: React.FC<AutoCharacteristicConfigurationProps> = (props: AutoCharacteristicConfigurationProps) => {
	const {
		setInputtedCharacteristic,
		inputtedCharacteristics,
		characteristicKey,
		characteristicValue,
		path
	} = props;

	if (inputtedCharacteristics && characteristicKey && characteristicValue && path) {
		const value = characteristicValue && characteristicValue.value;
		if (value && get(inputtedCharacteristics, characteristicKey) !== value) {
			setInputtedCharacteristic(path, characteristicKey, value);
			return (
				<span style={{ display: "none" }}>
					{characteristicKey}
					{value}
				</span>
			);
		}
	}
	return null;
};

export default AutoCharacteristicConfiguration;
