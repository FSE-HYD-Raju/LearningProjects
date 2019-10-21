class GridPaginationUtil {
	static onClickNext = (gridApi: any) => {
		if (gridApi) {
			gridApi.paginationGoToNextPage();
		}
	};

	static onClickGoToPage = (gridApi: any, pageNumber: number) => {
		if (gridApi) {
			gridApi.paginationGoToPage(pageNumber);
		}
	};

	static onClickFirstPage = (gridApi: any) => {
		if (gridApi) {
			gridApi.paginationGoToFirstPage();
		}
	};

	static onClickPrevious = (gridApi: any) => {
		if (gridApi) {
			gridApi.paginationGoToPreviousPage();
		}
	};

	static onClickLastPage = (gridApi: any) => {
		if (gridApi) {
			gridApi.paginationGoToLastPage();
		}
	};

	static getCurrentPage = (gridApi: any): number => {
		if (gridApi) {
			return gridApi.paginationGetCurrentPage() + 1;
		}
		return 0;
	};

	static getFirstGridRow = (gridApi: any): number => {
		if (gridApi) {
			return gridApi.getFirstDisplayedRow() + 1;
		}
		return 0;
	};

	static getLastGridRow = (gridApi: any): number => {
		if (gridApi) {
			return gridApi.getLastDisplayedRow() + 1;
		}
		return 0;
	};

	static isLastPaginationPage = (gridApi: any): boolean => {
		if (gridApi) {
			return gridApi.paginationGetCurrentPage() + 1 === gridApi.paginationGetTotalPages();
		}
		return false;
	};

	static isFirstPaginationPage = (gridApi: any): boolean => {
		if (gridApi) {
			return gridApi.paginationGetCurrentPage() === 0;
		}
		return true;
	};

	static getPaginationPagesNumber = (gridApi: any): number => {
		if (gridApi) {
			return gridApi.paginationGetTotalPages();
		}
		return 0;
	};

}

export default GridPaginationUtil;
