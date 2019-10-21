import * as React from "react";
import { FC, SyntheticEvent } from "react";
import OcInput from "../ocComponents/OcInput";
import { ProductFilter } from "../../redux/types";

interface CheckboxListFilterProps {
	filter: ProductFilter;
	activeFilters?: Array<ProductFilter>;
	toggleFilter: (e: SyntheticEvent<any>, id: string, key: string) => void;
}

const CheckboxListProductFilter: FC<CheckboxListFilterProps> = (props: CheckboxListFilterProps) => {
	const {filter, activeFilters, toggleFilter} = props;
	const filterValues = filter && filter.values || {};

	const renderCheckboxes = (values: Record<string, boolean>) => {
		return Object.keys(values).map((key: string) => {
				const activeFilter = activeFilters && activeFilters.find((aFilter: ProductFilter) => {
					return (aFilter.id === filter.id);
				});
				const value = values[key];

				return (
					<OcInput
						onChange={e => toggleFilter(e, filter.id, key)}
						type="checkbox"
						checked={(activeFilter && activeFilter.values && activeFilter.values[key] === true)}
						key={"CheckboxListFilters-" + value}
						id={"CheckboxListFilters-" + value}
						label={value}
						standalone={true}
					/>
				);
			}
		);
	};

	return (
		<div className="checkbox-list-filter">
			<h5 className="checkbox-list-filter-title">
				{filter && filter.filterLabel}
			</h5>
			<div className="checkbox-list-filter-group">
				{filterValues && renderCheckboxes(filterValues)}
			</div>
		</div>
	);
};

export default CheckboxListProductFilter;
export {
	CheckboxListFilterProps,
};
