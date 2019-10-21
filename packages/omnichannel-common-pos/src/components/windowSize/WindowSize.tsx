import * as React from "react";
import isClient from "../../utils/isClient";
import { throttle } from "lodash";
import actions from "../../redux/actions";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";

interface WindowSizeActionProps {
	actions: {
		handleWindowResize: (clientWidth: number, clientHeight: number) => void;
	};
}

class WindowSize extends React.Component<WindowSizeActionProps> {
	static displayName = "WindowSize";

	constructor(props: WindowSizeActionProps) {
		super(props);

		if (isClient) {
			this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
			window.addEventListener("resize", this.handleWindowResize);
		}
	}

	handleWindowResize() {
		const { clientWidth, clientHeight } = document.documentElement as Element;
		this.props.actions.handleWindowResize(clientWidth, clientHeight);
	}

	componentWillMount() {
		if (isClient) {
			this.handleWindowResize();
		}
	}

	render() {
		return null;
	}
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): WindowSizeActionProps => ({
	actions: {
		handleWindowResize: (clientWidth: number, clientHeight: number) =>
			dispatch(actions.navBar.handleWindowResize(clientWidth, clientHeight))
	},
});

export default connect(null, mapDispatchToProps)(WindowSize);

export {
	WindowSize as WindowSizeUnwrapper,
	WindowSizeActionProps
};
