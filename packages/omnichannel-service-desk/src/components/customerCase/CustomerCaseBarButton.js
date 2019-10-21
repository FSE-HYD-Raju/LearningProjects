// @flow

import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";

type Props = {
	id: ?String,
	className: ?String,
	children: any,
	onClick: ?() => void
};

const CustomerCaseBarButton = (props: Props) => (
	<button
		className={classnames(
			"CustomerCaseBar-button btn btn-context ",
			props.className
		)}
		id={props.id || undefined}
		onClick={props.onClick || undefined}
	>
		{props.children}
	</button>
);

CustomerCaseBarButton.propTypes = {
	id: PropTypes.string,
	onClick: PropTypes.func,
	children: PropTypes.node,
	className: PropTypes.string
};

export default CustomerCaseBarButton;
