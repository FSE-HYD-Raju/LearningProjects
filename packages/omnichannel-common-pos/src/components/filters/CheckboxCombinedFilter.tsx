import * as React from "react";
import { get, has } from "lodash";
import { Component } from "react";
import { ProductFilter } from "../../redux/types";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import OcInput from "../ocComponents/OcInput";
import { ContextType, contextTypesValidationMap } from "../../types";
import messages from "./CheckboxFilter.messages";

interface CheckboxCombinedFilterProps {
	filter: ProductFilter;
	combinedFilters: Record<string, ProductFilter>;
	toggleCombinedFilter: (filter: ProductFilter) => void;
}

class CheckboxCombinedFilter extends Component<CheckboxCombinedFilterProps> {
	static contextTypes = contextTypesValidationMap;

	constructor(props: CheckboxCombinedFilterProps, context: ContextType) {
		super(props, context);
	}

	getFilterLabel = (): string => get(this.props.filter, "filterLabel", "");

	getFormattedLabel = (): string => {
		const filterLabel = this.getFilterLabel();
		const msg = (messages as any)[filterLabel];
		return msg ? this.context.intl.formatMessage(msg).defaultMessage : filterLabel;
	};

	isChecked = (): boolean => {
		return has(this.props.combinedFilters, this.getFilterLabel());
	};

	handleChange = () => {
		this.props.toggleCombinedFilter(this.props.filter);
	};

	render() {
		return (
			<div>
				<div className="checkbox-combined-filter">
					{this.getFormattedLabel()}
				</div>
				<div>
					<OcInput
						className="checkbox-combined-filter-input"
						label={
							<FormattedMessage
								{...messages.showOnlyPlans}
								values={{ filterValue: this.getFormattedLabel()}}
							/>
						}
						type="checkbox"
						checked={this.isChecked()}
						onChange={this.handleChange}
						id={`shop-container-filters-show-only-${this.getFilterLabel()}`}
					/>
				</div>
			</div>
		);
	}
}

export default CheckboxCombinedFilter;
export {
	CheckboxCombinedFilterProps
};
