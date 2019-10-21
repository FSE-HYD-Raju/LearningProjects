import * as R from "react";
import cssns from "../../../utils/cssnsConfig";
import { OcGridPagination } from "./OcGridPagination";
import OcGridPageDetails from "./OcGridPageDetails";
import { OcGridPaginationActions } from "./OcGridPaginationActions";
const React = cssns("OcGrid").React as typeof R;

const DEFAULT_PAGE_SIZE = 10;

interface OcGridProps<T, S> {
	rowsData: T[];
	pageSize?: number;
	defaultSortingKey?: S;
	defaultSortingAscending?: boolean;
	containerless?: boolean;
}
interface OcGridState<T, S> {
	sortedRowsData: T[];
	currentPageRowsData: T[];
	currentPage: number;
	currentSortingKey: S | undefined;
	sortingAscending: boolean;
}

/**
 * Base class which adds pagination and sorting features to any content returned by renderContent method
 * T - entity of input rowsData list
 * S - enum of sorting keys
 * P - custom props type
 */
abstract class OcGrid<T, S, P = {}> extends R.Component<OcGridProps<T, S> & P, OcGridState<T, S>> implements OcGridPaginationActions {
	protected constructor(props: OcGridProps<T, S> & P) {
		super(props);
		const sortingAscending = props.defaultSortingAscending !== false;
		this.state = {
			currentPageRowsData: [],
			currentPage: 1,
			currentSortingKey: props.defaultSortingKey,
			sortedRowsData: this.getSortedRowsData(props.defaultSortingKey, sortingAscending),
			sortingAscending,
		};
	}

	/**
	 * Implementation required. Renders grid body (table data) based on slice of sorted input rows
	 */
	abstract renderContent(rowsData: T[]): R.ReactNode;

	/**
	 * Optional implementation, only for sorting. Returns cell data prepared for sorting
	 */
	getColumnDataForSorting(rowData: T, sortingKey: S): any {}

	componentDidMount() {
		this.paginateToFirstPage();
	}
	componentDidUpdate(prevProps: OcGridProps<T, S> & P) {
		if (this.props.rowsData !== prevProps.rowsData) {
			const { currentSortingKey, sortingAscending } = this.state;
			this.setSorting(currentSortingKey, sortingAscending);
		}
	}

	render() {
		const body = (
			<>
				{this.renderContent(this.getRowsData())}
				{this.shouldRenderPageDetails() && this.renderPageDetails()}
				{this.shouldRenderPagination() && this.renderPagination()}
			</>
		);
		return this.props.containerless ? body : <div className="this">{body}</div>;
	}

	// Pagination

	renderPagination() {
		const { rowsData } = this.props;
		const { currentPage } = this.state;
		const pageSize = this.getPageSize();
		const pagesCount = Math.ceil(rowsData.length / pageSize);
		return (
			<OcGridPagination
				isFirst={currentPage === 1}
				isLast={currentPage === pagesCount}
				currentPage={currentPage}
				pagesCount={pagesCount}
				paginateToFirstPage={this.paginateToFirstPage}
				paginateToLastPage={this.paginateToLastPage}
				paginateToNextPage={this.paginateToNextPage}
				paginateToPage={this.paginateToPage}
				paginateToPrevPage={this.paginateToPrevPage}
			/>
		);
	}
	renderPageDetails() {
		const { rowsData } = this.props;
		const { currentPage } = this.state;
		const pageSize = this.getPageSize();
		const from = (currentPage - 1) * pageSize + 1;
		const toRow = Math.min(currentPage * pageSize, rowsData.length);
		return <OcGridPageDetails from={from} toRow={toRow} total={rowsData.length} />;
	}
	getPageSize(): number {
		return (this.props as OcGridProps<T, S>).pageSize || DEFAULT_PAGE_SIZE;
	}
	getLastPage(): number {
		const { rowsData } = this.props;
		return Math.ceil(rowsData.length / this.getPageSize());
	}
	getRowsData() {
		return this.state.currentPageRowsData;
	}
	shouldRenderPagination(): boolean {
		return this.props.rowsData.length > this.getPageSize();
	}
	shouldRenderPageDetails(): boolean {
		return this.props.rowsData.length > this.getPageSize();
	}
	getRowsDataAtPage(page: number): T[] {
		const pageSize = this.getPageSize();
		return this.state.sortedRowsData.slice((page - 1) * pageSize, page * pageSize);
	}
	paginateToFirstPage = (): void => {
		this.paginateToPage(1);
	};

	paginateToLastPage = (): void => {
		this.paginateToPage(this.getLastPage());
	};

	paginateToNextPage = (): void => {
		const { currentPage } = this.state;
		if (currentPage !== this.getLastPage()) {
			this.paginateToPage(currentPage + 1);
		}
	};

	paginateToPage = (page: number): void => {
		this.setState({
			currentPage: page,
			currentPageRowsData: this.getRowsDataAtPage(page),
		});
	};

	paginateToPrevPage = (): void => {
		const { currentPage } = this.state;
		if (currentPage !== 1) {
			this.paginateToPage(currentPage - 1);
		}
	};

	// Sorting

	getSortedRowsData(sortingKey: S | undefined, sortingAscending: boolean) {
		const { rowsData } = this.props;
		if (sortingKey === undefined) {
			return [...rowsData];
		}
		return [...rowsData].sort((firstRowData: T, secondRowData: T) => {
			const firstRowDataForSorting = this.getColumnDataForSorting(firstRowData, sortingKey);
			const secondRowDataForSorting = this.getColumnDataForSorting(secondRowData, sortingKey);
			const comparisonResult = firstRowDataForSorting > secondRowDataForSorting ? 1 : firstRowDataForSorting === secondRowDataForSorting ? 0 : -1;
			return sortingAscending ? comparisonResult : comparisonResult * -1;
		});
	}
	setSorting(sortingKey: S | undefined, sortingAscending: boolean) {
		const sortedRowsData = this.getSortedRowsData(sortingKey, sortingAscending);
		this.setState(
			{
				sortedRowsData,
				currentSortingKey: sortingKey,
				sortingAscending,
			},
			this.paginateToFirstPage
		);
	}

	getSortAscendingIcon() {
		return "fa-sort-amount-asc";
	}
	getSortDescendingIcon() {
		return "fa-sort-amount-desc";
	}
	getSortAvailableingIcon() {
		return "fa-wifi";
	}
	renderSortingComponent(sortingKey: S) {
		const { sortingAscending, currentSortingKey } = this.state;
		const isCurrentSortingKey = currentSortingKey === sortingKey;
		const iconClassName = isCurrentSortingKey
			? sortingAscending
				? `${this.getSortAscendingIcon()} sorting`
				: `${this.getSortDescendingIcon()} sorting`
			: `${this.getSortAvailableingIcon()} sorting-available`;
		const isNewSortingAscending = currentSortingKey === undefined || !isCurrentSortingKey ? true : !sortingAscending;
		const nextSortingKey = isCurrentSortingKey && !sortingAscending ? undefined : sortingKey;

		return <i className={`fa ${iconClassName} sorting-icon`} onClick={() => this.setSorting(nextSortingKey, isNewSortingAscending)} />;
	}
}

export { OcGrid, OcGridProps };
