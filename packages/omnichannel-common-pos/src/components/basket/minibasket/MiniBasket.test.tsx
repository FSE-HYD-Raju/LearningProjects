import * as React from "react";
import { mountWithContext, shallowWithContext, TestUtils } from "../../../testUtils";
import { BasketItem, Price } from "../../../redux/types";
import MiniBasket, { MiniBasketProps } from "./MiniBasket";
import { ReactWrapper } from "enzyme";
import { MiniBasketErrorType } from "../../../redux/models/basketError/basketError.types";

describe("MiniBasket", () => {
	const props: MiniBasketProps = {
		basketItems: [] as any as Array<BasketItem>,
		miniBasketErrors: [] as any as  Array<MiniBasketErrorType>,
		referenceNumber: "",
		activeBasketId: "id",
		basketLifeCycleStatusOpen: false,
		upfrontCost: {} as any as Price,
		monthlyCost: {} as any as Price,
		actions: {
			discardBasket: jest.fn(),
			removeFromBasket: jest.fn(),
			removeBasketErrors: jest.fn(),
			resetAddressWithBasketItemIdEntries: jest.fn()
		}
	};

	const context: any = {
		flux: {
			stores: {
				UserStore: {},
				BasketStore: {},
				DigitalLifeStore: {},
				POSCheckoutStore: {},
			},
			actions: {
				BasketActions: {},
				POSCheckoutActions: {
					setPOSDeliveryType: {
						defer: (data: any) => {
							window.console.log("MOCKED POSCheckoutActions.setPOSDeliveryType():", data);
						}
					}
				},
				CustomerCaseActions: {
					changeCustomerActiveAgreement: jest.fn(),
				},
				DigitalLifeActions: {
					getAgreement: jest.fn(),
				}
			}
		}
	};
	context.store = TestUtils.mockReduxStore({
		currency: {selectedCurreny: ""}
	});

	it("succeeds at shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(<MiniBasket {...props} />, {
			context
		});
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at full mount with minimal props", () => {
		mountWithContext(<MiniBasket {...props} />, { context });
	});

	it("renders into html with minimal props", () => {
		const wrapper = mountWithContext(<MiniBasket {...props} />, {
			context
		});

		expect(wrapper.text().toLowerCase()).toContain(
			"for agreement".toLowerCase()
		);

		expect(wrapper.text().toLowerCase()).toContain(
			"basket is empty".toLowerCase()
		);
	});

	function returnFirstMatchingNode(wrapper: ReactWrapper, fnMatch: Function) {
		let found = null;

		for (let i = 0; i < wrapper.length; ++i) {
			found = fnMatch(wrapper.at(i));

			if (found) {
				break;
			}
		}
		return found;
	}

	it("renders the basket items even if the product is undefined", () => {
		const referenceNumber = "1234-5678-aybabtu";
		const wrapper = mountWithContext(
			<MiniBasket
				{...props}
				referenceNumber={referenceNumber}
			/>, { context });

		const miniBasket = wrapper.find(".MiniBasket");
		expect(miniBasket.hostNodes()).toHaveLength(1);
	});

	it("renders reference number in header (basket items required)", () => {
		const referenceNumber = "1234-5678-aybabtu";
		const newBasketItems = [
			{
				attributes: {
					product: {
						id: "foo",
						name: "Zamzung Anarchy 6",
						price1: 1000,
						price2: 100,
						currency: "EUR"
					}
				}
			}
		] as any as Array<BasketItem>;
		const wrapper = mountWithContext(
			<MiniBasket
				{...props}
				referenceNumber={referenceNumber}
				basketItems={newBasketItems}
			/>,
			{ context }
		);

		const miniBasket = wrapper.find(".MiniBasket");
		expect(miniBasket.hostNodes()).toHaveLength(1);

		const hReferenceNumber = miniBasket.find(
			".MiniBasket-reference-number"
		);
		expect(hReferenceNumber.hostNodes()).toHaveLength(1);
		expect(hReferenceNumber.text().toLowerCase()).toContain(referenceNumber.toLowerCase());
	});

	it("does not display the VAT row when VAT rate is not given", () => {
		const wrapper = mountWithContext(<MiniBasket {...props} />, {
			context
		});
		expect(wrapper.find(".MiniBasket").hostNodes()).toHaveLength(1);

		const rVAT = wrapper.find(".MiniBasket-basket-row.MiniBasket-basket-vat");
		expect(rVAT.length).toEqual(0);
	});

	it("does not render 'Go to checkout' button if basket error", () => {
		const basketErrors = [{
			productName: "A bundle of accessories",
			errorId: "4dda4cfb-f3bf-4ebb-a015-77cb8cd8e119",
			error: {
				status: 500,
				code: "500",
				message: "You need to add another product.",
				title: "Unresolved relation"
			}
		}] as any as Array<MiniBasketErrorType>;
		const referenceNumber: string = "1234-5678-aybabtu";
		const newBasketItems = [
			{
				attributes: {
					product: {
						id: "foo",
						name: "Zamzung Anarchy 6",
						price1: 1000,
						price2: 100,
						currency: "EUR"
					}
				}
			}
		] as any as Array<BasketItem>;
		const wrapper = mountWithContext(
			<MiniBasket
				{...props}
				referenceNumber={referenceNumber}
				basketItems={newBasketItems}
				miniBasketErrors={basketErrors}
			/>,
			{ context }
		);
		const goToCheckoutButton = wrapper.find("#minibasket-go-to-checkout-button");
		expect(goToCheckoutButton.hostNodes()).toHaveLength(0);
	});
});
