import * as React from "react";
import ChangeSimReasonSelection, { ChangeSimReasonSelectionProps } from "./ChangeSimReasonSelection";
import { shallowWithContext, mountWithContext, MockDataMaker } from "../../testUtils";

const reasons = [
	MockDataMaker.productOffering.make({ id: "test_id_1", description: "test_description_1" }),
	MockDataMaker.productOffering.make({ id: "test_id_2", description: "test_description_2" })
];

describe("ChangeSimReasonSelection", () => {
	let props: ChangeSimReasonSelectionProps;
	beforeEach(() => {
		props = {
			reasons,
			selectedReason: undefined,
			actions: {
				onSelectReason: jest.fn()
			}
		};
	});

	it("succeeds at shallow mount with minimal props ", () => {
		const wrapper = shallowWithContext(<ChangeSimReasonSelection {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("when reason not selected should be selected empty value", () => {
		const wrapper = mountWithContext(
			<ChangeSimReasonSelection {...{ ...props, ...{ selectedReason: undefined } }} />
		);
		expect(wrapper.find("select").get(0).props.value).toBe("");
		expect(wrapper.find("option")).toHaveLength(3);
	});

	it("when user selects reason should fire actions", () => {
		const wrapper = mountWithContext(
			<ChangeSimReasonSelection {...{ ...props, ...{ selectedReason: undefined } }} />
		);
		wrapper
			.find("option")
			.at(1)
			.simulate("change", { target: { value: reasons[0].id } });
		expect(props.actions.onSelectReason).toBeCalledWith(reasons[0]);
	});
});
