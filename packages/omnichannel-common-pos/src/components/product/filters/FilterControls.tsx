import * as React from "react";
import OcInput from "../../ocComponents/OcInput";
import { get, debounce } from "lodash";
import CheckboxCombinedFilter from "../../filters/CheckboxCombinedFilter";
import CheckboxListProductFilter from "../../filters/CheckboxListProductFilter";
import classnames from "classnames";
import { ProductFilter, ProductFilterRangeType, DisplayTypeEnum, ProductFilterTypeEnum } from "../../../redux/types";
import { ProductPriceEnum } from "../ProductPriceType";
import messages from "./FilterControls.messages";
import { FormattedMessage, FormattedNumber } from "../../../channelUtils";
import { FilterControlsStateProps, FilterControlsActionProps } from "./FilterControlsContainer";
// This ugly magic is here due to wrong typings for react-input-range, sorry for eyes bleeding
import { default as InputRangeComponent, Range } from "react-input-range";

const InputRange: typeof InputRangeComponent = require("react-input-range");

type FilterControlsProps = FilterControlsStateProps & FilterControlsActionProps;

interface FilterControlsState {
	selectedRange: Record<string, Range>;
}

class FilterControls extends React.PureComponent<FilterControlsProps, FilterControlsState> {

	private updateFilterDebounced = debounce<(value: any) => void>((value: any) => {
			this.props.actions.handlePriceRangeSlider(value);
		},
		100,
		{ trailing: true, leading: false }
	);

	private upateMinutesFilterDebounced = debounce<(value: any) => void>(
		value => {
			this.props.actions.updateMinutesFilterValues(value);
		},
		100,
		{ trailing: true, leading: false }
	);

	constructor(props: FilterControlsProps) {
		super(props);
		this.state = {
			selectedRange: {},
		};
	}

	rangeSliderClassNames = () => {
		return {
			activeTrack: "RangeSlider-input-range__track--active",
			disabledInputRange: "RangeSlider-input-range--disabled",
			inputRange: "RangeSlider-input-range",
			labelContainer: "RangeSlider-input-range__slider-container",
			maxLabel: "RangeSlider-input-range__label--max",
			minLabel: "RangeSlider-input-range__label--min",
			slider: "RangeSlider-input-range__slider",
			sliderContainer: "input-range__slider-container",
			track: "RangeSlider-input-range__track",
			valueLabel: "RangeSlider-input-range__label--valueLabel"
		};
	};

	componentWillMount() {
		this.setState({
			selectedRange: {...this.props.priceRange}
		});
	}

	componentWillReceiveProps(newprops: FilterControlsProps) {
		if (this.props.products !== newprops.products) {
			this.props.actions.updatePriceRange(newprops.products, newprops.onlyFilterUpdated);
		}

		if (!newprops.onlyFilterUpdated) {
			this.setState({
				selectedRange: {...newprops.priceRange}
			});
		}
	}

	handlePriceRangeSlider = (value: any) => {
		const key = this.props.priceType;
		this.setState({
			selectedRange: {
				...this.state.selectedRange,
				[key!]: value
			}
		});

		this.updateFilterDebounced(value);
	};

	handleMinutesRangeSlider = (minutesRange: any) => {
		this.upateMinutesFilterDebounced(minutesRange);
	};

	toggleApplyIncludedMinutesFilter = () => {
		this.props.actions.toggleApplyIncludedMinutesFilter();
	};

	toggleFilter = (e: React.SyntheticEvent<any>, id: string, key: string) => {
		e.preventDefault();
		this.props.actions.toggleFilter({id, filterKey: key});
	};

	renderPriceRangeFilter = (priceRange: any) => {
		const hasUsageRange = false;

		let priceRangeIsLegit = false;
		if (priceRange) {
			priceRangeIsLegit = priceRange.min < priceRange.max;
		}

		const boundariesForPriceRange = this.props.actions.getBoundariesForPriceRange(this.props.products);
		const hasAllPricesRange = boundariesForPriceRange && boundariesForPriceRange.allPrices;
		const hasUpfrontRange = boundariesForPriceRange && boundariesForPriceRange.upfront;
		const hasRecurringRange = boundariesForPriceRange && boundariesForPriceRange.recurring;

		return (
			<div className="b2c-products-filter-price-range">
				<div className="b2c-products-filter-inner-container">
					<OcInput
						label={<FormattedMessage {...messages.allCosts}/>}
						type="radio"
						className="b2c-products-filter-price-range-option"
						checked={this.props.priceType === ProductPriceEnum.ALL_PRICES}
						onChange={() => this.props.actions.switchPriceType(ProductPriceEnum.ALL_PRICES)}
						id="shop-container-filters-all-costs"
					/>
					{hasUpfrontRange && (
						<OcInput
							label={<FormattedMessage {...messages.oneTimeCost}/>}
							type="radio"
							className="b2c-products-filter-price-range-option"
							checked={this.props.priceType === ProductPriceEnum.UPFRONT}
							onChange={() => this.props.actions.switchPriceType(ProductPriceEnum.UPFRONT)}
							id="shop-container-filters-one-time-cost"
						/>
					)}
					{hasRecurringRange && (
						<OcInput
							label={<FormattedMessage {...messages.recurringCost}/>}
							type="radio"
							className="b2c-products-filter-price-range-option"
							checked={this.props.priceType === ProductPriceEnum.RECURRING}
							onChange={() => this.props.actions.switchPriceType(ProductPriceEnum.RECURRING)}
							id="shop-container-filters-recurring-cost"
						/>
					)}
					{hasUsageRange && (
						<OcInput
							label={<FormattedMessage {...messages.usageCost}/>}
							type="radio"
							className="b2c-products-filter-price-range-option"
							checked={this.props.priceType === ProductPriceEnum.USAGE}
							onChange={() => this.props.actions.switchPriceType(ProductPriceEnum.USAGE)}
							id="shop-container-filters-usage-costs"
						/>
					)}
				</div>

				{(hasAllPricesRange || hasUpfrontRange || hasRecurringRange || hasUsageRange) && (
					<div className="b2c-products-filter-price-range-slider-container">
						<InputRange
							maxValue={priceRange.max}
							minValue={priceRange.min}
							value={this.props.priceType ? this.state.selectedRange[this.props.priceType] : 0}
							onChange={this.handlePriceRangeSlider}
							step={1}
							disabled={!priceRangeIsLegit}
							classNames={this.rangeSliderClassNames()}
						/>
						<div
							className={
								classnames("b2c-products-filter-price-range-slider",
								priceRangeIsLegit
									? "b2c-products-filter-price-range-slider-legit"
									: "b2c-products-filter-price-range-slider-nonlegit"
							)}
						>
							<span className="b2c-products-filter-slider-label">
								<FormattedMessage {...messages.from} />
								{" "}
								<span className="b2c-products-filter-slider-label-currency">
									<FormattedNumber
										style="currency"
										currency="EUR"
										value={this.props.priceType && this.state.selectedRange[this.props.priceType] ?
											this.state.selectedRange[this.props.priceType].min : 0}
										minimumFractionDigits={0}
										maximumFractionDigits={0}
									/>
								</span>
							</span>

							<span className="b2c-products-filter-slider-label">
								<FormattedMessage {...messages.to}/>
								{" "}
								<span className="b2c-products-filter-slider-label-currency">
									<FormattedNumber
										style="currency"
										currency="EUR"
										value={this.props.priceType && this.state.selectedRange[this.props.priceType] ?
											this.state.selectedRange[this.props.priceType].max : 0}
										minimumFractionDigits={0}
										maximumFractionDigits={0}
									/>
								</span>
							</span>
						</div>
					</div>
				)}
			</div>
		);
	};

	renderMinutesRangeFilter = () => {
		const { minutesRange, minutesFilterValues } = this.props;
		const minValue = minutesRange!.min;
		const maxValue = minutesRange!.max;
		const currentValues: ProductFilterRangeType = {
			min: get(minutesFilterValues, "min") || minValue,
			max: get(minutesFilterValues, "max") || maxValue
		};

		const currentMin = currentValues.min;
		const currentMax = currentValues.max;

		return (
			<div className="b2c-products-filter-minutes-range">
				<InputRange
					maxValue={maxValue}
					minValue={minValue}
					value={currentValues}
					onChange={this.handleMinutesRangeSlider}
					step={100}
					disabled={!this.props.applyIncludedMinutesFilter}
					classNames={this.rangeSliderClassNames()}
				/>
				<div
					className={classnames(
						"b2c-products-filter-price-range-slider",
						"b2c-products-filter-price-range-slider-legit"
					)}
				>
					<span className="b2c-products-filter-slider-label">
						<FormattedMessage {...messages.fromMin} />
						<span className="b2c-products-filter-slider-label-currency">
							<span>{currentMin}</span>
							<FormattedMessage {...messages.min} />
						</span>
					</span>
					<span className="b2c-products-filter-slider-label">
						<FormattedMessage {...messages.inputRangeMaxLabel} />
						<span className="b2c-products-filter-slider-label-currency">
							<span>{currentMax}</span>
							<FormattedMessage {...messages.toMin} />
						</span>
					</span>
				</div>
			</div>
		);
	};

	renderFilterControls = (filter: ProductFilter, priceRange: ProductFilterRangeType | undefined, activeFilters: Array<ProductFilter>): React.ReactNode => {
		if (!priceRange && !filter) {
			return null;
		}
		// RND-12950-vesak: let's hide usage for now until we know how to show usage prices
		// const hasUsageRange = this.props.getBoundariesForPriceRange(
		// 	(this.props.products: Array<ProductOffering | ProductOfferingGroup>)
		// )["usage"];

		return (
			<div
				key={filter.type + filter.id}
				className="b2c-products-filter-container"
			>
				<span className="b2c-products-filter-title">
					{(filter.filterLabel === "price-range" && (
						<span>
							<FormattedMessage {...messages.priceRange}/>
						</span>
					)) ||
						(filter.filterLabel === "voice" && (
							<div>
								<OcInput
									className="b2c-products-filter-voice"
									label={
										<span className="b2c-products-filter-title">
											<FormattedMessage {...messages.includedMinutes}/>
										</span>
									}
									type="checkbox"
									checked={this.props.applyIncludedMinutesFilter}
									onChange={this.toggleApplyIncludedMinutesFilter}
									id="shop-container-filters-apply-included-minutes"
								/>
							</div>
						))}
				</span>
				{filter.type === "price-range" && priceRange && this.renderPriceRangeFilter(priceRange)}
				{filter.filterLabel === "voice" && this.renderMinutesRangeFilter()}

				{filter.displayType === DisplayTypeEnum.DROPDOWN && (
					<CheckboxListProductFilter
						toggleFilter={this.toggleFilter}
						filter={filter}
						activeFilters={activeFilters}
					/>
				)}
				{filter.displayType === DisplayTypeEnum.COMBINED_CHECKBOX && (
					<CheckboxCombinedFilter
						toggleCombinedFilter={this.props.actions.toggleCombinedFilter}
						filter={filter}
						combinedFilters={this.props.combinedFilters}
					/>
				)}
			</div>
		);
	};

	render() {
		const { filters, products, activeFilters, priceType } = this.props;
		const priceRange = this.props.actions.getBoundariesForPriceRange(products);
		const rangeForType: ProductFilterRangeType | undefined = priceType && priceRange && priceRange[priceType];

		const priceFilter = filters && filters.find(filter => filter.type === ProductFilterTypeEnum.PRICE_RANGE);

		return (
			<div>
				<div className="b2c-products-filter-main">
					{priceFilter && rangeForType && this.renderFilterControls(priceFilter, rangeForType, activeFilters)}
					{filters && filters.length > 0 && filters.filter(filter => filter.type !== ProductFilterTypeEnum.PRICE_RANGE)
							.map(filter => {
								return this.renderFilterControls(filter, rangeForType, activeFilters);
							})}
				</div>
			</div>
		);
	}
}

export default FilterControls;
export {
	FilterControlsProps,
	FilterControlsState,
};
