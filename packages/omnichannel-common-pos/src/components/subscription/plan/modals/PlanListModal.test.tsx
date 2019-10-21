import * as React from "react";
import { attachWithContext, shallowWithContext } from "../../../../testUtils";
import PlanListModal, { PlanListModalProps } from "./PlanListModal";
import { ProductOffering } from "../../../../redux/types";

describe("PlanListModal", () => {
	const minProps: PlanListModalProps = {
		plans: [
			{
				id: "non-existent-mms-sub",
				name: "Lots of MMS",
			},
			{
				id: "non-existent-sms-sub",
				name: "Lots of SMS",
			}
		] as Array<ProductOffering>,
		actions: {
			handleClose: jest.fn(),
			handleSelect: jest.fn(),
			handleCompare: jest.fn(),
		}
	};
	it("succeeds at shallow mount with min props", () => {
		const wrapper = shallowWithContext(<PlanListModal {...minProps} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with min props", () => {
		attachWithContext(<PlanListModal {...minProps} />);
	});
});
