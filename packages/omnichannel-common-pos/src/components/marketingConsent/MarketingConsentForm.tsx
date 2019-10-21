import cssns from "../../utils/cssnsConfig";
import OcInput from "../ocComponents/OcInput";
import withFormal from "../ocComponents/withFormal";
import { isEmpty } from "lodash";
import { Component, ReactNode } from "react";
import { SchemaItem } from "../../redux";
import messages from "./MarketingConsent.messages";
import FormattedMessage from "../../channelUtils/FormattedMessage";

const Form = require("react-formal");
const withSchema = require("../../schemas/withSchema");
const FormalCheckbox = withFormal(OcInput, { inputType: "checkbox" });
const { React } = cssns("MarketingConsentForm");

interface MarketingConsentFormStateProps {
	giveProductCharacteristicForConsentAlias: (alias: string) => string;
	model?: Record<string, string>;
	schema: SchemaItem;
	onChange?: (model: any) => void;
	onSubmit?: (model: any) => void;
	onValid?: (model: any) => void;
	standalone?: boolean;
	customConfirm?: ReactNode;
}

interface MarketingConsentFormState {
	model?: Record<string, string>;
	displayAll: boolean;
	oldModel: any;
}

class MarketingConsentForm extends Component<MarketingConsentFormStateProps, MarketingConsentFormState> {
	static displayName: string = "MarketingConsentForm";

	constructor(props: MarketingConsentFormStateProps) {
		super(props);
		this.state = {
			displayAll: false,
			oldModel: isEmpty(props.model) ? {
				ownMarketing: true,
				thirdPartyMarketing: true,
				geoLocalization: true,
				profiling: true,
				thirdPartyEnrichment: true,
				thirdPartyTransfer: true
			} : props.model
		};
	}

	booleanizeValues(data: any) {
		Object.keys(data).forEach(key => {
			const value = data[key];
			if (typeof value === "string") {
				data[key] = value === "true";
			}
		});
	}

	componentDidMount() {
		if (!isEmpty(this.props.model)) {
			this.setState({
				oldModel: this.props.model,
				displayAll: true
			});
		} else {
			this.handleInputChange({ ownMarketing: false,
				thirdPartyMarketing: false,
				geoLocalization: false,
				profiling: false,
				thirdPartyEnrichment: false,
				thirdPartyTransfer: false
			});
		}
	}

	handleInputChange = (answers: any): void => {
		this.booleanizeValues(answers);

		const model0: any = {};
		Object.keys(answers).forEach(alias => {
			if (this.props.giveProductCharacteristicForConsentAlias) {
				const char = this.props.giveProductCharacteristicForConsentAlias(alias);

				if (char) {
					model0[char] = answers[alias];
				}
			}
		});

		const model = Object.freeze(model0);

		this.setState({
			model: {
				...this.state.model,
				...answers
			}
		});

		if (this.props.onChange) {
			this.props.onChange(model);
		}

		if (this.props.onValid) {
			this.props.schema.validate(answers).then((validModel: any) => {
					this.props.onValid!(model);
				})
				.catch((err: any) => {});
		}
	};

	handleSubmit = (model: Object): void => {
		if (this.props.onSubmit) {
			this.props.schema.validate(model).then((validModel: any) => {
					this.props.onSubmit!(validModel);
				})
				.catch((err: any) => {});
		}
	};

	setAll = (value: any) => {
		if (value) {
			this.handleInputChange(this.state.oldModel);
		} else {
			this.handleInputChange({ ownMarketing: value,
				thirdPartyMarketing: value,
				geoLocalization: value,
				profiling: value,
				thirdPartyEnrichment: value,
				thirdPartyTransfer: value
			});
		}
	};

	toggleView = () => {
		if (this.state.displayAll) {
			this.setState({
				oldModel: this.state.model || this.props.model
			});
		}

		this.setState({
			displayAll: !this.state.displayAll,
		});

		this.setAll(!this.state.displayAll);
	};

	render() {
		const model = this.state.model || this.props.model || {};
		const { standalone, customConfirm } = this.props;

		return (
			<div className="MarketingConsentForm">
				<div className="marketing-consent-overall-acceptance">
					<OcInput
						onChange={this.toggleView}
						type="checkbox"
						checked={
							this.state.displayAll
						}
						id="MarketingConsentForm-toggle-view"
						name="toggle-view"
					/>
					<span className="marketing-consent-input-label">
						<FormattedMessage {...messages.iGiveMyConsent}/>
					</span>
				</div>
				{this.state.displayAll && <Form
					noValidate={false}
					strict={false}
					debug={true}
					schema={this.props.schema}
					onChange={this.handleInputChange}
					value={model}
					onSubmit={this.handleSubmit}
				>
					<div className="marketing-consent-input-container">
						<div className="container-row">
							<Form.Field
								id="MarketingConsentForm-ownMarketing-yes-field"
								name="ownMarketing"
								type={FormalCheckbox}
								defaultValue={true}
								checked={model.ownMarketing}
							/>
						</div>
						<div className="container-column">
							<span className="marketing-consent-input-label">
								<FormattedMessage {...messages.ownMarketing}/>
								<i className="fa fa-asterisk" />
							</span>
							<span className="marketing-consent-input-description">
								<FormattedMessage {...messages.marketingCommunications}/>
							</span>
						</div>
					</div>
					<div className="marketing-consent-input-container">
						<div className="container-row">
							<Form.Field
								id="MarketingConsentForm-thirdPartyMarketing-yes-field"
								name="thirdPartyMarketing"
								type={FormalCheckbox}
								defaultValue={true}
								checked={model.thirdPartyMarketing}
							/>
						</div>
						<div className="container-column">
							<span className="marketing-consent-input-label">
								<FormattedMessage {...messages.thirdPartyMarketing}/>
								<i className="fa fa-asterisk" />
							</span>
							<span className="marketing-consent-input-description">
								<FormattedMessage {...messages.marketingCommunicationsFrom3rd}/>
							</span>
						</div>
					</div>
					<div className="marketing-consent-input-container">
						<div className="container-row">
							<Form.Field
								id="MarketingConsentForm-geoLocalization-yes-field"
								name="geoLocalization"
								type={FormalCheckbox}
								defaultValue={true}
								checked={model.geoLocalization}
							/>
						</div>
						<div className="container-column">
							<span className="marketing-consent-input-label">
								<FormattedMessage {...messages.geoLocalization}/>
								<i className="fa fa-asterisk" />
							</span>
							<span className="marketing-consent-input-description">
								<FormattedMessage {...messages.geoLocalizationForOffers}/>
							</span>
						</div>
					</div>
					<div className="marketing-consent-input-container">
						<div className="container-row">
							<Form.Field
								id="MarketingConsentForm-profiling-yes-field"
								name="profiling"
								type={FormalCheckbox}
								defaultValue={true}
								checked={model.profiling}
							/>
						</div>
						<div className="container-column">
							<span className="marketing-consent-input-label">
								<FormattedMessage {...messages.profiling}/>
								<i className="fa fa-asterisk" />
							</span>
							<span className="marketing-consent-input-description">
								<FormattedMessage {...messages.customerProfiling}/>
							</span>
						</div>
					</div>
					<div className="marketing-consent-input-container">
						<div className="container-row">
							<Form.Field
								id="MarketingConsentForm-thirdPartyEnrichment-yes-field"
								name="thirdPartyEnrichment"
								type={FormalCheckbox}
								defaultValue={true}
								checked={model.thirdPartyEnrichment}
							/>
						</div>
						<div className="container-column">
							<span className="marketing-consent-input-label">
								<FormattedMessage {...messages.thirdPartyEnrichment}/>
								<i className="fa fa-asterisk" />
							</span>
							<span className="marketing-consent-input-description">
								<FormattedMessage {...messages.enrichmentCustomer}/>
							</span>
						</div>
					</div>
					<div className="marketing-consent-input-container">
						<div className="container-row">
							<Form.Field
								id="MarketingConsentForm-thirdPartyTransfer-yes-field"
								name="thirdPartyTransfer"
								type={FormalCheckbox}
								defaultValue={true}
								checked={model.thirdPartyTransfer}
							/>
						</div>
						<div className="container-column">
							<span className="marketing-consent-input-label">
								<FormattedMessage {...messages.thirdPartyTransfer}/>
								<i className="fa fa-asterisk" />
							</span>
							<span className="marketing-consent-input-description">
								<FormattedMessage {...messages.transferOfCustomerData}/>
							</span>
						</div>
					</div>
					{standalone && (
						<Form.Button id="submit" type="submit">
							<FormattedMessage {...messages.save}/>
						</Form.Button>
					)}
					{!standalone && customConfirm}
				</Form>}
			</div>
		);
	}
}

export default withSchema(["marketingConsent"])(MarketingConsentForm);
