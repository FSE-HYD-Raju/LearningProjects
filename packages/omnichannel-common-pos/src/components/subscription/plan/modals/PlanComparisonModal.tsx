import * as R from "react";
import classnames from "classnames";
import { get, upperFirst, size } from "lodash";
import cssns from "../../../../utils/cssnsConfig";
import OcModal from "../../../ocComponents/OcModal";
import OcCurrency from "../../../ocComponents/OcCurrency";
import messages from "../Plans.messages";
import { Product, ProductOffering } from "../../../../redux/types";
import FormattedMessage from "../../../../channelUtils/FormattedMessage";
import PlanUtils from "../Plan.utils";
import { PureComponent } from "react";
import { OcButton, OcButtonType } from "../../../ocComponents";

const React = cssns("PlanComparisonModal").React as typeof R;

interface PlanComparisonModalStateProps {
	productOfferings?: Array<ProductOffering>;
	currentPlan?: Product;
	selectedOffering?: ProductOffering | null;
}

interface PlanComparisonModalActionProps {
	actions: {
		switchToPlan: (offering: ProductOffering, current: Product) => void,
		close: () => void,
	};
}

type PlanComparisonModalProps = PlanComparisonModalStateProps & PlanComparisonModalActionProps;

const SEPARATOR: string = " / ";

class PlanComparisonModal extends PureComponent<PlanComparisonModalProps> {

	constructor(props: PlanComparisonModalProps) {
		super(props);
	}

	renderInstanceCharacteristics = (offering: ProductOffering) => {
		const instanceChars = offering.attributes && offering.attributes.instanceCharacteristics;
		if (!instanceChars) {
			return null;
		}
		return Object.keys(instanceChars).map((charName: string) => {
				const ic = instanceChars[charName];
				const {id} = offering;
				return (
					<div key={`instanceCharacteristics-row-${id}`} className="instanceCharacteristics-row">
						<div key={`instanceCharacteristics-name-${id}-${charName}`} className="character character-name">
							{upperFirst(charName)}
						</div>
						<div key={`instanceCharacteristics-value-${id}-${charName}`} className="character character-detail">
							{`${get(ic.values, "[0].value")}`}
						</div>
					</div>
				);
			}
		);
	};

	renderComparables = (comparables: any[], productTypeText: any) => {
		if (!comparables) {
			return null;
		}
		const { currentPlan, selectedOffering } = this.props;

		return comparables.map((offering: ProductOffering) => {
			const name = offering.name || offering.attributes && offering.attributes.name || "";

			const isCurrentPlan = offering.id === currentPlan!.productOfferingId;
			const isComparedPlan = offering.id === (selectedOffering && selectedOffering.id);

			const migrationCost = offering.attributes && offering.attributes.prices
				&& offering.attributes.prices.find(p => p.type === "ONE_TIME");
			const recurringPrice = offering.attributes && offering.attributes.prices
				&& offering.attributes.prices.find(p => p.type === "RECURRENT");

			return (
				<div
					key={`PlanComparisonModal-column-${offering.id}`}
					className={classnames({
						"compared-plan": isComparedPlan,
						"item-container": true
					})}
				>
					<div
						className={classnames({
							"item-compared-plan": isComparedPlan,
							item: true
						})}
					>
						<div
							key={`PlanComparisonModal-tableheader-${offering.id}`}
							className={classnames({
								tableheader: true,
								"current-plan-header": !isComparedPlan,
								"compared-plan-header": isComparedPlan
							})}
						>
							<div className="message-holder">
								<h5>
									{isCurrentPlan ? (
										<FormattedMessage
											{...messages.myCurrentProductType}
											values={{productType: productTypeText}}
										/>
									) : (
										<FormattedMessage
											{...messages.comparedProductType}
											values={{productType: productTypeText}}
										/>
									)}
								</h5>
							</div>
							<div className="message-holder">
								<h4>{name}</h4>
							</div>
						</div>

						<div key={`PlanComparisonModal-offering-prices-${offering.id}`} className="price">
							{migrationCost && (
								<div className="price-holder" key={`PCM-offering-migration-cost-${offering.id}`}>
									<FormattedMessage {...messages.migrationCost}/>
									<OcCurrency
										cost={migrationCost.taxFreeAmount}
										currency={migrationCost.currency}
									/>
								</div>
							)}
							{recurringPrice && (
								<div className="price-holder" key={`PCM-offering-recurring-price-${offering.id}`}>
									<FormattedMessage {...messages.recurringCharge}/>
									<OcCurrency
										cost={recurringPrice.taxFreeAmount}
										currency={recurringPrice.currency}
									/>
									<div className="price-type">
										{SEPARATOR}
										<FormattedMessage {...messages.month}/>
									</div>
								</div>
							)}
						</div>

						<div className="instanceCharacteristics">
							{this.renderInstanceCharacteristics(offering)}
						</div>

						{isComparedPlan && (
							<div key={`buttons-below-plan-${offering.id}`} className="select-offering">
								<OcButton
									buttonType={OcButtonType.SUCCESS}
									id={`buttonSelectOffering-${offering.id}`}
									onClick={() => this.props.actions.switchToPlan(offering, this.props.currentPlan!)}
								>
									<FormattedMessage
										{...messages.switchToThisProductType}
										values={{productType: productTypeText}}
									/>
								</OcButton>
							</div>
						)}
					</div>
				</div>
			);
		}
	);
	};

	render() {
		const { currentPlan, productOfferings, selectedOffering } = this.props;
		if (!currentPlan) {
			return null;
		}

		const productTypeText = (
			<span className="product-type">
				<FormattedMessage {...PlanUtils.getMessage(selectedOffering)} />
			</span>
		);

		const currentPlanOffering = productOfferings && productOfferings.find(po => po.id === currentPlan.productOfferingId);

		const comparables = (currentPlanOffering && selectedOffering && [currentPlanOffering, selectedOffering]) || [];
		const itemCount = size(comparables);

		return (
			<OcModal
				className="comparison"
				title={
					<FormattedMessage
						{...messages.compare}
						values={{productType: productTypeText}}
					/>
				}
				showModal={true}
				largeModal={itemCount <= 3}
				extraLargeModal={itemCount > 3}
				onClose={() => { this.props.actions.close(); }}
				reverseFooter={true}
			>
				<div className="this">
					<div className="container">
						{this.renderComparables(comparables, productTypeText)}
					</div>
				</div>
			</OcModal>
		);
	}
}

export default PlanComparisonModal;
export {
	PlanComparisonModalProps,
	PlanComparisonModalStateProps,
	PlanComparisonModalActionProps,
};
