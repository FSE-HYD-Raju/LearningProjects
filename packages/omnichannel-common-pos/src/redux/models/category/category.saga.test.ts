import { CategoryActions } from "../../actions";
import actions from "../../actions";
import CategoryService from "../../services/CategoryService";
import { categorySaga } from "./category.saga";
const SagaTester = require("redux-saga-tester").default;

describe("category.saga", () => {
	const originalFetchCategories = CategoryService.fetchCategories;
	let sagaTester: any = null;
	const testData = [
		{id: "mobile_phones", name: "Mobile phones"},
		{id: "plans", name: "Plans"},
		{id: "accessories", name: "Accessories"}
	];

	beforeAll(() => {
		CategoryService.fetchCategories = jest.fn().mockReturnValue(testData);
	});

	afterAll(() => {
		CategoryService.fetchCategories = originalFetchCategories;
	});

	beforeEach(() => {
		sagaTester = new SagaTester({});
		sagaTester.start(categorySaga);
	});

	it("should load categories when called", async () => {
		sagaTester.dispatch(actions.category.updateMainCategories());

		await sagaTester.waitFor(CategoryActions.UPDATE_MAIN_CATEGORIES_COMPLETE);

		const calledAcion = sagaTester.getLatestCalledAction();
		expect(calledAcion).toEqual(actions.category.updateMainCategoriesComplete(testData));
		expect(CategoryService.fetchCategories).toHaveBeenCalledTimes(1);
	});

	it ("should clear categories if call fails", async () => {
		CategoryService.fetchCategories = jest.fn().mockImplementationOnce(() => {
			throw new Error("ERROR");
		});

		sagaTester.dispatch(actions.category.updateMainCategories());

		await sagaTester.waitFor(CategoryActions.UPDATE_MAIN_CATEGORIES_COMPLETE);

		const calledAcion = sagaTester.getLatestCalledAction();
		expect(calledAcion).toEqual(actions.category.updateMainCategoriesComplete([]));
		expect(CategoryService.fetchCategories).toHaveBeenCalledTimes(1);
	});
});
