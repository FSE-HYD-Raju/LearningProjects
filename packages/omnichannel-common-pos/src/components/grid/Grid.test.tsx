import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../testUtils";
import Grid from "./Grid";

describe("Grid", () => {
	let child: React.ReactNode;

	beforeAll(() => {
		child = <span className="testSpan" />;
	});

	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<Grid>{child}</Grid>);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props ", () => {
		mountWithContext(<Grid>{child}</Grid>);
	});
});
