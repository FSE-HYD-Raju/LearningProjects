import * as React from "react";
import { shallowWithContext } from "../../../testUtils";
import NominationSearchInput from "./NominationSearchInput";
import { NominationType } from "../../../redux";

describe("NominationSearchInput", () => {
	const minimalProps = {
		path: [{ po: "PO_POS_NOMINATION"}],
		posNominationSubscriptionInformation: null,
		nominationPOCharacteristics: {
			numberKey: "CH_NumberResource",
			iccKey: "CH_ICC",
			reservedForKey: "",
		},
		actions: {
			resetConfigurations: jest.fn(),
			nominationSearch: jest.fn(),
		}
	};
	it("should shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(
			<NominationSearchInput {...minimalProps} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("should call search function, when search button is pressed", done => {
		const clickSpy = minimalProps.actions.nominationSearch;
		const wrapper = shallowWithContext(<NominationSearchInput {...minimalProps} />);

		const input = wrapper.find("#nomination-search-input");
		const inputValue = "59177715157";
		input.simulate("change", { target: { value: inputValue } });
		// simulate enter (keycode 13)
		input.simulate("keyPress", { target: { keyCode: "13" } });

		setTimeout(() => {
			expect(clickSpy).toHaveBeenCalledWith(
				inputValue,
				minimalProps.path,
				minimalProps.nominationPOCharacteristics
			);
			done();
		}, 1);
	});

	it("should render subscription information section", () => {
		const nominationSubscriptionInformation = {
				number: "59177715157",
				sim: {
					icc: "123123123123123123"
				},
				productOffering: {
					attributes: {
						name: "Pre Pago Tigo 4g"
					}
				}
		} as any as NominationType;

		const wrapper = shallowWithContext(
			<NominationSearchInput
				{...minimalProps}
				posNominationSubscriptionInformation={nominationSubscriptionInformation}
			/>
		);

		const subscriptionInformation = wrapper.find(".NominationSearchInput-subscription-information-row");
		expect(subscriptionInformation.length).toEqual(3);
	});
});
