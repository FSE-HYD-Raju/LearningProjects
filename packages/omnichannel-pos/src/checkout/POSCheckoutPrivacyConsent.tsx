import {
	cssns,
	FormattedMessage,
} from "omnichannel-common-pos";
import messages from "../posMessages";
import SelectPrivacyConsent from "./SelectPrivacyConsent";
const { React } = cssns("POSCheckoutPrivacyConsent");

interface PrivacyConsent {
	source: string;
	name: string;
	description: string;
}

interface POSCheckoutPrivacyConsentProps {
	privacyConsents: Array<PrivacyConsent>;
	privacyConsentKeys: Array<string>;
	changeHandler: () => void;
	selectedConsents: { [key: string]: boolean };
}

const POSCheckoutPrivacyConsent: React.FC<POSCheckoutPrivacyConsentProps> = (props: POSCheckoutPrivacyConsentProps) => {
	const { privacyConsents, changeHandler, privacyConsentKeys } = props;
	return (
		<div className="privacy-consent">
			<h3>
				<FormattedMessage {...messages.privacyConsent} />
			</h3>
			<div className="container">
				<form>
					{privacyConsents && privacyConsents.map((item: PrivacyConsent, index: number) => {
						const { source, name, description } = item;
						const key: string = privacyConsentKeys[index];
						return item && source === "user" ? (
							<SelectPrivacyConsent name={name} description={description}
								inputCharacteristicKey={key} changeHandler={changeHandler} />
						) : null;
					})
					}
				</form>
			</div>
		</div>
	);
};

export default POSCheckoutPrivacyConsent;
export {
	POSCheckoutPrivacyConsentProps,
};
