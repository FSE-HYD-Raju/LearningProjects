import PropTypes from "prop-types";
import React from "react";
import _omit from "lodash/omit";

const RouteContentWrapper = props => {
	const Component = props._component;
	const componentProps = _omit(props, ["_component"]);
	return <Component {...componentProps} />;
};

RouteContentWrapper.propTypes = {
	_component: PropTypes.any
};
export default RouteContentWrapper;
