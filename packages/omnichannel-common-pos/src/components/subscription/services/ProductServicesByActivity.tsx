import CallForwardingConfigurationModalContainer from "./callForwarding/CallForwardingConfigurationModalContainer";
import cssns from "../../../utils/cssnsConfig";
import { Component } from "react";
import {
	CallForwardingServiceModify,
	LifecycleChangeAction,
	Product,
	Service,
	ServiceItem
} from "../../../redux/types";
import { ContextType, contextTypesValidationMap } from "../../../types";
import ServiceStateChangeModalContainer from "./ServiceStateChangeModalContainer";
import ProductServicesUtils from "./ProductServices.utils";
import { ServicesAccordion, ServiceAccordionItem } from "./accordion/ServicesAccordion";
import serviceMessages from "./Services.messages";
import ProductUtil from "../../../utils/product/ProductUtil";
import { AddonsSection } from "../AddonsSection";
import { AddonsTabLifecycleFilter } from "../AddonsTabLifecycleFilter";
import { CommonCustomizationPoints, withCustomization } from "../../../customization";
const { React } = cssns("ProductServicesByActivity");

interface ProductServicesByActivityStateProps {
	serviceStateTransitionByActionName: Record<string, Array<string> | string>;
	callForwardingServices: ServiceItem | undefined;
	callForwardingConfigurationResult?: CallForwardingServiceModify;
	showServiceStatusChangeModal: boolean;
}

interface ProductServicesByActivityOwnProps {
	agreementId: string;
	product: Product;
	lifecycleFilter?: string;
}

interface ProductServicesByActivityActionProps {
	actions: {
		resetCallForwardingConfiguration: () => void;
		initializeStateTransition: (service: Service, transition: LifecycleChangeAction) => void;
	};
}

type ProductServicesByActivityProps = ProductServicesByActivityStateProps & ProductServicesByActivityOwnProps & ProductServicesByActivityActionProps;

interface ProductServicesByActivityState {
	showStateModificationModal: boolean;
	showCallForwardingConfigurationModal: boolean;
}

class ProductServicesByActivity extends Component<ProductServicesByActivityProps, ProductServicesByActivityState> {
	static displayName = "ProductServicesByActivity";
	static contextTypes = contextTypesValidationMap;

	constructor(props: ProductServicesByActivityProps, context: ContextType) {
		super(props, context);

		this.state = {
			showStateModificationModal: false,
			showCallForwardingConfigurationModal: false
		};
	}

	componentWillReceiveProps(newProps: ProductServicesByActivityProps) {
		if (newProps.callForwardingConfigurationResult && !this.props.callForwardingConfigurationResult) {
			this.initializeCallForwardingServiceConfiguration();
		}
	}

	initializeCallForwardingServiceConfiguration = () => {
		this.props.actions.resetCallForwardingConfiguration();
		const { showCallForwardingConfigurationModal } = this.state;
		this.setState({
			showCallForwardingConfigurationModal: !showCallForwardingConfigurationModal
		});
	};

	initializeStateTransition = (service: Service, transition: LifecycleChangeAction) => {
		this.props.actions.initializeStateTransition(service, transition);
	};

	render() {
		const { product } = this.props;

		let services: Array<Service> = ProductServicesUtils.getServicesFromProduct(product);

		services = services.filter(service => service.specification && service.specification.name);

		if (this.props.lifecycleFilter && this.props.lifecycleFilter !== AddonsTabLifecycleFilter.ALL) {
			services = services
				.filter(service => service.lifeCycleStatus && service.lifeCycleStatus.toLowerCase() === this.props.lifecycleFilter!.toLowerCase());
		}

		const callForwardingServices = ProductServicesUtils.findCallforwardingServices(services, this.props.callForwardingServices);

		// filter out call forwarding services out of normal services
		if (this.props.callForwardingServices && this.props.callForwardingServices.values) {
			services = services.filter(
				service => !ProductServicesUtils.isCallforwardingService(service, this.props.callForwardingServices)
			);
		}

		const accordionItems: Array<ServiceAccordionItem> = [];
		services.forEach((service: Service) => {
			accordionItems.push({
				id: service.id,
				service: service
			});
		});

		if (callForwardingServices && callForwardingServices.length > 0) {
			accordionItems.push({
				id: ProductServicesUtils.CF_ID,
				callForwardingServices: callForwardingServices
			});
		}

		return (
			<div className="ProductServicesByActivity">
				{this.props.showServiceStatusChangeModal && (
					<ServiceStateChangeModalContainer
						requirePaymentMethodSelection={false}
						phoneNumber={ProductUtil.getPhoneNumber(this.props.product)}
						requireReasonSelect={true}
					/>
				)}
				<CallForwardingConfigurationModalContainer
					flux={this.context.flux}
					agreementId={this.props.agreementId}
					toggleModal={this.initializeCallForwardingServiceConfiguration}
					showModal={this.state.showCallForwardingConfigurationModal}
					services={callForwardingServices}
				/>
				<div className="content" id={`services-${this.props.agreementId}`}>
					<AddonsSection
						id="product-services"
						activeHeader={serviceMessages.servicesTitle}
						inactiveHeader={serviceMessages.noServicesAvailable}
						hasData={accordionItems.length > 0}
					>
						<ServicesAccordion
							services={accordionItems}
							serviceStateTransitionByActionName={this.props.serviceStateTransitionByActionName}
							callForwardingServices={this.props.callForwardingServices}
							onServiceClick={this.initializeStateTransition}
							onCallForwardingClick={this.initializeCallForwardingServiceConfiguration}
						/>
					</AddonsSection>
				</div>
			</div>
		);
	}
}

export default withCustomization(CommonCustomizationPoints.SERVICES_LIST_CONTENT, ProductServicesByActivity);
export {
	ProductServicesByActivity as ProductServicesByActivityBaseline,
	ProductServicesByActivityOwnProps,
	ProductServicesByActivityActionProps,
	ProductServicesByActivityStateProps,
	ProductServicesByActivityProps,
	ProductServicesByActivityState
};
