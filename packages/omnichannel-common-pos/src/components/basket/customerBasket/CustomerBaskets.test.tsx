import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../../testUtils";
import CustomerBaskets, { CustomerBasketsProps } from "./CustomerBaskets";
import { Basket, User } from "../../../redux/types";
import { CustomerCaseBasket } from "../../../redux/models/customerCase/customerCase.types";
const basketData = require("../../../test-utils/CustomerBasketsTestData");

describe("CustomerBaskets", () => {
	const minProps: CustomerBasketsProps = {
		basketData: [] as any as Array<CustomerCaseBasket>,
		agreements: [],
		activeAgreementId: "",
		activeCustomer: {} as any as User,
		activeBasket: {} as any as Basket,
		configurations: {},
		actions: {
			addProductToBasket: jest.fn(),
			updateBasketItem: jest.fn(),
			discardBasket: jest.fn(),
			showErrorModal: jest.fn(),
			changeCustomerActiveAgreement: jest.fn(),
			getBasket: jest.fn(),
			getBasketIncludeBasketItems: jest.fn(),
			updateOwnerToBasket: jest.fn(),
			endCustomerCase: jest.fn(),
			createNewCustomerCase: jest.fn(),
			clearCustomerBasketsData: jest.fn(),
			cancelAddProduct: jest.fn(),
			historyPush: jest.fn()
		}
	};

	it("succeeds at shallow mount with min props", () => {
		const wrapper = shallowWithContext(<CustomerBaskets {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with min props", () => {
		mountWithContext(<CustomerBaskets {...minProps} />);
	});

	it("renders with minimum props", () => {
		const props = {
			...minProps,
			basketData,
			setBasketToCustomer: () => {}
		};

		mountWithContext(<CustomerBaskets {...props} />);
	});
});
