import * as React from "react";
import ProductOfferingUtil from "../../../utils/ProductOfferingUtil";
import { get } from "lodash";
import {
	Configurations,
	ProductOffering,
	MsisdnConfiguration,
	MsisdnConfig,
	HocResult,
} from "../../../redux/types";
import MsisdnConfigurationUtils from "./utils/msisdnConfiguration.utils";

// list of required properties for HOC
interface MsisdnConfigurationRequiredProps {
	product?: ProductOffering;
	configurations?: Configurations;
	activeAgreementId?: string;
}

interface MsisdnConfigurationProviderState {
	msisdnModalVisible: boolean;
	userOpened: boolean;
}

interface MsisdnConfigurationAddedProps extends MsisdnConfigurationProviderState {
	toggleMsisdnModal: (visibility: boolean, userOpened?: boolean) => void;
	productNeedsMsisdnConfiguration: boolean;
	msisdnConfig: MsisdnConfig;
}

type MsisdnConfigurationProps = MsisdnConfigurationRequiredProps & MsisdnConfigurationAddedProps;

// resulting type with all properties from T except ones that provided by HOC
type MsisdnConfigurationProviderProps<T extends MsisdnConfigurationRequiredProps = MsisdnConfigurationProps> =
	HocResult<MsisdnConfigurationRequiredProps, T, MsisdnConfigurationAddedProps>;

/**
 * Wrapped component: React.ComponentType<T> - T is a full list of properties of wrapped component
 *
 * @param {React.ComponentType<T extends Pick<MsisdnConfigurationProps, MsisdnConfigurationRequiredProps>>} Wrapped
 * @returns {React.ComponentType<MsisdnConfigurationProviderProps<T extends Pick<MsisdnConfigurationProps, MsisdnConfigurationRequiredProps>>>}
 * @constructor
 */
function withMsisdnConfiguration<T extends MsisdnConfigurationRequiredProps>(Wrapped: React.ComponentType<T>):
	React.ComponentType<MsisdnConfigurationProviderProps<T>> {

	return class StatefulMsisdnConfigurationProvider extends React.Component<MsisdnConfigurationProviderProps<T>, MsisdnConfigurationProviderState> {
		static displayName: string = `withMsisdnConfiguration.${get(Wrapped, "displayName", "")}`;

		constructor(props: MsisdnConfigurationProviderProps<T>) {
			super(props);

			this.state = {
				msisdnModalVisible: false,
				userOpened: false // User explicitly opened the msisdn modal, don't add product to basket upon close if true
			};
		}

		toggleMsisdnModal = (visibility: boolean, userOpened: boolean = false) => {
			if (this.state.msisdnModalVisible !== visibility) {
				this.setState({
					msisdnModalVisible: visibility,
					userOpened
				});
			}
		};

		render() {
			const { product, configurations } = this.props as MsisdnConfigurationRequiredProps;

			const configuredProduct: ProductOffering | undefined = ProductOfferingUtil.mergeConfigurations<ProductOffering>(product, configurations);

			const mandatoryConfigurations: Array<MsisdnConfiguration> = [];
			MsisdnConfigurationUtils.productNeedsMsisdnConfiguration(configuredProduct, mandatoryConfigurations);

			const msisdnConfig = {
				mandatoryConfigurations
			};

			const isProductNeedsMsisdnConfiguration = mandatoryConfigurations.length > 0;

			// hack for spreading generic types https://github.com/Microsoft/TypeScript/issues/13557
			const ownProps = this.props as object;

			const componentProps: MsisdnConfigurationProps & T = {
				...ownProps,
				...this.state,
				product: configuredProduct,
				productNeedsMsisdnConfiguration: isProductNeedsMsisdnConfiguration,
				toggleMsisdnModal: this.toggleMsisdnModal,
				msisdnConfig: msisdnConfig
			} as MsisdnConfigurationProps & T;

			return (
				<Wrapped {...componentProps} />
			);
		}
	};
}

export {
	withMsisdnConfiguration,
	MsisdnConfigurationProviderProps,
	MsisdnConfigurationProviderState,
	MsisdnConfigurationProps,
	MsisdnConfigurationRequiredProps,
	MsisdnConfigurationAddedProps,
};
