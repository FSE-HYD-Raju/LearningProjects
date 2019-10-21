import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../testUtils";
import FormattedMessage, { FormattedMessageDescriptor } from "../FormattedMessage";

describe("FormattedMessage", () => {

	const message: FormattedMessageDescriptor = {
		id: "test-message",
		description: "test message",
		defaultMessage: "Test Message"
	};

	it("succeeds at shallow mount with correct message passed", () => {
		const wrapper = shallowWithContext(<FormattedMessage {...message} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with with correct message passed", () => {
		mountWithContext(<FormattedMessage {...message} />);
	});

	it("renders proper custom class name if it is passed", () => {
		const wrapper = mountWithContext(<FormattedMessage className="test-class" {...message} />);
		expect(wrapper.find(".test-class").hostNodes()).toHaveLength(1);
	});

	it("works correctly with custom callback function", () => {
		const wrapper = mountWithContext(<FormattedMessage {...message}>
			{(txt) => (
				<h2>
					{txt}
				</h2>
			)}
		</FormattedMessage>);
		expect(wrapper.find("h2").hostNodes()).toHaveLength(1);
	});

	it("renders '<span>' regardless of a custom callback function passed if className is applied", () => {
		const wrapper = mountWithContext(<FormattedMessage className="test-class" {...message}>
			{(txt) => (
				<h2>
					{txt}
				</h2>
			)}
		</FormattedMessage>);
		expect(wrapper.find("span").hostNodes()).toHaveLength(1);
		expect(wrapper.find("h2").hostNodes()).toHaveLength(0);
	});
});
