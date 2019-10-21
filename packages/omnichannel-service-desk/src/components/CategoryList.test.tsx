import * as React from "react";
import { TestUtils, shallowWithContext, mountWithContext, mockRouterProps } from "omnichannel-common-pos";
import CategoryList, { CategoryListProps } from "./CategoryList";

describe("CategoryList", () => {
	const context = {
		flux: {
			actions: {
				SalesActions: {
					findProduct: jest.fn(),
					saveBarcode: jest.fn(),
				},
				BasketActions: {
					removeFromBasket: jest.fn(),
					getBasketIncludeBasketItems: jest.fn(),
				},
				CustomerCaseActions: {
					changeCustomerActiveAgreement: jest.fn(),
				},
				DigitalLifeActions: {
					getAgreements: jest.fn(),
				}
			}
		},
		store: TestUtils.mockReduxStore({
			currency: {
				selectedCurrency: "EUR"
			}
		})
	};
	const minProps: CategoryListProps = {
		...mockRouterProps,
		match: {
			...mockRouterProps.match,
			params: {
				category: ""
			}
		},
		actions: {
			updateMainCategories: jest.fn(),
			selectCategoryById: jest.fn(),
			endShoppingForSubscription: jest.fn(),
		},
		locale: "en",
		fetchingProducts: false,
		mainCategories: [],
		addressValidation: {
			status: "",
			address: null
		}
	};

	it("should mount with min props", () => {
		const wrapper = shallowWithContext(<CategoryList {...minProps} />, { context });
		expect(wrapper).toMatchSnapshot();
	});

	it("should render categories", () => {
		const props = {
			...minProps,
			mainCategories: [
				{ id: "awesome_stuff", name: "Awesomeness" },
				{ id: "cool_stuff", name: "Coolsomeness" }
			],
		};
		const wrapper = mountWithContext(<CategoryList {...props} />, { context });
		expect(wrapper.text()).toContain("Awesomeness");
		expect(wrapper.text()).toContain("Coolsomeness");
	});

	it("should render 'Select a category' message when there is no child components", () => {
		const wrapper = mountWithContext(<CategoryList {...minProps} />, { context });
		expect(wrapper.text()).toContain("Select a category");
	});

	it("should call given endShoppingForSubscription and selectCategoryById -functions when category link is clicked", () => {
		const parentAPI = minProps.actions.endShoppingForSubscription;
		const selectCategoryById = minProps.actions.selectCategoryById;
		const props = {
			...minProps,
			mainCategories: [
				{ id: "awesome_stuff", name: "Awesomeness" }
			],
		};

		const wrapper = mountWithContext(<CategoryList {...props} />, { context });
		const linkElement = wrapper.find("#CategoryList-category-awesome_stuff");
		linkElement.hostNodes().simulate("click");
		expect(parentAPI).toHaveBeenCalled();
		expect(selectCategoryById).toHaveBeenCalled();
	});

	it("should update categories when language is changed", () => {
		const parentAPI = minProps.actions.updateMainCategories;
		const props = {
			...minProps,
			locale: "en",
		};
		const wrapper = shallowWithContext(<CategoryList {...props} />, { context });
		const component = wrapper.instance();

		const newProps = {...props, locale: "fi" };
		component.componentWillReceiveProps(newProps);
		expect(parentAPI).toHaveBeenCalled();
	});
});
