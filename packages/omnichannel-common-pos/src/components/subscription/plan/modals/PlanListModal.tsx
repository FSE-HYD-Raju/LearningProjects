import * as R from "react";
import cssns from "../../../../utils/cssnsConfig";
import OcModal from "../../../ocComponents/OcModal";
import OcLoadingSpinner from "../../../ocComponents/OcLoadingSpinner";
import OcAccordionList from "../../../ocComponents/OcAccordionList";
import { PureComponent } from "react";
import { injectIntl } from "react-intl";
import messages from "../Plans.messages";
import PlanListItem from "../PlanListItem";
import FormattedMessage, { FormattedMessageDescriptor } from "../../../../channelUtils/FormattedMessage";
import PlanDetails from "../PlanDetails";
import { ProductOffering } from "../../../../redux/types";

const React = cssns("PlanListModal").React as typeof R;

interface PlanListModalProps {
	plans?: Array<ProductOffering>;
	newPlan?: boolean;
	showLoadingIndicator?: boolean;
	errorMessage?: FormattedMessageDescriptor;
	currentSubscriptionTitle?: string;
	actions: {
		handleClose: () => void;
		handleSelect: (plan: ProductOffering) => void;
		handleCompare?: (plan: ProductOffering) => void;
	};
}

interface PlanListModalState {
	activeId: string | null;
}

class PlanListModal extends PureComponent<PlanListModalProps, PlanListModalState> {
	static displayName = "PlanListModal";

	constructor(props: PlanListModalProps) {
		super(props);
		this.state = {
			activeId: null
		};
	}

	togglePlan = (id: string) => {
		this.setState({ activeId: id });
	};

	onClick = (id: string, evt: any, plan: ProductOffering) => {
		const { target } = evt;
		if (target.classList.contains("PlanListItem-item-select")) {
			evt.preventDefault();
			this.props.actions.handleSelect(plan);
		} else {
			this.togglePlan(id);
		}
	};

	render() {
		const {
			showLoadingIndicator,
			currentSubscriptionTitle,
			errorMessage
		} = this.props;

		const title = (
			<span>
				<FormattedMessage
					{...messages.offersForCurrentSubscriptionTitle}
					values={{currentSubscriptionTitle}}
				/>
			</span>
		);

		const plans = this.props.plans || null;

		const containerStyle: any = {};
		if (!plans || plans.length === 0) {
			containerStyle.textAlign = "center";
		}

		return (
			<OcModal
				showModal={true}
				title={title}
				onClose={this.props.actions.handleClose}
				className="modal-container"
			>
				{showLoadingIndicator ? (
					<OcLoadingSpinner loading={true} />
				) : errorMessage ? (
					<div className="container">
						{<FormattedMessage {...errorMessage} />}
					</div>
				) : (
					<div className="container">
						{plans && plans.map(plan => {
								const active = `change-plan-list-${plan.id}` === this.state.activeId;

								return (
									<OcAccordionList
										id={`change-plan-list-${plan.id}`}
										key={"plan_" + plan.id}
										active={active}
										handleClick={(id: string, evt: any) => this.onClick(id, evt, plan)}
										rowContent={
											<PlanListItem
												active={active}
												plan={plan}
												newPlan={this.props.newPlan}
											/>
										}
										expandedContent={
											<PlanDetails
												plan={plan}
												selectToComparison={this.props.actions.handleCompare!}
											/>
										}
										className="plans-list-accordion"
									/>
								);
							})}
						{(!plans || plans.length === 0) && (
							<span>
								<FormattedMessage {...messages.noAlternativeOffers} />
							</span>
						)}
					</div>
				)}
			</OcModal>
		);
	}
}

export default PlanListModal;
export {
	PlanListModalProps,
	PlanListModalState,
};
