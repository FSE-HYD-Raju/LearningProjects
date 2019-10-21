import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../testUtils";

import { WindowSizeActionProps, WindowSizeUnwrapper as WindowSize } from "./WindowSize";

describe("WindowSize", () => {
	const props: WindowSizeActionProps = {
		actions: {
			handleWindowResize: jest.fn()
		}
	};

	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<WindowSize {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at shallow mount without props", () => {
		mountWithContext(<WindowSize {...props} />);
	});

	it("should handle window resize", async (done) => {
		mountWithContext(<WindowSize {...props} />);

		(props.actions.handleWindowResize as any).mockClear();

		window.dispatchEvent(new Event("resize"));

		setTimeout(() => {
			expect(props.actions.handleWindowResize).toHaveBeenCalled();
			done();
		}, 50);
	});
});
