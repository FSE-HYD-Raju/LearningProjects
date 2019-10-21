import PropTypes from "prop-types";
import React from "react";
import { IntlProvider, intlShape } from "react-intl";
import _ from "lodash";
import toJson from "enzyme-to-json";
import {
	attachWithContext,
	mountWithContext,
	shallowWithContext
} from "../../src/testUtils";
const intlProvider = new IntlProvider({ locale: "en" }, {});
const { intl } = intlProvider.getChildContext();

const MyComponent = (props, context) => {
	return (
		<div className="MyComponent">
			<input
				id="passContext"
				type="button"
				onClick={() => {
					props.passContext(context);
				}}
			/>
		</div>
	);
};

MyComponent.propTypes = {
	passContext: PropTypes.func
};

MyComponent.contextTypes = {
	flux: PropTypes.object,
	intl: intlShape,
	location: PropTypes.object,
	only: PropTypes.object,
	skip: PropTypes.object
};

const reFailedContextType = /Warning: (Failed context type: Required context `(.+)` was not specified in .*)/;
const reFailedContextTypeFromReactClass = /Warning: ReactClass: child context type `(.+)` is invalid; it must be (.+), usually from React\.PropTypes/;

describe("shallowWithContext", () => {
	it("should render .MyComponent", () => {
		const wrapper = shallowWithContext(<MyComponent />);
		expect(wrapper.find(".MyComponent").length).toEqual(
			1,
			".MyComponent not found or there were more than one"
		);
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it("should provide a whole and flawless context to component", () => {
		const errorSpy = jest.spyOn(console, "error");

		const wrapper = shallowWithContext(
			<MyComponent
				passContext={componentContext => {
					const dataFromSpy = _.cloneDeep(errorSpy);
					errorSpy.mockRestore();

					/* the point in checking the calls of console.error()
	                 * is to find any error messages of failed context types.
	                 */
					dataFromSpy.mock.calls.forEach(call => {
						const argv = call.arguments;
						if (argv.length === 0) {
							return;
						}

						if (typeof argv[0] === "string") {
							const resultFailedContextType = argv[0].match(
								reFailedContextType
							);
							const resultFailedContextTypeFromReactClass = argv[0].match(
								reFailedContextTypeFromReactClass
							);

							if (resultFailedContextType) {
								throw new Error(resultFailedContextType[1]);
							} else if (resultFailedContextTypeFromReactClass) {
								const key =
									resultFailedContextTypeFromReactClass[1];
								const type =
									resultFailedContextTypeFromReactClass[2];
								throw new Error(key + " should be " + type);
							} else {
								console.error(argv[0]);
							}
						} else if (typeof argv[0] === "object") {
							if (argv[0] instanceof Error) {
								throw argv[0];
							}
						}
					});

					const missing = _.difference(
						["flux", "location", "intl"],
						Object.keys(componentContext)
					);
					expect(missing.length).toEqual(
						0,
						"Key(s) " +
							missing.join(",") +
							" are missing from context"
					);

					expect(typeof componentContext.flux).toEqual(
						"object",
						"context.flux is not an object"
					);

					// expect(typeof componentContext.history).toEqual(typeof history, "type of context.history is " +
					// typeof componentContext.history + ", should be " + typeof history);
					// expect(componentContext.history).toEqual(history, "contents of context.history do not meet expectations");

					expect(typeof componentContext.intl).toEqual(
						typeof intl,
						"type of context.intl is " +
							typeof componentContext.intl +
							", should be " +
							typeof intl
					);
					expect(toJson(componentContext.intl)).toEqual(
						toJson(intl),
						"contents of context.intl do not meet expectations"
					);

					expect(typeof componentContext.location).toEqual(
						"object",
						"context.location is not an object"
					);
				}}
			/>
		);

		wrapper.find("#passContext").simulate("click");

		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it("should pass custom context to the component to test", () => {
		const context = { foo: "bar" };

		const props = {
			passContext: givenContext => {
				expect(givenContext).toContain(context);
			}
		};

		const wrapper = shallowWithContext(<MyComponent {...props} />, {
			context
		});

		expect(toJson(wrapper)).toMatchSnapshot();
	});
});

describe("mountWithContext", () => {
	it("should render .MyComponent", () => {
		const wrapper = mountWithContext(<MyComponent />);
		expect(wrapper.find(".MyComponent").length).toEqual(
			1,
			".MyComponent not found or there were more than one"
		);
	});

	/* "whole and flawless" == equal to contextTypes.js in the common package. */
	it("should provide a whole and flawless context to component", () => {
		const errorSpy = jest.spyOn(console, "error");

		const wrapper = mountWithContext(
			<MyComponent
				passContext={componentContext => {
					const dataFromSpy = _.cloneDeep(errorSpy);
					errorSpy.mockRestore();

					/* the point in checking the calls of console.error()
	                 * is to find any error messages of failed context types.
	                 */
					dataFromSpy.mock.calls.forEach(call => {
						const argv = call.arguments;
						if (argv.length === 0) {
							return;
						}

						if (typeof argv[0] === "string") {
							const resultFailedContextType = argv[0].match(
								reFailedContextType
							);
							const resultFailedContextTypeFromReactClass = argv[0].match(
								reFailedContextTypeFromReactClass
							);

							if (resultFailedContextType) {
								throw new Error(resultFailedContextType[1]);
							} else if (resultFailedContextTypeFromReactClass) {
								const key =
									resultFailedContextTypeFromReactClass[1];
								const type =
									resultFailedContextTypeFromReactClass[2];
								throw new Error(key + " should be " + type);
							} else {
								console.error(argv[0]);
							}
						} else if (typeof argv[0] === "object") {
							if (argv[0] instanceof Error) {
								throw argv[0];
							}
						}
					});

					const missing = _.difference(
						["flux", "intl", "location", "only", "skip"],
						Object.keys(componentContext)
					);
					expect(missing.length).toEqual(
						0,
						"Key(s) " +
							missing.join(",") +
							" are missing from context"
					);

					expect(typeof componentContext.flux).toEqual(
						"object",
						"context.flux is not an object"
					);

					// expect(typeof componentContext.history).toEqual(typeof history, "type of context.history is " + typeof componentContext.history +
					// ", should be " + typeof history);
					// expect(componentContext.history).toEqual(history, "contents of context.history do not meet expectations");

					expect(typeof componentContext.intl).toEqual(
						typeof intl,
						"type of context.intl is " +
							typeof componentContext.intl +
							", should be " +
							typeof intl
					);
					expect(toJson(componentContext.intl)).toEqual(
						toJson(intl),
						"contents of context.intl do not meet expectations"
					);

					expect(typeof componentContext.location).toEqual(
						"object",
						"context.location is not an object"
					);

					expect(typeof componentContext.only).toEqual(
						"object",
						"context.only is not an object"
					);

					expect(typeof componentContext.skip).toEqual(
						"object",
						"context.skip is not an object"
					);
				}}
			/>
		);

		wrapper.find("#passContext").simulate("click");
	});

	it("should pass custom context to the component to test", () => {
		const context = { flux: { stores: {} } };

		const props = {
			passContext: givenContext => {
				expect(givenContext).toContain(context);
			}
		};

		mountWithContext(<MyComponent {...props} />, {
			context
		});
	});
});

describe("attachWithContext", () => {
	it("succeeds at deep mount and detachment after which there are no children in document.body", () => {
		const wrapper = attachWithContext(<MyComponent />);

		expect(toJson(wrapper)).toMatchSnapshot();
		wrapper.detach();

		expect(document.body.childNodes.length).toEqual(0);
	});

	it("should render .MyComponent", () => {
		const wrapper = attachWithContext(<MyComponent />);

		expect(wrapper.find(".MyComponent").length).toEqual(
			1,
			".MyComponent not found or there were more than one"
		);

		wrapper.detach();
	});

	it("attaches the mounted component to an element in document.body", () => {
		const wrapper = attachWithContext(<MyComponent />);

		const myComponent = wrapper.find(".MyComponent");
		expect(myComponent.length).toEqual(
			1,
			".MyComponent not found or there were more than one"
		);

		const attachmentElements = document.body.querySelectorAll(
			"#__OC_COMPONENT_TEST_ATTACHMENT_ELEMENT__"
		);
		expect(attachmentElements.length).toEqual(
			1,
			"There should be only one #__OC_COMPONENT_TEST_ATTACHMENT_ELEMENT__, found " +
				attachmentElements.length
		);

		const attachmentElement = attachmentElements[0];
		const myComponent_in_attachmentElement = attachmentElement.querySelectorAll(
			".MyComponent"
		)[0];
		expect(myComponent_in_attachmentElement).toEqual(
			myComponent.instance()
		);

		wrapper.detach();
	});

	it("attaches the mounted component to an element in document.body even if the 'attachTo' option is given", () => {
		const wrapper = attachWithContext(<MyComponent />, {
			attachTo: document.body
		});

		const containerElement = document.body.querySelector(
			"#__OC_COMPONENT_TEST_ATTACHMENT_ELEMENT__"
		);
		const others = _.filter(
			document.body.children,
			element => element !== containerElement
		);
		expect(others.length).toEqual(0);

		wrapper.detach();
	});

	it("should pass custom context to the component to test", () => {
		const context = { flux: { stores: {} } };

		const props = {
			passContext: givenContext => {
				expect(givenContext).toContain(context);
			}
		};

		const wrapper = attachWithContext(<MyComponent {...props} />, {
			context
		});

		wrapper.detach();
	});
});

// import { Modal } from "react-bootstrap";
// import {getModalContents} from "../src/TestUtils";

// class MyPortalComponent extends ImmComponent {
// 	render() {
// 		return (
// 			<Modal
// 				show={true}
// 				className="MyModal"
// 			>
// 				<Modal.Body>
// 					{`Modal body`}
// 				</Modal.Body>
// 			</Modal>
// 		);
// 	}
// }

// describe("ReactWrapper.detach()", () => {
// 	it("detaches component even if snapshot assertion fails on a component with a Portal", () => {
// 		const wrapper = attachWithContext(<MyPortalComponent />);
// 		const portal = getModalContents(wrapper);

// 		const portalAsJson = toJson(portal);
// 		expect({portalAsJson, tro: "lol"}).toMatchSnapshot();
// 		// expect(portalAsJson).toMatchSnapshot();

// 		wrapper.detach();

// 		expect(document.body.childNodes.length).toEqual(0);
// 	});
// });
