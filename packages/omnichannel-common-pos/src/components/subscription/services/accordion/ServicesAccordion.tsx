import { HasId, LifecycleChangeAction, Service } from "../../../../redux/types";
import cssns from "../../../../utils/cssnsConfig";
import { OcAccordion } from "../../../ocComponents/accordion";
import { PureComponent, ReactElement } from "react";
import { ONLY_ONE_STRATEGY } from "../../../ocComponents/accordion";
import { ServiceItem } from "../../../../redux";
import { ServiceExpandedContent } from "./ServiceExpandedContent";
import { CallForwardingRow } from "./CallForwardingRow";
import CallForwardingExpandedContent from "./CallForwardingExpandedContent";
import { ServiceRow } from "./ServiceRow";
import AddonsTabTableHeaders from "../../AddonsTabTableHeaders";

const { React } = cssns("AddonsTabView");

interface ServicesAccordionProps {
	services: Array<ServiceAccordionItem>;
	serviceStateTransitionByActionName: Record<string, Array<string> | string>;
	callForwardingServices: ServiceItem | undefined;
	onServiceClick: (service: Service, action: LifecycleChangeAction) => void;
	onCallForwardingClick: () => void;
}

interface ServiceAccordionItem extends HasId {
	service?: Service;
	callForwardingServices?: Array<Service>;
}

class ServicesAccordion extends PureComponent<ServicesAccordionProps> {
	headerRendererFunction = (item: ServiceAccordionItem): {header: ReactElement<any>} => {
		let header: ReactElement<any> = <span/>;
		if (item.service) {
			header = (
				<ServiceRow
					addon={item.service}
					serviceStateTransitionByActionName={this.props.serviceStateTransitionByActionName}
					onClick={(action: LifecycleChangeAction) => this.props.onServiceClick(item.service!, action)}
				/>
			);

		} else if (item.callForwardingServices) {
			header = (
				<CallForwardingRow
					callForwardingServices={item.callForwardingServices}
					serviceStateTransitionByActionName={this.props.serviceStateTransitionByActionName}
					onClick={this.props.onCallForwardingClick}
				/>
			);
		}
		return { header: header };
	}

	contentRendererFunction = (item: ServiceAccordionItem): { content: ReactElement<any> } => {
		let content: ReactElement<any> = <span/>;
		if (item.service) {
			content = <ServiceExpandedContent addon={item.service}/>;
		} else if (item.callForwardingServices) {
			content = <CallForwardingExpandedContent/>;
		}
		return { content: content };
	}

	render() {
		return (
			<>
				<AddonsTabTableHeaders />
				<OcAccordion
					expandStrategy={ONLY_ONE_STRATEGY()}
					items={this.props.services}
					headerRendererFunction={this.headerRendererFunction}
					contentRendererFunction={this.contentRendererFunction}
				/>
			</>
		);
	}
}

export {
	ServiceAccordionItem,
	ServicesAccordion,
	ServicesAccordionProps
};
