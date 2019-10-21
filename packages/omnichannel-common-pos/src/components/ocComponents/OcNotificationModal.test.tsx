import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../testUtils";

import OcNotificationModal, { OcNotificationModalProps } from "./OcNotificationModal";

describe("OcNotificationModal", () => {
	let minimumProps: OcNotificationModalProps;

	beforeEach(() => {
		minimumProps = {
			status: "CANCELED",
			onClose: () => {},
			show: true
		};
	});

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(
			<OcNotificationModal {...minimumProps} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<OcNotificationModal {...minimumProps} />);
	});
});
