import {
	cssns,
	Flex,
	OcToggle,
	FormattedMessage, OcButton, OcButtonType,
} from "omnichannel-common-pos";
import { Component } from "react";
import messages from "../../index.messages";
import { get } from "lodash";
import PropTypes from "prop-types";
import R from "ramda";

const { React } = cssns("CustomerDetailsNotificationsEdit");

export default class CustomerDetailsNotificationsEdit extends Component {
	constructor(props) {
		super(props);

		this.state = {
			privacySettings: props.privacySettings
		};
	}

	static propTypes = {
		privacySettings: PropTypes.object,
		privacySettingsKeys: PropTypes.object,
		onSubmit: PropTypes.func
	};

	componentWillReceiveProps(nextProps) {
		const currentStatePrivacySettings = this.props.privacySettings;

		const nextStatePrivacySettings = nextProps.privacySettings;

		if (currentStatePrivacySettings !== nextStatePrivacySettings) {
			this.setState({ privacySettings: nextStatePrivacySettings });
		}
	}

	handleSubmit = () => {
		this.props.onSubmit(this.state.privacySettings);
	};

	toggleValue = field => {
		const privacySettings = R.clone(this.state.privacySettings) || {};
		privacySettings[field] = !privacySettings[field];
		privacySettings["own-marketing"] =
			privacySettings["own-marketing-email"] ||
			privacySettings["own-marketing-sms"] ||
			false;
		privacySettings[this.getMarketingKey()] =
			privacySettings[this.getMarketingKeyEmail()] ||
			privacySettings[this.getMarketingKeySms()] ||
			false;
		this.setState({ privacySettings });
	};

	getMarketingKey() {
		return (
			get(this.props.privacySettingsKeys, "thirdPartyMarketing") ||
			"third-party-marketing"
		);
	}

	getMarketingKeySms() {
		return (
			get(this.props.privacySettingsKeys, "thirdPartyMarketingSms") ||
			"third-party-marketing-sms"
		);
	}

	getMarketingKeyEmail() {
		return (
			get(this.props.privacySettingsKeys, "thirdPartyMarketingEmail") ||
			"third-party-marketing-email"
		);
	}

	render() {
		const model = this.state.privacySettings;

		const marketingKeySms = this.getMarketingKeySms();
		const marketingKeyEmail = this.getMarketingKeyEmail();

		const enabledLabel = (
			<FormattedMessage {...messages.enabledLabel} />
		);

		const disabledLabel = (
			<FormattedMessage {...messages.disabledLabel} />
		);

		return (
			<div style={{ width: "100%" }}>
				{/*}<Flex className="subDetails-field" wrap="nowrap">
					<div className="subDetails-field-name">
						<FormattedMessage {...messages.notifications} />
					</div>
					<div className="toggler">
						<OcToggle
							active={get(model, 'notifications')}
							handleClick={() => this.toggleValue('notifications')}
							disabledLabel={disabledLabel}
							enabledLabel={enabledLabel}
						/>
					</div>
				</Flex>
				*/}
				<Flex
					className="subDetails-field"
					wrap="nowrap"
					flex={1}
					style={{ margin: "20px 0" }}
				>
					<div className="subDetails-field-name">
						<FormattedMessage {...messages.marketingPermissions} />
					</div>
					<Flex direction="row" wrap="nowrap" flex={1}>
						<Flex
							flex={1}
							className="toggler"
							direction="column"
							alignItems="center"
						>
							<div
								style={{
									textAlign: "center",
									marginBottom: "4px"
								}}
							>
								<FormattedMessage {...messages.email} />
							</div>
							<OcToggle
								id="CustomerDetailsNotificationsEdit-toggler-own-marketing-email"
								active={get(model, "own-marketing-email")}
								handleClick={() =>
									this.toggleValue("own-marketing-email")}
								disabledLabel={disabledLabel}
								enabledLabel={enabledLabel}
							/>
						</Flex>
						<Flex
							flex={1}
							className="toggler"
							direction="column"
							alignItems="center"
						>
							<div
								style={{
									textAlign: "center",
									marginBottom: "4px"
								}}
							>
								<FormattedMessage {...messages.sms} />
							</div>
							<OcToggle
								id="CustomerDetailsNotificationsEdit-toggler-own-marketing-sms"
								active={get(model, "own-marketing-sms")}
								handleClick={() =>
									this.toggleValue("own-marketing-sms")}
								disabledLabel={disabledLabel}
								enabledLabel={enabledLabel}
							/>
						</Flex>
					</Flex>
				</Flex>
				<Flex
					className="subDetails-field"
					wrap="nowrap"
					flex={1}
					style={{ margin: "20px 0" }}
				>
					<div className="subDetails-field-name">
						<FormattedMessage {...messages.thirdPartyMarketing} />
					</div>
					<Flex direction="row" wrap="nowrap" flex={1}>
						<Flex
							flex={1}
							className="toggler"
							direction="column"
							alignItems="center"
						>
							<div
								style={{
									textAlign: "center",
									marginBottom: "4px"
								}}
							>
								<FormattedMessage {...messages.email} />
							</div>
							<OcToggle
								id="CustomerDetailsNotificationsEdit-toggler-third-party-marketing-email"
								active={get(model, marketingKeyEmail)}
								handleClick={() =>
									this.toggleValue(marketingKeyEmail)}
								disabledLabel={disabledLabel}
								enabledLabel={enabledLabel}
							/>
						</Flex>
						<Flex
							flex={1}
							className="toggler"
							direction="column"
							alignItems="center"
						>
							<div
								style={{
									textAlign: "center",
									marginBottom: "4px"
								}}
							>
								<FormattedMessage {...messages.sms} />
							</div>
							<OcToggle
								id="CustomerDetailsNotificationsEdit-toggler-third-party-marketing-sms"
								active={get(model, marketingKeySms)}
								handleClick={() =>
									this.toggleValue(marketingKeySms)}
								disabledLabel={disabledLabel}
								enabledLabel={enabledLabel}
							/>
						</Flex>
					</Flex>
				</Flex>
				<Flex
					direction="row-reverse"
					className="action-buttons"
					style={{ marginRight: "30px" }}
				>
					<OcButton
						htmlBtnType="submit"
						buttonType={OcButtonType.SUCCESS}
						onClick={this.handleSubmit}
					>
						<FormattedMessage {...messages.save} />
					</OcButton>
				</Flex>
			</div>
		);
	}
}
