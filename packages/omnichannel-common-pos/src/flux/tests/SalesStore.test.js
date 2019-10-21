import alt from "../flux";
const Snapshot = require("./SalesStoreSnapshot.json");
const StringifiedSnapshot = JSON.stringify(Snapshot);

describe("SalesStore", () => {
	let flux = alt();

	beforeEach(() => {
		flux.bootstrap(StringifiedSnapshot);
	});

	afterEach(() => {
		flux = new alt();
	});

	it("returns all products if no filters are active", () => {
		expect(flux.stores.SalesStore.state.products.length).toEqual(
			flux.stores.SalesStore.filterProducts().length
		);
	});

	it("filters products based on search", () => {
		// 7 products initially
		expect(flux.stores.SalesStore.state.products.length).toEqual(7);

		flux.actions.SalesActions.handleSearch({ target: { value: "Zony" } });

		// 3 products whose names include string Zony
		expect(flux.stores.SalesStore.filterProducts().length).toEqual(3);

		flux.actions.SalesActions.handleSearch({
			target: { value: "Topkek" }
		});

		// return empty list with topkek search term
		expect(flux.stores.SalesStore.filterProducts().length).toEqual(0);
	});

	it("filters products based on price range", () => {
		// 7 products initially
		expect(flux.stores.SalesStore.state.products.length).toEqual(7);

		flux.actions.SalesActions.handlePriceRangeSlider({
			min: 300,
			max: 595
		});

		//4 products should match this price range
		expect(flux.stores.SalesStore.filterProducts().length).toEqual(4);

		flux.actions.SalesActions.handlePriceRangeSlider({
			min: 594,
			max: 595
		});

		// no products should match this price range
		expect(flux.stores.SalesStore.filterProducts().length).toEqual(0);
	});

	it("filters products based on a single filter", async () => {
		// 7 products initially
		expect(flux.stores.SalesStore.state.products.length).toEqual(7);

		console.log("PRICE RANGE", flux.stores.SalesStore.state.priceRange);

		flux.actions.SalesActions.toggleFilter({
			id: "4701ac4f-7fb5-445f-b2b6-5afaacff2f4f", // filter id from the store snapshot for brands
			filterKey: "Zamzung"
		});

		// 1 product of brand Zamzung should be found
		expect(flux.stores.SalesStore.filterProducts().length).toEqual(1);
	});

	it("filters products based on a multiple filters", () => {
		// 7 products initially
		expect(flux.stores.SalesStore.state.products.length).toEqual(7);

		flux.actions.SalesActions.toggleFilter({
			id: "4701ac4f-7fb5-445f-b2b6-5afaacff2f4f",
			filterKey: "OneMinus"
		});

		flux.actions.SalesActions.toggleFilter({
			id: "ab974891-0d72-4f96-9941-aa867638b9cb",
			filterKey: "64Gb"
		});

		// Expect to find one OneMinus branded product with 64GB of memory
		expect(flux.stores.SalesStore.filterProducts().length).toEqual(1);
	});

	it("it clears filters when controls get hidden", () => {
		flux.actions.SalesActions.toggleFilter({
			id: "4701ac4f-7fb5-445f-b2b6-5afaacff2f4f",
			filterKey: "OneMinus"
		});

		// Expect to find one OneMinus branded product with 64GB of memory
		expect(flux.stores.SalesStore.filterProducts().length).toEqual(2);

		flux.actions.SalesActions.resetFilters();

		expect(flux.stores.SalesStore.filterProducts().length).toEqual(
			flux.stores.SalesStore.state.products.length
		);
	});
});
