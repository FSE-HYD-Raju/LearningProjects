import { cssns, Flex, FormattedMessage } from "omnichannel-common-pos";
import classnames from "classnames";
import PropTypes from "prop-types";
import messages from "../../index.messages";
import _ from "lodash";

const { React } = cssns("CustomerDetailsView");

const CustomerDetailsNotificationsShow = props => {
	/* usually 'privacySettings' from CustomerCaseStore.activeCustomerCase.attributes.activeCustomer */
	const { privacySettings, privacySettingsKeys } = props;

	const marketingKeySms =
		_.get(privacySettingsKeys, "thirdPartyMarketingSms") ||
		"third-party-marketing-sms";

	const marketingKeyEmail =
		_.get(privacySettingsKeys, "thirdPartyMarketingEmail") ||
		"third-party-marketing-email";

	const marketingPermissions = {
		email: _.get(privacySettings, "own-marketing-email"),
		phone: _.get(privacySettings, "own-marketing-sms")
	};

	const thirdPartyMarketingPermissions = {
		email: _.get(privacySettings, marketingKeyEmail),
		phone: _.get(privacySettings, marketingKeySms)
	};

	return (
		<div>
			<Flex className="subDetails-field">
				<span className="subDetails-field-name">
					<FormattedMessage {...messages.marketingPermissions} />
				</span>
				<span>
					<span
						className={classnames({
							"marketing-allowed": marketingPermissions.email,
							"marketing-not-allowed": !marketingPermissions.email
						})}
					>
						{marketingPermissions.email ? (
							<i
								id="CustomerDetailsNotificationsShow-marketing-permissions-email-allowed"
								className="fa fa-check btn-icon-left"
							/>
						) : (
							<i
								id="CustomerDetailsNotificationsShow-marketing-permissions-email-not-allowed"
								className="fa fa-ban btn-icon-left"
							/>
						)}
						<FormattedMessage {...messages.email} />
					</span>
					<span
						className={classnames({
							"marketing-allowed": marketingPermissions.phone,
							"marketing-not-allowed": !marketingPermissions.phone
						})}
					>
						{marketingPermissions.phone ? (
							<i
								id="CustomerDetailsNotificationsShow-marketing-permissions-phone-allowed"
								className="fa fa-check btn-icon-left"
							/>
						) : (
							<i
								id="CustomerDetailsNotificationsShow-marketing-permissions-phone-not-allowed"
								className="fa fa-ban btn-icon-left"
							/>
						)}
						<FormattedMessage {...messages.sms} />
					</span>
				</span>
			</Flex>
			<Flex className="subDetails-field">
				<span className="subDetails-field-name">
					<FormattedMessage {...messages.thirdPartyMarketing} />
				</span>
				<span>
					<span
						className={classnames({
							"marketing-allowed":
								thirdPartyMarketingPermissions.email,
							"marketing-not-allowed": !thirdPartyMarketingPermissions.email
						})}
					>
						{thirdPartyMarketingPermissions.email ? (
							<i
								id="CustomerDetailsNotificationsShow-third-party-marketing-email-allowed"
								className="fa fa-check btn-icon-left"
							/>
						) : (
							<i
								id="CustomerDetailsNotificationsShow-third-party-marketing-email-not-allowed"
								className="fa fa-ban btn-icon-left"
							/>
						)}
						<FormattedMessage {...messages.email} />
					</span>
					<span
						className={classnames({
							"marketing-allowed":
								thirdPartyMarketingPermissions.phone,
							"marketing-not-allowed": !thirdPartyMarketingPermissions.phone
						})}
					>
						{thirdPartyMarketingPermissions.phone ? (
							<i
								id="CustomerDetailsNotificationsShow-third-party-marketing-phone-allowed"
								className="fa fa-check btn-icon-left"
							/>
						) : (
							<i
								id="CustomerDetailsNotificationsShow-third-party-marketing-phone-not-allowed"
								className="fa fa-ban btn-icon-left"
							/>
						)}
						<FormattedMessage {...messages.sms} />
					</span>
				</span>
			</Flex>
		</div>
	);
};

CustomerDetailsNotificationsShow.propTypes = {
	privacySettings: PropTypes.object,
	privacySettingsKeys: PropTypes.object
};

export default CustomerDetailsNotificationsShow;
