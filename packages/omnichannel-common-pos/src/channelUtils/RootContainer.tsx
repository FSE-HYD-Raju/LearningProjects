import * as React from "react";
import { RouterProps } from "react-router";
import IntlContainer from "./IntlContainer";
import RootProvider, { RootProviderProps } from "./RootProvider";
const { object } = require("prop-types");

export interface RootContainerProps extends RouterProps, RootProviderProps<any> {
	className?: string;
	id?: string;
	useFragmentContainer?: boolean;
}

class RootContainer extends React.Component<RootContainerProps> {
	static childContextTypes = {
		flux: object
	};

	getChildContext() {
		return { flux: this.props.flux };
	}

	render() {
		const { application, flux, className, id, useFragmentContainer, store } = this.props;
		const rootDivAttrs: any = {};

		if (className) {
			rootDivAttrs.className = className;
		}
		if (id) {
			rootDivAttrs.id = id;
		}
		const content = (
			<IntlContainer>
				<RootProvider application={application} flux={flux} store={store} />
			</IntlContainer>
		);

		return useFragmentContainer
			? <React.Fragment>{content}</React.Fragment>
			: <div {...rootDivAttrs}>{content}</div>;
	}
}
export default RootContainer;
