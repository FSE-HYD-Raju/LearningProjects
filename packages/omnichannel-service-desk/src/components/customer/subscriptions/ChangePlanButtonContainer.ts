import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "omnichannel-common-pos";

import ChangePlanButton, {
	ChangePlanButtonStoreProps
} from "./ChangePlanButton";

export interface ChangePlanButtonContainerProps {
	handleClick: (() => void);
}

const mapStateToProps = (state: AppState, ownProps: ChangePlanButtonContainerProps): ChangePlanButtonStoreProps => {
	return {
		handleClick: ownProps.handleClick
	};
};

export default connect(mapStateToProps)(ChangePlanButton);
