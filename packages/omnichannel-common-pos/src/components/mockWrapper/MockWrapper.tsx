import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../../redux/reducers";
import { VersionInformationMockMode, } from "../../redux";
import * as classnames from "classnames";

interface MockWrapperProps {
	mockdataDisplayMode: VersionInformationMockMode;
}

const MockWrapper: React.FC<MockWrapperProps> = props => {

	const classNames = classnames({
		"MockWrapper-zero-opacity": props.mockdataDisplayMode === VersionInformationMockMode.HIDDEN,
		"MockWrapper-normal-opacity": props.mockdataDisplayMode !== VersionInformationMockMode.HIDDEN,
		"MockWrapper-with-border": props.mockdataDisplayMode === VersionInformationMockMode.HIGHLIGHT,
	});

	if (props.children) {
		return <div className={classNames}>{props.children}</div>;
	} else {
		return <span />;
	}
};

const MockWrapperConnected = connect((state: AppState): MockWrapperProps => ({
	mockdataDisplayMode: state.versionInformation.mockdataDisplayMode,
	})
)(MockWrapper);

export {
	MockWrapper as MockWrapperUnwrapped,
	MockWrapperConnected as MockWrapper,
	MockWrapperProps
};
