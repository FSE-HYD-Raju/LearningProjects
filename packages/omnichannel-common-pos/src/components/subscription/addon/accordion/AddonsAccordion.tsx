import { LifecycleChangeAction, Product, ProductOffering, ApplicationRoute } from "../../../../redux/types";
import cssns from "../../../../utils/cssnsConfig";
import { PureComponent, ReactElement } from "react";
import { OcAccordion, ONLY_ONE_STRATEGY } from "../../../ocComponents/accordion";
import { AddonRow } from "./AddonRow";
import { RouteComponentProps, withRouter } from "react-router";
import { AddonExpandedContent } from "./AddonExpandedContent";
import AddonsTabTableHeaders from "../../AddonsTabTableHeaders";
import { AddonsTabLifecycleFilter } from "../../AddonsTabLifecycleFilter";
import {
	commonDigitalLifeRoutes,
	commonServiceDeskRoutes,
	SubscriptionAddonsRouteParams
} from "../../../../routes/commonRoutesMap";
import { isChannelPos } from "../../../../utils/Channel.utils";

const { React } = cssns("AddonsTabView");

interface AddonsAccordionProps {
	isActive: (item: ProductOffering | Product) => boolean;
	addons: Array<ProductOffering | Product>;
	lifecycleStatus: string;
	showActions: boolean;
	selectAddonForActivation: (addon: ProductOffering) => void;
	stateTransitionByActionName?: Record<string, Array<string> | string>;
	initializeStateTransition: (addon: Product, transition: LifecycleChangeAction) => void;
	onChangeAddon: (addon: Product) => void;
}

class AddonsAccordion extends PureComponent<AddonsAccordionProps & RouteComponentProps<SubscriptionAddonsRouteParams>> {

	handleAddonConfigure = (addon: Product) => {
		const route: ApplicationRoute = isChannelPos()
			? commonServiceDeskRoutes.SERVICE_DESK_PRODUCT_SERVICE_PLAN_CONFIGURE
			: commonDigitalLifeRoutes.DIGITAL_LIFE_PRODUCT_SERVICE_PLAN_CONFIGURE;

		const configurePath = route.createLink({
			...this.props.match.params,
			serviceId: addon.id,
			productOfferingId: addon.productOfferingId
		});
		this.props.history.push(configurePath);
	};

	headerRendererFunction = (item: ProductOffering | Product): {header: ReactElement<any>} => {
		const isActive = this.props.isActive(item);
		const status = this.props.lifecycleStatus === AddonsTabLifecycleFilter.ALL
			? (isActive ? AddonsTabLifecycleFilter.ACTIVE : AddonsTabLifecycleFilter.AVAILABLE)
			: this.props.lifecycleStatus;
		const header = (
			<AddonRow
				isActive={isActive}
				addon={item}
				lifecycleStatus={status}
				showActions={this.props.showActions}
				selectAddonForActivation={this.props.selectAddonForActivation}
				onChangeAddon={this.props.onChangeAddon}
				onConfigureAddon={this.handleAddonConfigure}
				stateTransitionByActionName={this.props.stateTransitionByActionName}
				initializeStateTransition={this.props.initializeStateTransition}
			/>
		);

		return { header: header };
	};

	contentRendererFunction = (item: ProductOffering | Product): { content: ReactElement<any> } => {
		return { content: (<AddonExpandedContent addon={item}/>) };
	};

	render() {
		return (
			<>
				<AddonsTabTableHeaders />
				<OcAccordion
					expandStrategy={ONLY_ONE_STRATEGY()}
					items={this.props.addons}
					headerRendererFunction={this.headerRendererFunction}
					contentRendererFunction={this.contentRendererFunction}
				/>
			</>
		);
	}
}

const AddonsAccordionWithRouter = withRouter(AddonsAccordion);
export {
	AddonsAccordionProps,
	AddonsAccordionWithRouter as AddonsAccordion,
};
