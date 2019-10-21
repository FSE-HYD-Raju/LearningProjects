import { ChangeEvent, Component } from "react";
import {
	cssns,
	OcInput,
	FormattedMessage,
} from "omnichannel-common-pos";
const { React } = cssns("SelectPrivacyConsent");

interface SelectPrivacyConsentState {
	selected: string;
}

interface SelectedValueProp {
	[inputCharacteristicKey: string]: boolean;
}

interface SelectPrivacyConsentProps {
	name: string;
	description: string;
	changeHandler: (Object: SelectedValueProp) => void;
	inputCharacteristicKey: string;
}

class SelectPrivacyConsent extends Component<SelectPrivacyConsentProps, SelectPrivacyConsentState> {

	constructor(props: SelectPrivacyConsentProps) {
		super(props)
		this.state = {
			selected: "",
		};

	}

	handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const { name, inputCharacteristicKey } = this.props;
		const value = !!(event.target.value === `${name}-default-yes`);
		this.setState({
			selected: event.target.value
		});
		this.props.changeHandler({
			[inputCharacteristicKey]: value,
		});
	};

	render() {
		const { name, description } = this.props;
		return (
			<div className="row">
				<div className="col-sm-6">
					<div className="privacy-consent-input-label">
						<FormattedMessage
							id="privacy-consent-capture-label"
							description="Customer privacy consent capture label"
							defaultMessage={name} />
					</div>
					<span className="privacy-consent-input-description text-muted">
						<FormattedMessage
							id="privacy-consent-capture-description"
							description="Customer privacy consent description"
							defaultMessage={description} />
					</span>
				</div>
				<div className="privacy-consent-input-radio-inline col-sm-4">
					<OcInput className="privacy-consent-radio-button"
						id={`yes-${name}`}
						key={`POSCheckoutPrivacyConsent-input-${name}-yes`}
						type="radio"
						label="Yes"
						name={name}
						defaultValue={`${name}-default-yes`}
						checked={this.state.selected === `${name}-default-yes`}
						onChange={this.handleOnChange}
					/>
					<OcInput className="privacy-consent-radio-button"
						id={`no-${name}`}
						key={`POSCheckoutPrivacyConsent-input-${name}-no`}
						type="radio"
						label="No"
						name={name}
						defaultValue={`${name}-default-no`}
						checked={this.state.selected === `${name}-default-no`}
						onChange={this.handleOnChange}
					/>
				</div>
			</div>
		);
	}
}

export { SelectPrivacyConsentState, SelectPrivacyConsentProps };
export default SelectPrivacyConsent;
