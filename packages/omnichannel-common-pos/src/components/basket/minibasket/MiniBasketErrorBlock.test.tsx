import * as React from "react";
import MiniBasketErrorBlock, { MiniBasketErrorProps } from "./MiniBasketErrorBlock";
import { MiniBasketErrorType } from "../../../redux/models/basketError/basketError.types";
import { mountWithContext, shallowWithContext } from "../../../testUtils";

describe("MiniBasketErrorBlock", () => {

	const props: MiniBasketErrorProps = {
		basketErrorList: [] as any as Array<MiniBasketErrorType>,
		actions: {
			removeBasketError: jest.fn()
		}
	};

	it("succeeds at shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(<MiniBasketErrorBlock {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimal props", () => {
		mountWithContext(<MiniBasketErrorBlock {...props} />);
	});

	it("renders errors when basketErrorList is not empty", () => {
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
		const wrapper = mountWithContext(
			<MiniBasketErrorBlock
				{...props}
				basketErrorList={basketErrors}
			/>,
		);
		const miniBasket = wrapper.find(".MiniBasketErrorBlock");
		expect(miniBasket.hostNodes()).toHaveLength(1);

		wrapper.find(".MiniBasketErrorBlock-icon-info").hostNodes().simulate("click");
		const errorRecord = wrapper.find("#basketError-tooltip-4dda4cfb-f3bf-4ebb-a015-77cb8cd8e119");
		expect(errorRecord).toHaveLength(1);
		expect(errorRecord.text().toLowerCase()).toContain(basketErrors[0].productName.toLowerCase());
	});

	it("it should not render MiniBasketError block when there is no errors", () => {
		const basketErrors = [] as any as Array<MiniBasketErrorType>;
		const wrapper = mountWithContext(
			<MiniBasketErrorBlock
				{...props}
				basketErrorList={basketErrors}
			/>,
		);
		const miniBasket = wrapper.find(".MiniBasketErrorBlock");
		expect(miniBasket.hostNodes()).toHaveLength(0);
	});
});
