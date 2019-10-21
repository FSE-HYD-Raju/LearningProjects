import * as React from "react";
import LoginContainerRedux from "./LoginContainerRedux";
import {
	mountWithContext,
	shallowWithContext,
	TestUtils
} from "../../testUtils";

describe("LoginContainerRedux", () => {
	const { makeActions, makeStore } = TestUtils;

	const context = {
		flux: {
			stores: {
				BasketStore: makeStore("flux.stores.BasketStore", {}),
				UserStore: makeStore("flux.stores.UserStore", {})
			},
			actions: {
				BasketActions: makeActions("flux.actions.BasketActions", {}),
				UserActions: makeActions("flux.actions.UserActions", {})
			}
		}
	};

	it("succeeds at shallow mount without props but with a mocked context", () => {
		const wrapper = shallowWithContext(
			<LoginContainerRedux flux={context.flux as any}>
				<div />
			</LoginContainerRedux>,
			{ context }
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at full mount without props but with a mocked context", () => {
		mountWithContext(<LoginContainerRedux flux={context.flux as any}/>, { context });
	});
});
