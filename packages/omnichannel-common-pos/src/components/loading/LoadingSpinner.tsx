import * as React from "react";

const LoadingSpinner: React.FC = props => {
	return (
		<div className="LoadingOverlay-icons">
			<i className="LoadingOverlay-spinner fa fa-cog fa-spin fa-4x fa-fw" />
			{props.children}
		</div>
	);
};

export default LoadingSpinner;
