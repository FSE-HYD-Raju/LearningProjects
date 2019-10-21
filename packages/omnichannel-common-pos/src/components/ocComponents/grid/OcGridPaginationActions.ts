interface OcGridPaginationActions {
	paginateToNextPage(): void;
	paginateToPrevPage(): void;
	paginateToFirstPage(): void;
	paginateToLastPage(): void;
	paginateToPage(page: number): void;
}
export { OcGridPaginationActions };
