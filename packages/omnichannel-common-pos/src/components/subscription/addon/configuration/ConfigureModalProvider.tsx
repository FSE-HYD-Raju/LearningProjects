import * as React from "react";
import FaFNumberModalContainer from "./faf/FaFNumberModalContainer";
import AddonConfigurationModalContainer from "./AddonConfigurationModalContainer";
import { isEmpty } from "lodash";
import {
	Product,
	ProductOffering,
	Agreement,
} from "../../../../redux";
import { RouteComponentProps, StaticContext } from "react-router";
import ProductUtil from "../../../../utils/product/ProductUtil";
import { AddonUtils } from "../Addon.utils";
import { ContextType, contextTypesValidationMap } from "../../../../types";

interface ConfigureModalProviderStateProps {
	agreements: Array<Agreement>;
	productToConfigure?: ProductOffering;
}

interface ConfigureModalProviderActionProps {
	actions: {
		getProductToConfigure: (servicePo: string) => void;
	};
}

interface ConfigureModalProviderRouteParams {
	agreementId: string;
	productId: string;
	serviceId: string;
	productOfferingId: string;
}

type ConfigureModalProviderProps = ConfigureModalProviderStateProps & ConfigureModalProviderActionProps
	& RouteComponentProps<ConfigureModalProviderRouteParams> & { forCustomer?: boolean };

class ConfigureModalProvider extends React.PureComponent<ConfigureModalProviderProps> {
	static contextTypes: React.ValidationMap<ContextType> = contextTypesValidationMap;

	constructor(props: ConfigureModalProviderProps, context: ContextType) {
		super(props, context);
	}

	componentDidMount() {
		const productOfferingId = this.props.match.params.productOfferingId;
		if (this.props.actions.getProductToConfigure && productOfferingId) {
			this.props.actions.getProductToConfigure(productOfferingId);
		}
	}

	render() {
		const { productToConfigure, agreements, match } = this.props;

		const isFaFAddon = !!AddonUtils.getFaFInputCharacteristics(productToConfigure);

		const productId: string | undefined = match.params.serviceId;
		const showModal = productToConfigure && match.params.productOfferingId === productToConfigure.id;
		const agreementId = match.params.agreementId;
		const activeAgreement: Agreement | undefined = Array.isArray(agreements)
			? agreements.find((agreement: Agreement) => agreement.id === agreementId)
			: undefined;

		let userProduct: Product | undefined;
		if (activeAgreement && !isEmpty(ProductUtil.getProducts(activeAgreement))) {
			const reducer = (sum: Product | undefined, item: Product): Product | undefined => {
				if (sum === item || item.id === productId) {
					return item;
				}

				if (item.childProducts && !isEmpty(item.childProducts)) {
					return item.childProducts.reduce(reducer, undefined);
				}

				return undefined;
			};

			userProduct = ProductUtil.getProducts(activeAgreement).reduce(reducer, undefined);
		}

		if (!showModal) {
			return <span/>;
		}

		return isFaFAddon ? (
			<FaFNumberModalContainer
				flux={this.context.flux}
				userProduct={userProduct as Product}
				serviceId={productId}
				product={productToConfigure}
				forCustomer={this.props.forCustomer}
			/>
		) : (
			<AddonConfigurationModalContainer
				flux={this.context.flux}
				product={productToConfigure}
				productId={productId}
				forCustomer={this.props.forCustomer}
			/>
		);
	}
}

export default ConfigureModalProvider;

export {
	ConfigureModalProviderStateProps,
	ConfigureModalProviderActionProps,
	ConfigureModalProviderProps,
	RouteComponentProps,
	StaticContext
};
