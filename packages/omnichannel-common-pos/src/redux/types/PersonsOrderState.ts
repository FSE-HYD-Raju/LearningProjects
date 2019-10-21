export interface PersonsOrderState {
	loadingOrders: boolean;
	activeOrderStatusFilters: Array<string>;
	showingFilters: boolean;
	showingSearchField: boolean;
	searchTerm: string;
}
