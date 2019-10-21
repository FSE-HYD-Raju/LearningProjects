"use strict";

import cssns from "../../../../../utils/cssnsConfig";
import messages from "./FaF.messages";
import { chain, get, isEmpty } from "lodash";
import OcModal from "../../../../ocComponents/OcModal";
import FaFNumberList from "./FaFNumberList";
import FaFConfirmation from "./FaFConfirmation";
import ProductOfferingUtil from "../../../../../utils/ProductOfferingUtil";
import {
	Product, ProductConfigurationSummary, SimplePrice, ChargingBalances,
	ProductConfigurationInitialization, EnhancedCharacteristic, Price, ProductOffering, PriceTypeEnum,
	SalesActionInitializeProductConfiguration, Characteristic
} from "../../../../../redux";
import { PureComponent } from "react";
import FormattedMessage from "../../../../../channelUtils/FormattedMessage";
const { React } = cssns("FaFNumberModal");

interface FaFNumberModalOwnProps {
	product?: ProductOffering;
	userProduct: Product;
	serviceId?: string;
}

interface FaFNumberModalStateProps {
	productConfigurationSummary?: ProductConfigurationSummary;
	productConfigurationInitialization?: ProductConfigurationInitialization;
	fafInputCharacteristic: Characteristic | undefined;
	individualId?: string;
}

interface FaFNumberModalActionProps {
	actions: {
		initializeProductConfiguration?: SalesActionInitializeProductConfiguration;
		resetProductConfiguration?: (value?: string, flag?: boolean) => void;
		goBack: () => void;
		submitInitializedProductConfiguration?: (value: string) => void;
		getAgreement?: (value: string) => void;
	};
}

type FaFNumberModalProps = FaFNumberModalStateProps & FaFNumberModalActionProps & FaFNumberModalOwnProps;

interface FaFNumberModalState {
	state: "SHOW_LIST" | "CONFIRM_ADD" | "CONFIRM_REMOVE";
	value: string;
	showModal: boolean;
	numbers: Array<string>;
	initializeInProgress: boolean;
	fetchingAgreements: boolean;
}

// TODO: extract messages
class FaFNumberModal extends PureComponent<FaFNumberModalProps, FaFNumberModalState> {
	constructor(props: FaFNumberModalProps) {
		super(props);

		this.state = {
			state: "SHOW_LIST",
			value: "",
			showModal: true,
			initializeInProgress: false,
			fetchingAgreements: false,
			numbers: []
		};
	}

	// noinspection TsLint
	componentWillReceiveProps(newProps: FaFNumberModalProps) {
		if (
			this.state.initializeInProgress &&
			newProps.productConfigurationInitialization
		) {
			this.setState({
				initializeInProgress: false
			});
		}
	}

	// noinspection TsLint
	render() {
		const {
			product,
			fafInputCharacteristic,
			productConfigurationInitialization
		} = this.props;

		const descriptionText: string = get(
			product,
			"attributes.commercialEnrichments[0].descriptions.description",
			""
		);

		const numbers: Array<string> = [];

		const enhancedCharacterictics: Record<string, Array<EnhancedCharacteristic>> | undefined
				  = this.props.userProduct ? this.props.userProduct.enhancedCharacteristics : undefined;

		if (enhancedCharacterictics) {
			Object.keys(enhancedCharacterictics).forEach((key: string) => {
				const singleCharacteristic: Array<EnhancedCharacteristic> = enhancedCharacterictics[key];
				singleCharacteristic.forEach((singleValue: EnhancedCharacteristic) => {
					if (singleValue.value) {
						numbers.push(singleValue.value);
					}
				});
			});
		}

		const maximumNumbers = get(fafInputCharacteristic, "cardinality.max");
		const validationPattern = "\\d*"; // Only numbers allowed

		let summedBalances: number = 0;
		if (productConfigurationInitialization
			&& productConfigurationInitialization.chargingBalances
			&& !isEmpty(productConfigurationInitialization.chargingBalances)) {

			summedBalances = productConfigurationInitialization.chargingBalances
				.reduce<number>((sum: number, current: ChargingBalances) => {
					let result = sum;
					if (current && current.attributes && current.attributes.value) {
						result += current.attributes.value;
					}
					return result;
			}, 0);
		}

		const price = this.getPrice();

		const noPrice: boolean =
			!price || !price.taxFreeAmount || price.taxFreeAmount === 0;

		const hasEnoughBalance: boolean = noPrice || (price.taxFreeAmount && summedBalances > price.taxFreeAmount) || false;

		const priceString: string =
			price &&
			price.currency &&
			this.context.intl.formatNumber(price.taxFreeAmount, {
				style: "currency",
				currency: price.currency,
				minimumFractionDigits: 2
			});

		// Case Add
		const okButton =
			this.state.state === "SHOW_LIST"
				? undefined
				: !hasEnoughBalance ? this.cancel : this.confirm;

		const okButtonLabel =
			this.state.state === "SHOW_LIST" ? null
				: !hasEnoughBalance
				? (<FormattedMessage {...messages.okay} />)
				: this.state.state === "CONFIRM_ADD"
					? (<FormattedMessage {...messages.confirm} />)
					: (<FormattedMessage {...messages.remove} />);

		const handleBack =
			(this.state.state !== "SHOW_LIST" && hasEnoughBalance && this.cancel) || undefined;

		const modalTitle =
			this.state.state === "SHOW_LIST"
				? (<FormattedMessage {...messages.configureFaF} />)
				: this.state.state === "CONFIRM_ADD"
					? (<FormattedMessage {...messages.addNumber} />)
					: (<FormattedMessage {...messages.removeNumberTitle} />);

		// Case "error" ?

		const initializeInProgress = this.state.initializeInProgress;
		const fetchingAgreements = this.state.fetchingAgreements;

		const basketValidationErrors = productConfigurationInitialization
			? productConfigurationInitialization.basketValidationErrors
			: undefined;

		const containsErrors: boolean = !isEmpty(basketValidationErrors);

		return (
			<OcModal
				showModal={true}
				onClose={this.handleClose}
				smallModal={true}
				onBack={handleBack}
				onOk={okButton}
				okButtonLabel={okButtonLabel}
				okDisabled={initializeInProgress || fetchingAgreements}
				hideCloseButton={
					this.state.state !== "SHOW_LIST" ||
					initializeInProgress ||
					fetchingAgreements
				}
				title={modalTitle}
			>
				{this.state.state === "SHOW_LIST" && (
					<FaFNumberList
						numbers={numbers}
						descriptionText={descriptionText}
						maximumNumbers={maximumNumbers}
						addNumber={this.showConfirmAdd}
						removeNumber={this.showConfirmRemove}
						validationPattern={validationPattern}
					/>
				)}
				{(this.state.state === "CONFIRM_REMOVE" || this.state.state === "CONFIRM_ADD") && (
					<FaFConfirmation
						value={this.state.value}
						containsErrors={containsErrors}
						price={!noPrice ? priceString : undefined}
						loadingIndicator={initializeInProgress}
						hasEnoughBalance={hasEnoughBalance}
						addOperation={this.state.state === "CONFIRM_ADD"}
					/>
				)}
			</OcModal>
		);
	}

	private showConfirmRemove = (value: string) => {
		this.setState({
			initializeInProgress: true
		});

		const { individualId, userProduct, actions: { initializeProductConfiguration } } = this.props;
		if (initializeProductConfiguration) {
			initializeProductConfiguration({
				individualId,
				productId: userProduct.id,
				inputtedCharacteristics: {
					manageFaFMember: "Delete," + value
				},
				enhancedCharacteristics: {}
			});
		}
		this.setState({
			state: "CONFIRM_REMOVE",
			value: value
		});
	};

	private showConfirmAdd = (value: string) => {
		this.setState({
			initializeInProgress: true
		});

		const { individualId, userProduct, actions: { initializeProductConfiguration }  } = this.props;
		if (initializeProductConfiguration) {
			initializeProductConfiguration({
				individualId,
				productId: userProduct.id,
				inputtedCharacteristics: {
					manageFaFMember: "Add," + value
				}});
		}
		this.setState({
			state: "CONFIRM_ADD",
			value: value
		});
	};

	private cancel = async () => {
		const { resetProductConfiguration } = this.props.actions;

		if (resetProductConfiguration) {
			await resetProductConfiguration(this.getBasketId());
		}
		this.setState({
			state: "SHOW_LIST"
		});
	};

	private confirm = async () => {
		const {
			actions: {
				submitInitializedProductConfiguration,
				getAgreement
			},
			userProduct
		} = this.props;

		this.setState({
			fetchingAgreements: true
		});

		const basketId: string | undefined = this.getBasketId();
		if (submitInitializedProductConfiguration && basketId) {
			await submitInitializedProductConfiguration(basketId);
		}

		if (getAgreement) {
			await getAgreement((userProduct as any).agreementId);
		}

		this.setState({
			state: "SHOW_LIST",
			fetchingAgreements: false
		});
	};

	private handleClose = () => {
		const { resetProductConfiguration, goBack } = this.props.actions;
		if (resetProductConfiguration) {
			resetProductConfiguration(this.getBasketId(), true);
		}
		goBack();
	};

	private getPrice = (): SimplePrice => {
		const prices: Array<Price> = this.props.productConfigurationInitialization
			? chain(this.props.productConfigurationInitialization)
				.get("resultBasket.attributes.totalPrices")
				.filter((price: Price) => price.type === PriceTypeEnum.ONE_TIME)
				.value()
			: [];

		return ProductOfferingUtil.sumPrices(prices);
	};

	private getBasketId = (): string | undefined => {
		return this.props.productConfigurationInitialization
			? this.props.productConfigurationInitialization.resultBasket.id
			: undefined;
	};
}

export default FaFNumberModal;

export {
	FaFNumberModalStateProps,
	FaFNumberModalActionProps,
	FaFNumberModalOwnProps,
	FaFNumberModalProps,
	FaFNumberModalState,
};
