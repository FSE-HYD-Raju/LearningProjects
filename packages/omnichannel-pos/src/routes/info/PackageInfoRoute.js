// @flow
import React from "react";
import { Route } from "react-router-dom";

const PackageInfoRoute = () => {
	return (
		<Route
			key="info"
			path="/package_info"
			component={() => (
				<div style={{ background: "white", color: "black" }}>
					<pre>
						{JSON.stringify(
							require("../../../package.json"),
							null,
							4
						)}
					</pre>
				</div>
			)}
		/>
	);
};

export default PackageInfoRoute;
