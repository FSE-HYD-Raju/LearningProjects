import cssns from "../../utils/cssnsConfig";

import ProductOfferingUtil from "../../utils/ProductOfferingUtil";
import { get, map, pickBy, values, isEqual } from "lodash";
import ProductOfferingConfigurationPrice from "./ProductOfferingConfigurationPrice";
import NominationSearchInputContainer from "./characteristics/NominationSearchInputContainer";
import ProductOfferingGroupsConfiguration from "./configuration/groups/ProductOfferingGroupsConfiguration";
import ProductOfferingInputCharacteristicsConfiguration from "./configuration/inputCharacteristics/ProductOfferingInputCharacteristicsConfiguration";
import getICCSubTypeDisplayMode from "./configuration/inputCharacteristics/getICCSubTypeDisplayMode";
import { Component } from "react";
import {
	Characteristic,
	FeatureIdentifierType,
	PriceTypeEnum,
	ProductOffering,
	ProductOfferingGroup,
	ProductPath,
	NominationPOCharacteristicsConfig,
	CharacteristicValue,
	ValueRegulatorEnum,
	ValueRegulator,
	WorkforceAppointment,
	InstallationTimeslotConfiguration,
} from "../../redux/types";
import { ProductOfferingMsisdnConfigurationProps } from "./configuration/utils/ProductOfferingMsisdnConfigurationProps";
import { ContextType, contextTypesValidationMap } from "../../types";
import { DateRangeUtil } from "../../utils/DateRangeUtil";

const { React } = cssns("ProductOfferingConfiguration");

interface ProductOfferingConfigurationStateProps extends ProductOfferingMsisdnConfigurationProps {
	product: ProductOffering;
	path: ProductPath;
	showName?: boolean;
	icc_subtype_display: { // TODO: make a type for this
		dropdown: Array<"dropdown" | string>;
		radio: Array<"radio" | string>;
	};
	isAddonVisible: boolean;
	marketingConsent?: FeatureIdentifierType;
	paymentGatewayIdentifier?: FeatureIdentifierType;
	phoneDirectoryRegistrationConsentIdentifier?: FeatureIdentifierType;
	recurringTopUpsIdentifier?: FeatureIdentifierType;
	msisdnReservationRequired?: boolean;
	deliveryOptionsGroup?: string;
	nominationPOCharacteristics: NominationPOCharacteristicsConfig | null;
	installationTimeslotFeatureConfiguration?: InstallationTimeslotConfiguration;
	workforceAvailableAppointments: WorkforceAppointment[];
}

interface ProductOfferingConfigurationActionProps {
	actions: {
		clearProductOfferingErrors: () => void;
		toggleProductOffering: (path: ProductPath) => void;
		setInputtedCharacteristic: (path: ProductPath, key: string, value: string) => void;
		setEnhancedCharacteristics: (path: ProductPath, key: string, valueArray: Array<{value: string}>) => void;
		selectProductOffering: (path: ProductPath, value: string, productOfferings: ProductOffering[]) => void;
		makeMsisdnSoftReservation: (path: ProductPath, key: string, value: string, id: string) => void;
		updateMsisdnSoftReservation: (path: ProductPath, key: string, value: string, id: string) => void;
		resetMsisdnSoftReservation: () => void;
		setConfigurableInstallationTime: (path: ProductPath, key: string) => void;
		getWorkforceAvailableAppointments: (productOfferingId: string) => void;
		resetWorkforceAvailableAppointments: () => void;
	};
}

type ProductOfferingConfigurationProps = ProductOfferingConfigurationStateProps & ProductOfferingConfigurationActionProps;

class ProductOfferingConfiguration extends Component<ProductOfferingConfigurationProps> {
	static contextTypes = contextTypesValidationMap;

	constructor(props: ProductOfferingConfigurationProps, context: ContextType) {
		super(props, context);
	}

	getDefaultSelection = (inputtedCharacteristics: Record<string, string> | undefined, enhancedCharacteristics: Record<string, Array<any>> | undefined,
						   key: string, value: Characteristic) => {

		const values = value && value.values || [];
		if (value.cardinality && value.cardinality.max && value.cardinality.max > 1) {
			const existingSelection = get(enhancedCharacteristics, key);
			const defaultValues = values.filter(val => val.isDefault).map(val => val.value);
			return existingSelection || defaultValues;
		} else {
			const valuesWithValue = values.filter(val => val.value);
			const firstValue = (Array.isArray(valuesWithValue) && valuesWithValue.length > 0 && valuesWithValue[0]) || {};
			const existingSelection = get(inputtedCharacteristics, key);
			const defaultValueObj = values.find(val => !!val.isDefault);
			return existingSelection || defaultValueObj && defaultValueObj.value || get(firstValue, "value");
		}
	};

	isConfigurable = (characteristic: Characteristic) => {
		const valueRegulator = characteristic.valueRegulator;
		return this.isConfigurableCharacteristic(valueRegulator);
	};

	isConfigurableCharacteristic = (valueRegulator?: ValueRegulator | null) => {
		return valueRegulator !== ValueRegulatorEnum.NO_PERSONALIZATION;
	};

	getConfigurableInputCharacteristics = (product: ProductOffering): Record<string, Characteristic> => {
		const inputCharacteristics = ProductOfferingUtil.getInputCharacteristics(product) || {};
		const configurableCharacteristics = pickBy(inputCharacteristics, (inputCharacteristic: Characteristic) => {
				return this.isConfigurable(inputCharacteristic);
			}
		);
		return configurableCharacteristics;
	};

	// Some kind of forever render loop happening when mounting the modal in this component, this seems to help.
	// We should re-render on change of one of the following:
	// - product
	// - any prop coming from MsisdnConfigurationProvider HOC
	shouldComponentUpdate(nextProps: ProductOfferingConfigurationProps, nextState: any) {
		const oldProps = this.props;
		return !isEqual([oldProps.product, oldProps.msisdnModalVisible, oldProps.msisdnConfig, oldProps.workforceAvailableAppointments],
			[nextProps.product, nextProps.msisdnModalVisible, nextProps.msisdnConfig, nextProps.workforceAvailableAppointments]);
	}

	componentDidMount() {
		// Perform initial set up for dropdown values to fix RUBT-80755
		const {
			product,
			path,
			icc_subtype_display
		} = this.props;

		if (product) {
			const inputCharacteristics = this.getConfigurableInputCharacteristics(product);
			const inputtedCharacteristics = ProductOfferingUtil.getInputtedCharacteristics(product);
			const enhancedCharacteristics = ProductOfferingUtil.getEnhancedCharacteristics(product);
			if (this.installationRequired(product)) {
				this.props.actions.resetWorkforceAvailableAppointments();
				this.props.actions.getWorkforceAvailableAppointments(product.id);
			}

			const newPath = path.concat({ po: product.id });
			if (inputCharacteristics) {
				map(inputCharacteristics, (value: Characteristic, key: string) => {
					const iccDisplayMode = getICCSubTypeDisplayMode(icc_subtype_display, value.subType);
					if (iccDisplayMode === "dropdown") {
						const selection = this.getDefaultSelection(inputtedCharacteristics, enhancedCharacteristics, key, value);
						if (Array.isArray(selection)) {
							this.props.actions.setEnhancedCharacteristics(newPath, key, selection);
						} else {
							this.props.actions.setInputtedCharacteristic(newPath, key, selection);
						}
					}
					return null;
				});
			}
		}
	}

	componentDidUpdate(prevProps: ProductOfferingConfigurationProps) {
		if (prevProps.msisdnModalVisible && !this.props.msisdnModalVisible) {
			if (this.props.actions.resetMsisdnSoftReservation) {
				this.props.actions.resetMsisdnSoftReservation();
			}
		}
	}

	onChangeEvent = (path: ProductPath, pog: ProductOfferingGroup, po: ProductOffering) => {
		// adds 2 items to existing path and calls toggle
		this.props.actions.toggleProductOffering(
			path.concat({ pog: pog.id }, { po: po.id })
		);
	};

	isNominationPO = (inputCharacteristics: Record<string, Characteristic>, nominationPOCharacteristics:
		NominationPOCharacteristicsConfig | null, productOfferingId: string) => {

		const nominationCharacteristics = nominationPOCharacteristics && nominationPOCharacteristics.characteristics;
		const nominationPoId = nominationPOCharacteristics && nominationPOCharacteristics.poId;
		if (inputCharacteristics && nominationCharacteristics && productOfferingId && nominationPoId) {
			const nominationKeys: Array<any> = values(nominationCharacteristics);

			const isEveryKeyCorrect = nominationKeys.every((key: any) => {
				return !!inputCharacteristics[key];
			});

			return productOfferingId === nominationPoId && isEveryKeyCorrect;
		}
		return false;
	};

	isPOWithTFormName = (po: ProductOffering, hideableValues: Array<string> = []) => {
		const tFormValues = get(po.instanceCharacteristics, "T_FORM_NAME");
		const characteristicsOfTForm: Array<CharacteristicValue> = tFormValues && ((tFormValues) as any).values || [];
		const tFormNameValues: Array<string> = characteristicsOfTForm.map((values: CharacteristicValue) => values.value);
		return tFormNameValues.some((value: string) => hideableValues.includes(value));
	};

	getValuesFrom = (input?: FeatureIdentifierType) => {
		return input && input.values || [];
	};

	filterPOGWithTFormName = (pog: ProductOfferingGroup, hideableValues: Array<string> = []) =>
		pog.productOfferings ? pog.productOfferings.filter((po: ProductOffering) => this.isPOWithTFormName(po, hideableValues)) : [];

	installationRequired = (product: ProductOffering): boolean => 
		!!(product.attributes && product.attributes.categories && product.attributes.categories.includes("installation-required"));

	render() {
		const {
			product,
			icc_subtype_display,
			marketingConsent,
			msisdnConfig,
			paymentGatewayIdentifier,
			phoneDirectoryRegistrationConsentIdentifier,
			recurringTopUpsIdentifier,
			nominationPOCharacteristics,
			deliveryOptionsGroup,
		} = this.props;

		if (!product) {
			return <div />;
		}

		const hideableValues: Array<string> = this.getValuesFrom(marketingConsent)
			.concat(this.getValuesFrom(paymentGatewayIdentifier))
			.concat(this.getValuesFrom(phoneDirectoryRegistrationConsentIdentifier))
			.concat(this.getValuesFrom(recurringTopUpsIdentifier));

		const inputCharacteristics = this.getConfigurableInputCharacteristics(product);
		const inputtedCharacteristics = ProductOfferingUtil.getInputtedCharacteristics(product) || {};
		const enhancedCharacteristics = ProductOfferingUtil.getEnhancedCharacteristics(product) || {};

		if (this.installationRequired(product)) {
			const { installationTimeslotFeatureConfiguration = {}, workforceAvailableAppointments } = this.props;
			const characteristicValues: CharacteristicValue[] = workforceAvailableAppointments.map(e => {
				return {
					name: DateRangeUtil.format(e.startDatetime, e.endDatetime),
					value: `${e.startDatetime}~${e.endDatetime}`,
				};
			});
			const {
				dropdownLabel = "Installation appointment timeslot",
				installationStartDateTimeCharacteristicKey = "CH_Installation_StartDateTime",
				installationEndDateTimeCharacteristicKey = "CH_Installation_EndDateTime",
			} = installationTimeslotFeatureConfiguration;
			inputCharacteristics[`${installationStartDateTimeCharacteristicKey}~${installationEndDateTimeCharacteristicKey}`] = {
				name: dropdownLabel,
				values: characteristicValues,
				mandatory: true,
				inputType: "dropdown",
			};
		}

		let productOfferingGroups = ProductOfferingUtil.getProductOfferingGroups(product);
		let productOfferings = ProductOfferingUtil.getProductOfferings(product);

		productOfferingGroups = Array.isArray(productOfferingGroups) ? productOfferingGroups.filter(pog =>
			this.filterPOGWithTFormName(pog, hideableValues).length === 0) : [];

		productOfferingGroups = Array.isArray(productOfferingGroups) && deliveryOptionsGroup
				? productOfferingGroups.filter(pog => pog.id !== deliveryOptionsGroup)
				: productOfferingGroups;

		productOfferings = Array.isArray(productOfferings) ? productOfferings.filter(
					po => !this.isPOWithTFormName(po, hideableValues)) : [];

		// path to the current PO (it might be under another PO or a POG)
		const newPath = this.props.path.concat({ po: product.id });

		const upfrontPrice = ProductOfferingUtil.getPrice(product, PriceTypeEnum.ONE_TIME);
		const recurringPrice = ProductOfferingUtil.getPrice(product, PriceTypeEnum.RECURRENT);

		const isNominationPO = this.isNominationPO(inputCharacteristics, nominationPOCharacteristics, product.id);

		return (
			<div>
				<div
					className="poc-child-layout-column"
					key={`ProductOfferingConfiguration-head-${get(product, "id", "")}-${get(product, "name", "")}`}
				>
					{newPath.length > 1 && this.props.showName && (
						<div className="po-config-price">
							<h5 className="po-short-name">
								{ProductOfferingUtil.getPOName(product)}
							</h5>

							<ProductOfferingConfigurationPrice
								upfrontPrice={upfrontPrice}
								recurringPrice={recurringPrice}
								selected={true}
							/>
						</div>
					)}
					<ProductOfferingInputCharacteristicsConfiguration
						actions={{
							setInputtedCharacteristic: this.props.actions.setInputtedCharacteristic,
							setEnhancedCharacteristics: this.props.actions.setEnhancedCharacteristics,
							setConfigurableInstallationTime: this.props.actions.setConfigurableInstallationTime,
						}}
						inputCharacteristics={inputCharacteristics}
						inputtedCharacteristics={inputtedCharacteristics}
						enhancedCharacteristics={enhancedCharacteristics}
						product={product}
						path={newPath}
						iccSubtypeDisplay={icc_subtype_display}
						isNominationPO={isNominationPO}
					/>
					<ProductOfferingGroupsConfiguration
						productOfferingGroups={productOfferingGroups}
						path={newPath}
						product={product}
						toggleMsisdnModal={this.props.toggleMsisdnModal}
						userOpened={this.props.userOpened}
						msisdnConfig={msisdnConfig}
						msisdnReservationRequired={this.props.msisdnReservationRequired}
						msisdnModalVisible={this.props.msisdnModalVisible}
						isAddonVisible={this.props.isAddonVisible}
						selectProductOffering={this.props.actions.selectProductOffering}
						onChangeEvent={this.onChangeEvent}
						configurations={{}}
					/>

					{/* child POs without a POG in between (PO->PO) */}
					{Array.isArray(productOfferings) && productOfferings.map((po: ProductOffering) => {
						return (
							<div
								id={`ProductOfferingConfiguration-child-${po.id}-${po.name}`}
								key={`ProductOfferingConfiguration-child-${po.id}-${po.name}`}
							>
								<ProductOfferingConfiguration
									{...this.props}
									path={newPath}
									product={po}
									showName={true}
								/>
							</div>
						);
					})
					}
				</div>
				{isNominationPO && <NominationSearchInputContainer path={newPath}/>}
			</div>
		);
	}
}

export default ProductOfferingConfiguration;
export {
	ProductOfferingConfigurationProps,
	ProductOfferingConfigurationStateProps,
	ProductOfferingConfigurationActionProps,
};
