import * as React from "react";
import {
	SliderConfigurationGroup,
	SliderConfigurationGroupProps
} from "./SliderConfigurationGroup";

class SliderConfigurationGroupLifeCycle extends React.PureComponent<SliderConfigurationGroupProps> {
	componentDidMount() {
		(Object.keys(this.props.configurations) || []).forEach(
			allowanceType => {
				if (
					this.props.configurations[allowanceType].selectedValue !==
					undefined
				) {
					this.props.handleChange(
						allowanceType,
						this.props.configurations[allowanceType].selectedValue as number
					);
				}
			}
		);
	}
	render() {
		return <SliderConfigurationGroup {...this.props} />;
	}
}

export default SliderConfigurationGroupLifeCycle;
export {
	SliderConfigurationGroupProps
};
