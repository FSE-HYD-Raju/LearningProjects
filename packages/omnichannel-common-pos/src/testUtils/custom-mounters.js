import React from "react";
import { IntlProvider, intlShape } from "react-intl";
import { mount, shallow } from "enzyme";
import PropTypes from "prop-types";
import R from "ramda";
import TestUtils from "./TestUtils";

const MAX_DIVE_DEEP_LEVEL = 16;
const intlProvider = new IntlProvider({ locale: "en" }, {});
const { intl } = intlProvider.getChildContext();

const baseContext = {
	flux: {
		persist: () => {}
	},
	store: TestUtils.mockReduxStore(),
	intl,
	location: {},
	only: {},
	skip: {}
};

const nodeWithIntlProp = (node, mockedRouterOptions) => {
	if (mockedRouterOptions) {
		mockedRouterOptions.props().history.push = jest.fn();
	}
	return React.cloneElement(node, {
		intl,
		...(mockedRouterOptions ? mockedRouterOptions.props() : {})
	});
};

function getOptionsForShallowMount(options, debug, mockedRouterContextOptions) {
	const mountOptions = R.merge(options ? options : {}, {
		disableLifecycleMethods: !(
			options && options.disableLifecycleMethods === false
		),
		context: R.mergeAll([
			debug
				? {
						...baseContext
					}
				: baseContext,
			R.omit("intl", options && options.context ? options.context : {}),
			mockedRouterContextOptions.context
		]),
		childContextTypes: R.merge(
			{
				intl: intlShape,
				store: PropTypes.object
			},
			mockedRouterContextOptions.childContextTypes
		)
	});
	TestUtils.mockReduxStoreToFlux(mountOptions.context);
	return mountOptions;
}
function deepDive(wrapper) {
	let diveAttemptsCount = 0;
	while (
		wrapper.hostNodes().length === 0 &&
		diveAttemptsCount < MAX_DIVE_DEEP_LEVEL
	) {
		wrapper = wrapper.dive();
		diveAttemptsCount += 1;
	}
	return wrapper;
}
export function shallowWithContextAndRouterProps(node, options, debug) {
	return shallowWithContext(node, options, debug, true);
}
export function shallowWithContextAndLifecycle(node, options, debug) {
	return shallowWithContext(
		node,
		R.merge(options || {}, { disableLifecycleMethods: false }),
		debug,
		true
	);
}
export function deepShallowWithContextAndLifecycle(node, options, debug) {
	return deepDive(shallowWithContextAndLifecycle(node, options, debug));
}
export function deepShallowWithContext(node, options, debug) {
	return deepDive(shallowWithContext(node, options, debug, true));
}
export function shallowWithContext(node, options, debug, injectRouterProps) {
	const mockedRouterOptions = TestUtils.getMockedRouterOptions();
	const mockedRouterContextOptions = mockedRouterOptions.get();
	return shallow(
		nodeWithIntlProp(node, injectRouterProps ? mockedRouterOptions : null),
		getOptionsForShallowMount(options, debug, mockedRouterContextOptions)
	);
}

export function mountWithContextAndRouterProps(node, options, debug) {
	return mountWithContext(node, options, debug, true);
}
export function mountWithContext(node, options, debug, injectRouterProps) {
	const mockedRouterOptions = TestUtils.getMockedRouterOptions();
	const mockedRouterContextOptions = mockedRouterOptions.get();
	const mountOptions = R.merge(options ? options : {}, {
		context: R.mergeAll([
			debug
				? {
						...baseContext
					}
				: baseContext,
			R.omit("intl", options && options.context ? options.context : {}),
			mockedRouterContextOptions.context
		]),
		childContextTypes: R.merge(
			{
				flux: PropTypes.object,
				store: PropTypes.object,
				intl: intlShape,
				location: PropTypes.object,
				only: PropTypes.object,
				skip: PropTypes.object
			},
			mockedRouterContextOptions.childContextTypes
		)
	});
	TestUtils.mockReduxStoreToFlux(mountOptions.context);
	return mount(
		nodeWithIntlProp(node, injectRouterProps ? mockedRouterOptions : null),
		mountOptions
	);
}

const attachmentElementId = "__OC_COMPONENT_TEST_ATTACHMENT_ELEMENT__";

export function attachWithContext(node, options) {
	const attachmentElement = document.createElement("div");
	attachmentElement.setAttribute("id", attachmentElementId);
	document.body.appendChild(attachmentElement);

	const wrapper = mountWithContext(
		node,
		R.merge(options, { attachTo: attachmentElement })
	);
	const doppelWrapper = hijackDetacher(wrapper);

	return doppelWrapper;
}

function hijackDetacher(wrapper) {
	const doppel = wrapper;
	doppel.__detach = wrapper.detach;

	doppel.detach = () => {
		removeAttachmentElements();
		doppel.__detach.apply(wrapper);
	};

	return doppel;
}

function removeAttachmentElements() {
	document.body.querySelectorAll("#" + attachmentElementId).forEach(elem => {
		document.body.removeChild(elem);
	});
}

export function detach(wrapper) {
	removeAttachmentElements();
	wrapper.detach();
}
