import * as React from "react";
import { TestUtils, shallowWithContext, mountWithContext } from "../testUtils";
import RootContainer from "./RootContainer";
import { AppComponentProps } from "./RootProvider";
import { RouteComponentProps } from "react-router";
import { FluxAlt } from "../redux";
import { Provider, Store } from "react-redux";
import { ContextType, contextTypesValidationMap } from "../types/ContextType";
const { makeStore } = TestUtils;

class AppTest extends React.Component<AppComponentProps<any>> {

	static displayName = "AppTest";
	static contextTypes = contextTypesValidationMap;

	constructor(props: AppComponentProps<any>, context: ContextType) {
		super(props, context);
	}

	render() {
		return (
			<div id="AppTest"/>
		);
	}
}

const routerProps: RouteComponentProps<any> = {} as any as RouteComponentProps<any>;

const initializedStore = TestUtils.mockReduxStore({
	auth: {
		settingsLoaded: true
	},
	consul: {
		initialized: true
	},
	cms: {
		stylesLoaded: true
	},
	category: {},
});

const fluxContext = {
	flux: {
		stores: {
			ConsulStore: makeStore("context.flux.stores.ConsulStore")
		},
		actions: {}
	},
	store: initializedStore
};

describe("RootContainer", () => {

	it("succeeds at shallow mount with minimal props", () => {
		const wrapper = shallowWithContext(
				<RootContainer
					application={AppTest}
					flux={{} as FluxAlt<any>}
					store={{} as Store<any>}
					{...routerProps}
				/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimal props", () => {
		mountWithContext(
			<RootContainer
				application={AppTest}
				flux={{} as FluxAlt<any>}
				store={{} as Store<any>}
				{...routerProps}
			/>, { context: fluxContext }
		);
	});

	it("shows not render application with not initialized consul", () => {
		const notInitializedStore = TestUtils.mockReduxStore({
			auth: {
				settingsLoaded: false
			},
			consul: {
				initialized: false
			},
			cms: {
				stylesLoaded: false
			}
		});
		const context = {
			store: notInitializedStore,
			...fluxContext
		};

		const wrapper = mountWithContext(
			<Provider store={notInitializedStore}>
				<RootContainer
					application={AppTest}
					flux={fluxContext.flux as any as FluxAlt<any>}
					store={notInitializedStore}
					{...routerProps}
				/>
			</Provider>, context
		);
		expect(wrapper.find("AppTest")).toHaveLength(0);
	});

	it("should render application if consul is initialized and settings are loaded", () => {
		const context = {
			store: initializedStore,
			...fluxContext
		};
		const wrapper = mountWithContext(
			<Provider store={initializedStore}>
				<RootContainer
					application={AppTest}
					flux={fluxContext.flux as any as FluxAlt<any>}
					store={initializedStore}
					{...routerProps}
				/>
			</Provider>, context
		);
		expect(wrapper.find("AppTest")).toHaveLength(1);
	});

	it("should render application with proper flux and store props and context", () => {
		const context = {
			store: initializedStore,
			...fluxContext
		};
		const wrapper = mountWithContext(
			<Provider store={initializedStore}>
				<RootContainer
					application={AppTest}
					flux={fluxContext.flux as any as FluxAlt<any>}
					store={initializedStore}
					{...routerProps}
				/>
			</Provider>, context
		);

		const appContext = wrapper.find(AppTest).instance().context;
		const appProps = wrapper.find(AppTest).instance().props;

		expect(appContext.flux).toEqual(appProps.flux);
		expect(appContext.flux).toEqual(context.flux);
		expect(appProps.store.getState()).toEqual(context.store.getState());
	});
});
