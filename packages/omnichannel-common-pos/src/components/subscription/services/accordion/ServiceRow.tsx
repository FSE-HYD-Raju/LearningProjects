import cssns from "../../../../utils/cssnsConfig";
const { React } = cssns("AddonsTabView");
import { LifecycleChangeAction, Service } from "../../../../redux/types";
import { ReactNode, FC } from "react";
import { get, uniqBy } from "lodash";
import ProductServicesUtils from "../ProductServices.utils";
import ServiceTransitionsMessage, { ServiceTransitionsMessageState } from "../ServiceTransitionsMessage";
import FormattedMessage from "../../../../channelUtils/FormattedMessage";
import serviceMessages from "../Services.messages";
import OcButtonWithDropdown from "../../../ocComponents/OcButtonWithDropdown";
import { CommonCustomizationPoints, withCustomization } from "../../../../customization";
import Time from "../../../../channelUtils/Time";
import { OcButton, OcButtonSize, OcButtonType } from "../../../ocComponents";

interface ServiceRowProps {
	addon: Service;
	onClick: (actions: LifecycleChangeAction) => void;
	serviceStateTransitionByActionName: Record<string, Array<string> | string>;
}

const renderActions = (buttons: Array<ReactNode>): ReactNode => {
	if (buttons && buttons.length > 0) {
		if (buttons.length > 1) {
			return (<OcButtonWithDropdown>{buttons}</OcButtonWithDropdown>);
		} else {
			return buttons;
		}
	}
	return null;
};

const ServiceRow: FC<ServiceRowProps> = (props: ServiceRowProps) => {
	const { addon } = props;
	const name = get(addon, "specification.name", "-");
	const validForEndDate = get(addon, "validFor.endDate");
	const expiryDate = validForEndDate ? Time.formatDate(validForEndDate) : "-";

	let actionButtons: Array<ReactNode> = [];
	const service = addon as Service;

	if (service.allowedTransitions && service.allowedTransitions.length > 0) {
		actionButtons = uniqBy(service.allowedTransitions
				.map((action: LifecycleChangeAction): LifecycleChangeAction => {
					return ProductServicesUtils.mapTransitions(action, props.serviceStateTransitionByActionName);
				})
				.filter((action: LifecycleChangeAction) => {
					return action.name;
				}),
			(action: LifecycleChangeAction) => action.name
		).map((action: LifecycleChangeAction): ReactNode => {
			return (
				<OcButton
					id={`buttonStateTransition-${service.id}-${action.id}`}
					key={`buttonStateTransition-${service.id}-${action.id}-key`}
					buttonType={OcButtonType.LINK}
					buttonSize={OcButtonSize.SMALL}
					onClick={() => props.onClick(action)}
				>
					<ServiceTransitionsMessage state={action.name as ServiceTransitionsMessageState}/>
				</OcButton>
			);
		});

	}

	const lifecycleStatus = ProductServicesUtils.getLifecycleStatusMessage(service.lifeCycleStatus);

	return (
		<div className="list-item" id={`addon-item-${addon.id}`} data-customizable>
			<div className="list-item-column name"><span>{name}</span></div>
			<div className="list-item-column fees">
				<span className="customer-subscription-services-free-addon">
					<FormattedMessage {...serviceMessages.freePrice}/>
				</span>
			</div>
			<div className="list-item-column expiration">{expiryDate}</div>
			<div className={`list-item-column status status-${lifecycleStatus.toLowerCase()}`}>
				<FormattedMessage {...serviceMessages.lifecycleStatusRow} values={{ lifecycleStatus }}/>
			</div>
			<div className="list-item-column actions">
				{actionButtons.length > 0 ? (
					renderActions(actionButtons)
				) : (
					<FormattedMessage {...serviceMessages.lifecycleStatusDefaultValue} />
				)}
			</div>
		</div>
	);
};

const ServiceRowCustomization = withCustomization<ServiceRowProps>(CommonCustomizationPoints.SERVICE_ROW, ServiceRow);

export {
	ServiceRowCustomization as ServiceRow,
	ServiceRow as ServiceRowBaseline,
	ServiceRowProps
};
