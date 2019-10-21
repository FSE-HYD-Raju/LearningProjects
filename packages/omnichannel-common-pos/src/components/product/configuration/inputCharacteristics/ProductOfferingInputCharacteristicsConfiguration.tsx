import cssns from "../../../../utils/cssnsConfig";
import { FC } from "react";
import { map, isEmpty } from "lodash";
import getICCSubTypeDisplayMode from "./getICCSubTypeDisplayMode";
import {
	Characteristic,
	ProductOffering,
	ProductPath
} from "../../../../redux";
import CharacteristicRenderHocContainer from "../../characteristics/CharacteristicRenderHocContainer";
import { ContextType, contextTypesValidationMap } from "../../../../types";
import ProductOfferingConfigurationUtil from "../utils/ProductOfferingConfigurationUtil";

const { React } = cssns("ProductOfferingInputCharacteristicsConfiguration");

const skipCharacteristicBySubType = (subType?: string | null) => {
	const skipCharacteristics = ["device-reservation", "pos-calendar"];
	return skipCharacteristics.find(s => {
		return s === subType;
	});
};

const getReservedInputtedCharacteristicValue = () => "_" + Math.random().toString(36).substr(2, 9);

const handleDeviceReservation = (
	inputCharacteristic: Characteristic,
	inputtedCharacteristics: Record<string, string>,
	setInputtedCharacteristic: (path: ProductPath, key: string, value: string) => void,
	path: ProductPath,
	key: string
) => {
	if (inputCharacteristic.subType === "device-reservation") {
		if (!inputtedCharacteristics[key]) {
			setTimeout(() => {
				setInputtedCharacteristic(path, key, getReservedInputtedCharacteristicValue());
			}, 300);
		}
	}
};

const handlePosCalendar = (
	inputCharacteristic: Characteristic,
	inputtedCharacteristics: Record<string, string>,
	setInputtedCharacteristic: (path: ProductPath, key: string, value: string) => void,
	setConfigurableInstallationTime: (path: ProductPath, key: string) => void,
	path: ProductPath,
	key: string
) => {
	if (inputCharacteristic.subType === "pos-calendar" && setConfigurableInstallationTime) {
		if (!inputtedCharacteristics[key]) {
			setTimeout(() => {
				setInputtedCharacteristic(path, key, "temp-value");
				setConfigurableInstallationTime(path, key);
			}, 300);
		}
	}
};

const handleSpecialCharacteristics = (
	inputCharacteristic: Characteristic,
	inputtedCharacteristics: Record<string, string>,
	setInputtedCharacteristic: (path: ProductPath, key: string, value: string) => void,
	setConfigurableInstallationTime: (path: ProductPath, key: string) => void,
	path: ProductPath,
	key: string
) => {
	handleDeviceReservation(inputCharacteristic, inputtedCharacteristics, setInputtedCharacteristic, path, key);
	handlePosCalendar(inputCharacteristic, inputtedCharacteristics, setInputtedCharacteristic, setConfigurableInstallationTime, path, key);
};

interface ProductOfferingInputCharacteristicsConfigurationOwnProps {
	product: ProductOffering;
	inputCharacteristics: Record<string, Characteristic>;
	inputtedCharacteristics: Record<string, string>;
	enhancedCharacteristics: Record<string, Array<string>>;
	iccSubtypeDisplay: any; // TODO: proper type
	path: ProductPath;
	isNominationPO: boolean;
}

interface ProductOfferingInputCharacteristicsConfigurationActionProps {
	actions: {
		setInputtedCharacteristic: (path: ProductPath, key: string, value: string) => void;
		setEnhancedCharacteristics: (path: ProductPath, key: string, valueArray: Array<{value: string}>) => void;
		setConfigurableInstallationTime: (path: ProductPath, key: string) => void;
	};
}

type ProductOfferingInputCharacteristicsConfigurationProps = ProductOfferingInputCharacteristicsConfigurationOwnProps
	& ProductOfferingInputCharacteristicsConfigurationActionProps;

const ProductOfferingInputCharacteristicsConfiguration: FC<ProductOfferingInputCharacteristicsConfigurationProps> = (props, context: ContextType) => {
	const { inputCharacteristics, product, iccSubtypeDisplay, inputtedCharacteristics, enhancedCharacteristics, path } = props;
	if (isEmpty(inputCharacteristics)) {
		return null;
	}
	if (!ProductOfferingConfigurationUtil.isProductForRenderByCharacteristics(product)) {
		return null;
	}

	return (
		<div>
			{map(inputCharacteristics, (inputCharacteristic, key: string) => {
				const values = inputCharacteristic.values;

				const iccDisplayMode = getICCSubTypeDisplayMode(iccSubtypeDisplay, inputCharacteristic.subType);
				handleSpecialCharacteristics(
					inputCharacteristic,
					inputtedCharacteristics,
					props.actions.setInputtedCharacteristic,
					props.actions.setConfigurableInstallationTime,
					path,
					key
				);

				if (skipCharacteristicBySubType(inputCharacteristic.subType) || !values) {
					return null;
				}
				return (
					<div className="characteristic-container" key={key} title={inputCharacteristic.description}>
						<div className="characteristicRenderHoc-wrapper" id={"characteristicRenderHoc-wrapper-" + key}>
							<CharacteristicRenderHocContainer
								flux={context.flux}
								pathKey={key}
								icc_display_mode={iccDisplayMode}
								path={path}
								inputCharacteristic={inputCharacteristic}
								inputtedCharacteristics={inputtedCharacteristics}
								enhancedCharacteristics={enhancedCharacteristics}
								product={product}
								isNominationPO={props.isNominationPO}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
};
ProductOfferingInputCharacteristicsConfiguration.contextTypes = contextTypesValidationMap;

export default ProductOfferingInputCharacteristicsConfiguration;
export {
	ProductOfferingInputCharacteristicsConfigurationProps,
	ProductOfferingInputCharacteristicsConfigurationOwnProps,
	ProductOfferingInputCharacteristicsConfigurationActionProps,
};
