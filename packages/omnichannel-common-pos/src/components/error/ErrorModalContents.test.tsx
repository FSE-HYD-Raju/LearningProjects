import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../testUtils";

import ErrorModalContents, { ErrorModalContentsProps } from "./ErrorModalContents";
import { ReactWrapper } from "enzyme";
import IntlContainer from "../../channelUtils/IntlContainer";

describe("ErrorModalContents", () => {

	const context = {
		flux: {actions: {

			}
		}
	};

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(
			<ErrorModalContents error={{link: {route: "", id: ""}}}/>,
			{ context }
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(
			<ErrorModalContents error={{link: {route: "/", id: ""}}}/>,
			{ context }
		);
	});

	it("should display a button in case a link is provided for error", () => {
		const props: ErrorModalContentsProps = {
			error: {
				errors: [{detail: "Error happened that requires user routing to different page", code: 0}],
				status: 500,
				link: {
					id: "test-link",
					class: "modal-link-test",
					route: "/fictive/route",
					message: {
						id: "keyboard-not-responding",
						description: "Keyboard not responding",
						defaultMessage: "Keyboard not responding"
					}
				}
			}
		};

		const wrapper = mountWithContext(<ErrorModalContents {...props} />, {context});
		expect(wrapper.find("Link#test-link")).toHaveLength(1);
	});

	it("should render messages associated to codes", () => {
		const props: ErrorModalContentsProps = {
			error: {
				errors: [
					{code: "apiErrorNotFound"},
					{code: "apiErrorUnauthorized"},
					{code: "fooBar"},
					{code: null}
				]
			}
		};

		const formattedMessages = [
			"The requested resource could not be found.",
			"Authentication is required.",
			/* the next two should appear when no match for api error is not found: */
			"Unexpected error occurred.",
			"Unexpected error occurred."
		];

		const wrapper = mountWithContext(<IntlContainer locale="en"><ErrorModalContents {...props} /></IntlContainer>, {
			context
		});

		const renderedMessages = wrapper.find(".error-row");
		expect(renderedMessages.length).toEqual(props.error!.errors!.length);

		renderedMessages.forEach((n: ReactWrapper, idx: number) => {
			expect(n.text()).toEqual(formattedMessages[idx]);
		});
	});

	it("should render free-form error message when code is unidentified", () => {
		const props: ErrorModalContentsProps = {
			error: {
				errors: [{detail: "yamma yamma yamma yaaamma", code: null}]
			}
		};

		const wrapper = mountWithContext(<ErrorModalContents {...props} />, {context});
		expect(wrapper.find(".error-row").text().toLowerCase()).toEqual(props.error!.errors![0].detail!.toLowerCase());
	});
});
