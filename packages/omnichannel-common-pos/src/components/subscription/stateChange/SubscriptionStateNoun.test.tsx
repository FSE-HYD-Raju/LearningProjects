import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../../testUtils";

import SubscriptionStateNoun from "./SubscriptionStateNoun";
import { LifecycleChangeAction } from "../../../redux/types";

describe("SubscriptionStateNoun", () => {
	it("succeeds at shallow mount with min props", () => {
		const wrapper = shallowWithContext(
			<SubscriptionStateNoun state="dummy-state"/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<SubscriptionStateNoun  state="dummy-state"/>);
	});

	describe("renders appropriately for every state", () => {
		const makeTransition = (id: string): LifecycleChangeAction => {
			return {
				id,
				name: id[0].toUpperCase() + id.substr(1),
				targetType: "product"
			};
		};

		[
			{
				value: makeTransition("deactivate"),
				transitionNoun: "Deactivation"
			},
			{
				value: makeTransition("disable"),
				transitionNoun: "Deactivation"
			},
			{
				value: makeTransition("suspend"),
				transitionNoun: "Suspension"
			},
			{
				value: makeTransition("resume"),
				transitionNoun: "Resume"
			},
			{
				value: makeTransition("reactivate"),
				transitionNoun: "Reactivation"
			}
		].forEach(argv => {
			it(argv.value.name, () => {
				const wrapper = mountWithContext(
					<SubscriptionStateNoun state={argv.value.id} />
				);
				expect(wrapper.text()).toEqual(argv.transitionNoun);
			});
		});
	});

	it("applies given text transformer", () => {
		const lowerCaseAllButLast = (name: string | undefined): string =>
			name ? name.substr(0, name.length - 1).toLowerCase() : "";
		const lastCharacterUpperCased = (name: string | undefined): string =>
			name ? name[name.length - 1].toUpperCase() : "";
		const lowerCaseAllButUpperCaseLast = (name: string | undefined): string =>
			lowerCaseAllButLast(name) + lastCharacterUpperCased(name);

		const wrapper = mountWithContext(
			<SubscriptionStateNoun
				state="reactivate"
				textTransformer={lowerCaseAllButUpperCaseLast}
			/>
		);

		const renderedText = wrapper.text();
		expect(renderedText).toEqual(lowerCaseAllButUpperCaseLast(renderedText.toLowerCase()));
	});
});
