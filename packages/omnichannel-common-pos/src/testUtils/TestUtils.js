import React from "react";
import PropTypes from "prop-types";
import { createStore, compose, applyMiddleware } from "redux";
import { ReactWrapper, ShallowWrapper } from "enzyme";
import R from "ramda";
import _ from "lodash";

import { mountWithContext } from "./custom-mounters";
import { IntlProvider, intlShape } from "react-intl";
import ReactRouterEnzymeContext from "react-router-enzyme-context";
import { createMemoryHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";

// README: Should be equal to omni-ui-common-pos/packages/omnichannel-redux/src/connectFluxRedux.ts:17
const defaultFluxStoreMap = {
	B2CCheckoutStore: "b2cCheckout",
	BaseStore: "base",
	BasketStore: "basket",
	CMSAdminStore: "cmsAdmin",
	ConsulStore: "consul",
	CustomerCaseStore: "customerCase",
	CustomerStore: "customer",
	DigitalLifeStore: "digitalLife",
	POSCheckoutStore: "posCheckout",
	PaymentStore: "payment",
	ProductOfferings: "productOfferings",
	SalesRepSessionStore: "salesRepSession",
	SalesStore: "sales",
	SchemaStore: "schema",
	SessionStore: "session",
	TranslationStore: "translation",
	UserStore: "user",
	CustomerInteractionsStore: "customerInteractions"
};

type Context = {
	router: Object,
	location: Object,
	intl: Object,
	flux: Object
};

const contextTypes: Context = {
	router: PropTypes.object.isRequired,
	location: PropTypes.object,
	intl: intlShape.isRequired,
	flux: PropTypes.object.isRequired
};

const intlProvider = new IntlProvider({ locale: "en" }, {});
const { intl } = intlProvider.getChildContext();

const assignNodesToMap = (nodes, map) => {
	let node = null,
		id = null;

	for (let i = 0; i < nodes.length; ++i) {
		node = nodes.at(i);
		id = "#" + node.prop("id");
		map[id] = node;
	}
};

const mockReduxStore = (state = {}) => {
	const history = createMemoryHistory();
	return createStore(
		connectRouter(history)(() => ({ ...state })),
		state,
		compose(applyMiddleware(routerMiddleware(history)))
	);
};

/**
 * @param context: Object
 * @param context.flux: Flux
 */
const mockReduxStoreToFlux = (context = {}) => {
	context.flux = context.flux || {};

	const { stores = {} } = context.flux;
	const fluxState = Object.keys(stores).reduce((state, key) => {
		const stateProp = defaultFluxStoreMap[key];
		state[stateProp] =
			_.isUndefined(stores[key].getState) ||
			_.isUndefined(stores[key].getState())
				? { ...stores[key] }
				: { ...stores[key].getState() };
		return state;
	}, {});

	const state = _.chain(defaultFluxStoreMap)
		.values()
		.zipObject()
		.mapValues(() => ({}))
		.assign(fluxState)
		.value();

	const initialReduxStore = context.store ? context.store.getState() : {};
	context.flux.reduxStore = mockReduxStore({
		...state,
		...initialReduxStore
	});
	context.store = context.flux.reduxStore;
	return context.flux;
};

export default class TestUtils {
	static mockReduxStore = mockReduxStore;
	static mockReduxStoreToFlux = mockReduxStoreToFlux;
	static DEBOUNCE_TIME = 850;

	static getMockedRouterOptions() {
		return new ReactRouterEnzymeContext({
			initialEntries: [{ pathname: "/", key: "mockKey" }]
		});
	}
	static returnFirstMatchingNode(wrapper, fnMatch) {
		let found = null;
		const time_start = new Date().getTime();

		for (let i = 0; i < wrapper.length; ++i) {
			found = fnMatch(wrapper.at(i));

			if (found) {
				break;
			}
			if (new Date().getTime() - time_start > 1000) {
				throw new Error(
					"Iteration took a second already -- you might want to check your matcher function"
				);
			}
		}

		return found;
	}

	static getRandomIntBetweenZeroAndN(n) {
		const raw = Math.random();
		const random = Math.floor(raw * n);
		return random;
	}

	static getDelayedPromise(interval) {
		return new Promise(function(resolve) {
			setTimeout(resolve, interval);
		});
	}

	static getValueAndTextFromSelectOptions(selectNode, enabledOnly) {
		return TestUtils.getOptionsInSelect(
			selectNode,
			enabledOnly
		).map(node => {
			return {
				value: node.prop("value"),
				text: node.text()
			};
		});
	}

	static getOptionsInSelect(selectNode, enabledOnly) {
		return selectNode.find("option").filterWhere(node => {
			if (enabledOnly) {
				return node.prop("disabled") !== true;
			}

			return true;
		});
	}

	static makeStore(name, body = {}, debug) {
		body._listeners = [];
		const emitChange = () => body._listeners.forEach(cb => cb(body.state));

		return R.merge(
			{
				getState: () => {
					debug && console.log("MOCKED " + name + ".getState()");
					return body.state;
				},
				setState: newState => {
					body.state = {
						...body.state,
						...newState
					};
					emitChange();
					return body.state;
				},
				listen: callback => {
					body._listeners.push(callback);
					return function(...args) {
						callback(...args);
					};
				},
				config: {
					setState: (state, newState) => {
						body.state = {
							...state,
							...newState
						};
						return body.state;
					}
				},
				emitChange
			},
			body
		);
	}

	static makeActions(name, body, debug) {
		return R.merge(
			{
				getState: () => {
					debug && console.log("MOCKED " + name + ".getState()");
				}
			},
			body
		);
	}

	static findHtmlInputNodesWithId(wrapper) {
		const inputs = wrapper.find("input");
		const selects = wrapper.find("select");
		const textareas = wrapper.find("textarea");
		const buttons = wrapper.find("button");

		const inputsWithId = inputs.filterWhere(node => {
			return !!node.prop("id");
		});
		const selectsWithId = selects.filterWhere(node => {
			return !!node.prop("id");
		});
		const textareasWithId = textareas.filterWhere(node => {
			return !!node.prop("id");
		});
		const buttonsWithId = buttons.filterWhere(node => {
			return !!node.prop("id");
		});

		const map = {};

		[
			inputsWithId,
			selectsWithId,
			textareasWithId,
			buttonsWithId
		].forEach(wrapper => {
			// withId.forEach((wrapper) => {
			let node = null,
				id = null;

			for (let i = 0; i < wrapper.length; ++i) {
				node = wrapper.at(i);
				id = "#" + node.prop("id");
				map[id] = node;
			}
		});

		return map;
	}

	static findReactInputNodesWithId(wrapper) {
		const ocInputs = wrapper.find("OcInput");
		const ocDatePickers = wrapper.find("OcDatePicker");
		const ocSelects = wrapper.find("OcSelect");

		const wTextInputs = wrapper.find("TextInput");
		const wTextAreas = wrapper.find("TextArea");
		const wPasswordInputs = wrapper.find("PasswordInput");
		const wSelects = wrapper.find("Select");

		const ocInputsWithId = ocInputs.filterWhere(node => {
			return !!node.prop("id");
		});
		const ocDatePickersWithId = ocDatePickers.filterWhere(node => {
			return !!node.prop("id");
		});
		const ocSelectsWithId = ocSelects.filterWhere(node => {
			return !!node.prop("id");
		});

		const wTextInputsWithId = wTextInputs.filterWhere(
			node => !!node.prop("id")
		);
		const wTextAreasWithId = wTextAreas.filterWhere(
			node => !!node.prop("id")
		);
		const wPasswordInputsWithId = wPasswordInputs.filterWhere(
			node => !!node.prop("id")
		);
		const wSelectsWithId = wSelects.filterWhere(node => !!node.prop("id"));

		// const withId = [ocInputsWithId, ocSelectsWithId, textareasWithId, buttonsWithId].filterWhere((node) => {
		//     return !! node.prop("id");
		// });

		const map = {};

		[
			ocInputsWithId,
			ocDatePickersWithId,
			ocSelectsWithId,
			wTextInputsWithId,
			wTextAreasWithId,
			wPasswordInputsWithId,
			wSelectsWithId
		].forEach(wrapper => assignNodesToMap(wrapper, map));
		// map.keys = () => {
		//     return Object.keys(map);
		// };
		// map.iterator = () => {
		//     return Object.keys(map).map((key) => map[key]);
		// };
		// map[Symbol.iterator] = function* () {
		//     const self = this;
		//     const values = Object.keys(this);
		//     let i = 0;
		//     return {
		//         next: () => {
		//             return {
		//                 value: self[values[++ i]],
		//                 done: i > values.length
		//             };
		//         }
		//     };
		// };

		return map;
	}

	static findOcFormNodesWithId(wrapper) {
		const buttons = wrapper.find("OcButton");

		const buttonsWithId = buttons.filterWhere(node => {
			return !!node.prop("id");
		});

		const map = TestUtils.findOcInputNodesWithId(wrapper);
		assignNodesToMap(buttonsWithId, map);

		return map;
	}

	static findHtmlInputElements(node) {
		const elements = [];
		const add = element => elements.push(element);

		const inputs = node.find("input");
		if (inputs.length > 0) {
			inputs.forEach(add);
		}

		const textareas = node.find("textarea");
		if (textareas.length > 0) {
			textareas.forEach(add);
		}

		const selects = node.find("select");
		if (selects.length > 0) {
			selects.forEach(add);
		}

		return elements;
	}

	static setDateOnOcDatePickerNode(/* ReactWrapper */ node, /* Date */ date) {
		node.instance().onChange(date);
	}

	static enterMatchingValueIntoInputNode(node, dataMap) {
		const { name } = node.props();

		if (!(name in dataMap)) {
			throw new Error("No value by key '" + name + "' in dataMap");
		}

		const value = dataMap[name];

		if (node.is("OcDatePicker")) {
			TestUtils.setDateOnOcDatePickerNode(node, value);
		} else {
			const elements = TestUtils.findHtmlInputElements(node);

			if (node.prop("inputType") === "checkbox") {
				// elements[0].at(0).simulate("change", {target: {checked: value}});
				const checked =
					elements[0].at(0).prop("overrideValue") === "on";
				if (checked ^ value) {
					elements[0].at(0).simulate("click");
				}
			} else {
				elements[0].at(0).simulate("change", { target: { value } });
			}
		}
	}

	/**
	 * dataMap := {firstName: "John", lastName: "Smith", street: "1 Test St."}
	 * mapIdToElements := {<id of an element>: ReactWrapper, <id of another element>: ReactWrapper ...}
	 */
	static enterDataIntoInputNodes(dataMap, mapIdToNodes) {
		const nodes = Object.keys(mapIdToNodes).map(id => mapIdToNodes[id]);

		return nodes.map(node => {
			return () => {
				const { name } = node.props();

				if (!(name in dataMap)) {
					// try {
					//     console.log("(DEBUG) parent:", node.parent());
					// }
					// catch (e) {
					//     console.warn("could not get node parent:", e);
					// }

					return {
						node,
						error: "No value for field '" + name + "' available"
					};
				}

				const value = dataMap[name];
				try {
					// node.find("input").simulate("change", {target: {value}});
					TestUtils.enterDataIntoInputNode(node, value);
				} catch (e) {
					return {
						node,
						error: e
					};
				}

				return { node, error: null };
			};
		});
	}

	static mapDirectChildren(wrapper) {
		const map = [];

		for (let i = 0; i < wrapper.length; ++i) {
			map.push(wrapper.at(i));
		}

		return map;
	}

	static findNodesWithAttribute(wrapper, attributeName, value) {
		const selector = value
			? "[" + attributeName + "=" + value + "]"
			: "[" + attributeName + "]";
		return wrapper.find(selector);
	}

	static findNodesWithOnClickAttribute(wrapper) {
		return TestUtils.findNodesWithAttribute(wrapper, "onClick");
	}

	/* NOTE NOT TESTED */
	static findNodesWithProp(wrapper, propName, value, deep) {
		const filter = n => {
			const props = n.props();
			if (propName in props) {
				if (typeof value === "undefined") {
					return true;
				} else {
					return propName === value;
				}
			} else {
				return false;
			}
		};

		return deep ? wrapper.findWhere(filter) : wrapper.filterWhere(filter);
	}

	static findNodesWithOnClickProp(wrapper) {
		return TestUtils.findNodesWithProp(wrapper, "onClick");
	}

	static testClickHandlersOnComponent(Component, clickHandlerProp) {
		// const onButtonClick = expect.createSpy();
		const onButtonClick = jest.fn();
		const props = {
			[clickHandlerProp]: onButtonClick
		};

		const wrapper = mountWithContext(<Component {...props} />);

		// const nodesWithOnClick = TestUtils.findNodesWithOnClick(wrapper);
		// nodesWithOnClick.forEach(node => {
		// 	node.simulate("click");
		// });

		// // expect(onButtonClick.calls.length).toEqual(nodesWithOnClick.length);
		// expect(onButtonClick).toHaveBeenCalledTimes(nodesWithOnClick.length);
		TestUtils.testClickHandlersOnWrapper(wrapper, onButtonClick);
	}

	static testClickHandlersOnWrapper(/* ReactWrapper */ wrapper, clickSpy) {
		const nodesWithOnClick = TestUtils.findNodesWithOnClick(wrapper);
		nodesWithOnClick.forEach(node => {
			node.simulate("click", { preventDefault: () => undefined });
		});

		expect(clickSpy).toHaveBeenCalledTimes(nodesWithOnClick.length);
	}

	static testClickHandlerOnWrapperNodeById(
		/* ReactWrapper */ wrapper,
		/* without # */ nodeId,
		/* jest.fn() */ clickHandler
	) {
		const node = wrapper.find("#" + nodeId).hostNodes();
		expect(node).toHaveLength(1);
		node.simulate("click", { preventDefault: () => undefined });

		expect(clickHandler).toHaveBeenCalledTimes(1);
	}

	static testWrapperHasNoNodesWithIds(
		/* ReactWrapper */ wrapper,
		/* without # */ ...nodesIds
	) {
		nodesIds.forEach(nodeId =>
			expect(wrapper.find("#" + nodeId)).toHaveLength(0)
		);
	}
	static testWrapperHasNodesWithIds(
		/* ReactWrapper */ wrapper,
		/* without # */ ...nodesIds
	) {
		nodesIds.forEach(nodeId =>
			expect(wrapper.find("#" + nodeId)).not.toHaveLength(0)
		);
	}

	static propHasFunction(/* ReactWrapper */ component, propName) {
		return typeof component.prop(propName) === "function";
	}

	static getModalContents(
		/* ReactWrapper */ wrapper,
		context = {},
		shallow = false
	) {
		const portalInstance = wrapper.find("Portal").at(0).instance();
		const mockedRouterOptions = TestUtils.getMockedRouterOptions();
		const mockedRouterContextOptions = mockedRouterOptions.get();

		const WrapperClass = shallow ? ShallowWrapper : ReactWrapper;

		if (context) {
			context["intl"] = intl;
			context = { ...context, ...mockedRouterContextOptions.context };
		}
		if (!context.store) {
			context.store = mockReduxStore();
			TestUtils.mockReduxStoreToFlux(context);
		}
		const contents = new WrapperClass(
			portalInstance.props.children,
			undefined,
			{
				attachTo: portalInstance.$portal,
				context: Object.assign(context, {
					intl,
					...mockedRouterContextOptions.context
				}),
				contextTypes,
				childContextTypes: {
					flux: PropTypes.object,
					intl: intlShape,
					store: PropTypes.object,
					...mockedRouterContextOptions.childContextTypes
				}
			}
		);

		return contents;
	}

	static clickOnDocumentBody(onClick: Function = () => {}) {
		document.body.addEventListener("click", onClick);
		document.body.dispatchEvent(new MouseEvent("click", { view: window }));
		document.body.removeEventListener("click", onClick);
	}

	static mockAxios(functions: Object, getterData) {
		return R.merge(
			{
				get: url => {
					console.log("MOCKED axios.get(), url:", url);
					return {
						then: fn => {
							return fn({ data: getterData });
						}
					};
				}
			},
			functions
		);
	}

	static mockFluxApiCalls(body: Object, getterData) {
		return R.merge(
			{
				apiUrl: "http://localhost:8080/omnichannel-api/api/v0",
				get: url => {
					console.log("MOCKED apiCalls.get(), url:", url);
					return {
						then: fn => {
							return fn({ data: getterData });
						}
					};
				}
			},
			body
		);
	}

	static getDateMocker(globalDate, time: Date | Number) {
		const o = {
			mock: (_time: Date | Number) => {
				const timeValue = _time ? _time : time;
				const timestamp = _.isDate(timeValue)
					? timeValue.getTime()
					: timeValue;

				globalDate.now = jest
					.genMockFunction()
					.mockReturnValue(timestamp);
			},
			original: globalDate.now,
			restore: null
		};

		o.restore = () => {
			globalDate.now = o.original;
		};

		return o;
	}

	static getGlobalFunctionMocker(global: Object, functionName, fn: Function = () => {}) {
		const original = global[functionName];

		return {
			mock: () => {
				global[functionName] = fn;
			},
			original,
			restore: () =>
				global[functionName] = original
		};
	}

	static sleep = (ms /* number*/) => {
		return new Promise(resolve => setTimeout(resolve, ms));
	};

	/**
	 * TypeScript:
	 * @param  a     object of type A
	 * @param  body  object, optional
	 * @return SyntheticEvent<A>
	 */
	static getSyntheticEvent(a /*: A*/, body /* object */) /* SyntheticEvent<A> */ {
		const defaultBody = {
			preventDefault: () => {
				console.log("at syntheticEvent.preventDefault()");
			},
			stopPropagation: () => {
				console.log("at syntheticEvent.stopPropagation()");
			}
		};

		let event = {
			target: a,
			...defaultBody
		};

		if (body && typeof body === "object") {
			event = {
				...event,
				...body
			};
		}

		return event;
	}
}
