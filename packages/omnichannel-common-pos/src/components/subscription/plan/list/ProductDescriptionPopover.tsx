import { ReactNode, PureComponent } from "react";
import { Popover } from "react-bootstrap";
import { FormattedMessage } from "../../../../channelUtils";
import cssns from "../../../../utils/cssnsConfig";
import messages, { default as plansMessages } from "../Plans.messages";
import {
	FilterLabelEnum,
	Product,
} from "../../../../redux/types";
import { UsageCounters, UsageLimits } from "../../../../redux";
import ProductUtil from "../../../../utils/product/ProductUtil";
import PlanUtils from "../Plan.utils";
import UnitOfMeasure from "../../../unitOfMeasure/UnitOfMeasure";

const { React } = cssns("Plans");

interface ProductDescriptionPopoverProps {
	plan: Product;
}

interface ProductDescriptionInfo {
	description: string | undefined;
	region: string | undefined;
	allowances: Array<{usageCounter: UsageCounters, limit: UsageLimits}>;
	recurringFee: { hasPrice: boolean, rate: ReactNode, period: string | undefined };
}

class ProductDescriptionPopover extends PureComponent<ProductDescriptionPopoverProps> {

	public extractDescriptionData(props: ProductDescriptionPopoverProps): ProductDescriptionInfo {
		const { plan } = props;

		return {
			description: ProductUtil.getDetailedDescription(plan),
			region: plan.characteristics ? plan.characteristics[FilterLabelEnum.HOME_ZONE] : undefined,
			allowances: ProductUtil.findUsageLimitsInHierarchy(plan),
			recurringFee: PlanUtils.calculatePlanFee(plan),
		};
	}

	render() {
		const { description, region, allowances, recurringFee } = this.extractDescriptionData(this.props);

		const hasPopoverData = region && (description || allowances || recurringFee.hasPrice);

		if (!hasPopoverData) {
			return (
				<Popover id="no-product-description-popover" className="Plans">
					<FormattedMessage {...plansMessages.noProductDescription}/>
				</Popover>
			);
		}

		return (
			<Popover id="product-description-popover" className="Plans">
				{description && <div className="description-container">{description}</div>}
				<div className="region-container">
					<span className="popover-region-label"><FormattedMessage {...messages.region} /></span>
					<span className="popover-region-value">{region || <FormattedMessage {...messages.regionNotAvailable} />}</span>
				</div>

				<div className="allowances-container">
					<div className="allowances-list">
						<h5><FormattedMessage {...messages.allowances} /></h5>
						{allowances && allowances.map(allowance => {
							const unitOfMeasure = allowance.usageCounter.unitOfMeasure;

							return (
								<div key="allowance" className="popover-main">
									<div className="popover-container">
										<i className="fa fa-wifi" aria-hidden="true"/>
										<div className="popover-label">{allowance.limit.name}</div>
									</div>
									<div className="unit-of-measure">
										<UnitOfMeasure value={allowance.limit.value} unit={unitOfMeasure}/>
									</div>
								</div>
							);
						})}
						{!allowances && (<FormattedMessage {...messages.noAllowanceData}/>)}
					</div>

					<div className="costs-and-validity-list">
						<h5><FormattedMessage {...messages.costsAndValidity} /></h5>
						{recurringFee.hasPrice && (
							<div className="fee-container">
								<div className="popover-label"><FormattedMessage {...messages.recurringFee} /></div>
								<div className="fee-container">
									<FormattedMessage
										{...messages.plansListingRecurringFee}
										values={{
											rate: recurringFee.rate as string,
											period: recurringFee.period
										}}
									/>
								</div>
							</div>
						)}
						{!recurringFee.hasPrice && (<FormattedMessage {...messages.noCostsAndValidityData} />)}
					</div>
				</div>
			</Popover>
		);
	}
}

export {
	ProductDescriptionPopoverProps,
	ProductDescriptionPopover
};
