import * as React from "react";
import SessionStatePollingIFrame, { SessionStatePollingIFrameProps } from "./SessionStatePollingIFrame";
import { mountWithContext, shallowWithContext } from "../../testUtils";

const props: SessionStatePollingIFrameProps = {
	actions: {
		logout: () => {},
	},
	sessionCheckIntervalSeconds: 60,
	checkSessionIFrameUrl: "http://localhost:80/iframe",
	clientId: "clientId"
};

describe("SessionStatePollingIFrame", () => {
	it("mounts with minimum props", () => {
		const wrapper = shallowWithContext(<SessionStatePollingIFrame {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("mounts with minimum props", () => {
		mountWithContext(<SessionStatePollingIFrame {...props} />);
	});

	it("should render an iframe with correct source address", () => {
		const wrapper = mountWithContext(<SessionStatePollingIFrame {...props} />);
		const iframe = wrapper.find("#SessionStatePollingIFrame");
		expect(iframe.props().src).toEqual(props.checkSessionIFrameUrl);
	});
});
