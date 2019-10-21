import * as React from "react";
import StoreConnectedRoute, { StoreConnectedRouteProps } from "./StoreConnectedRoute";
import { MemoryRouter, Route } from "react-router";
import ConnectedToStoreRouteParamHandler from "./ConnectedToStoreRouteParamHandler";

import { mountWithContext } from "../../testUtils";

const PRODUCT_ID = "zony";
const BASE_PATH = "/shop/categories/prepaid";

describe("StoreConnectedRoute", () => {
	let props: StoreConnectedRouteProps;
	beforeEach(() => {
		props = {
			actions: {
				setNewValue: jest.fn(),
				onValueChange: jest.fn()
			}
		} as any;
	});
	const RootComponent = (rootProps: any) => {
		return (
			<MemoryRouter initialEntries={[rootProps.initialPath]}>
				<Route
					path={BASE_PATH}
					render={routeProps => (
						<StoreConnectedRoute
							{...routeProps}
							{...props}
							path="products"
							nullable={rootProps.nullable}
							currentValue={rootProps.selectedProductId}
							uniqId={rootProps.uniqId}
							pathname={rootProps.initialPath}
						/>
					)}
				/>
			</MemoryRouter>
		);
	};

	const getComponent = (initialPath: string, selectedProductId: string | null, nullable = true, uniqId?: string) => (
		<RootComponent
			initialPath={initialPath}
			selectedProductId={selectedProductId}
			nullable={nullable}
			uniqId={uniqId}
		/>
	);

	it("should set selectedProductId when product specific location and selectedProdictId==null", () => {
		mountWithContext(getComponent(`${BASE_PATH}/products/${PRODUCT_ID}`, null));
		expect(props.actions.setNewValue).toBeCalledWith(PRODUCT_ID);
		expect(props.actions.onValueChange).toBeCalledWith(PRODUCT_ID, null);
	});
	it("should set selectedProductId when product specific location and selectedProdictId differs", () => {
		mountWithContext(getComponent(`${BASE_PATH}/products/${PRODUCT_ID}`, "other"));
		expect(props.actions.setNewValue).toBeCalledWith(PRODUCT_ID);
		expect(props.actions.onValueChange).toBeCalledWith(PRODUCT_ID, "other");
	});
	it("should not set selectedProductId when product specific location and selectedProdictId is same", () => {
		mountWithContext(getComponent(`${BASE_PATH}/products/${PRODUCT_ID}`, PRODUCT_ID));
		expect(props.actions.setNewValue).not.toBeCalled();
	});

	it("should set selectedProductId to null when not product specific location and selectedProdictId!=null", () => {
		mountWithContext(getComponent(`${BASE_PATH}`, "some"));
		expect(props.actions.setNewValue).toBeCalledWith(null);
		expect(props.actions.onValueChange).toBeCalledWith(null, "some");
	});
	it("should not set selectedProductId to null when not product specific location and selectedProdictId==null", () => {
		mountWithContext(getComponent(`${BASE_PATH}`, null));
		expect(props.actions.setNewValue).not.toBeCalled();
	});

	it("should not set selectedProductId to null when non nullable route, not product specific location and selectedProdictId!=null", () => {
		mountWithContext(getComponent(`${BASE_PATH}`, "some", false));
		expect(props.actions.setNewValue).not.toBeCalled();
	});
	// onValueChange call on uniqId changes handling
	it("should not call onValueChange when no uniqId is set", () => {
		const wrapper = mountWithContext(getComponent(`${BASE_PATH}/products/${PRODUCT_ID}`, PRODUCT_ID, true));
		wrapper.setProps({});
		expect(props.actions.onValueChange).not.toBeCalled();
	});
	it("should not call onValueChange when uniqId is set and not changed", () => {
		const wrapper = mountWithContext(
			getComponent(`${BASE_PATH}/products/${PRODUCT_ID}`, PRODUCT_ID, true, "initialUniqId")
		);
		wrapper.setProps({ uniqId: "initialUniqId" });
		expect(props.actions.onValueChange).not.toBeCalled();
	});
	it("should call onValueChange when uniqId is set and changed", () => {
		const wrapper = mountWithContext(
			getComponent(`${BASE_PATH}/products/${PRODUCT_ID}`, PRODUCT_ID, true, "initialUniqId")
		);
		wrapper.setProps({ uniqId: "newUniqId" });
		expect(props.actions.onValueChange).toBeCalledWith(PRODUCT_ID, PRODUCT_ID);
	});
});
