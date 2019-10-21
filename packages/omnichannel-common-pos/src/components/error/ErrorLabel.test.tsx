import * as React from "react";
import { mount, ReactWrapper, shallow } from "enzyme";

import { mountWithContext } from "../../testUtils";

import messages from "../../commonMessages";
import ErrorLabel from "./ErrorLabel";

describe("ErrorLabel", () => {
	it("should succeed at shallow mount without props", () => {
		const wrapper = shallow(<ErrorLabel />);
		expect(wrapper).toMatchSnapshot();
	});

	it("should succeed at deep mount without props", () => {
		mount(<ErrorLabel />);
	});

	it("should show the given message", () => {
		const props = {message: "You just lost all your bases"};
		const wrapper = mountWithContext(<ErrorLabel {...props} />);

		const msgContainer = wrapper.find(".ErrorLabel-label.ErrorLabel-message");

		expect(msgContainer.text()).toEqual(props.message);
	});

	/* loginError | loginEmailError | loginPasswordError | apiErrorInvitationNotFound?
     */
	it("should display the error message assigned to code", () => {
		const props = {
			error: {
				errors: [
					{code: "loginError"},
					{code: "loginEmailError"}
				]
			}
		};

		const wrapper = mountWithContext(<ErrorLabel {...props} />);

		const errorLabelMessages = wrapper.find(".ErrorLabel-message");
		expect(errorLabelMessages.length).toEqual(props.error.errors.length);

		errorLabelMessages.forEach((n: ReactWrapper, idx: number) => {
			const code = props.error.errors[idx].code;
			const origmsg = (messages as any)[code];
			expect(n.text()).toEqual(origmsg.defaultMessage);
		});
	});

	it("should present something when referred message is not found", () => {
		const props = {
			error: {
				errors: [{code: "allBasesLostError"}]
			}
		};

		const wrapper = mountWithContext(<ErrorLabel {...props} />);

		const errorLabelMssages = wrapper.find(".ErrorLabel-label.ErrorLabel-message");

		expect(errorLabelMssages.text()).toEqual(props.error.errors[0].code);

		expect(function () {
			const code = props.error.errors[0].code;
			expect(errorLabelMssages.text()).toEqual((messages as any)[code].defaultMessage);
		}).toThrow(/Cannot read property 'defaultMessage' of undefined/);
	});
});
