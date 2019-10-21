import * as R from "react";
import cssns from "../../../../../utils/cssnsConfig";
import messages from "./ChangePlanSummary.messages";
import FormattedMessage from "../../../../../channelUtils/FormattedMessage";
import OcModal from "../../../../ocComponents/OcModal";
import { PhoneNumberSectionContainer } from "./PhoneNumberSectionContainer";
import { FeeSectionContainer } from "./FeeSectionContainer";
import { PaymentSectionContainer } from "./PaymentSectionContainer";
import { PlansInfoSection } from "./PlansInfoSection";
import { AffectedServicesSectionContainer } from "./AffectedServicesSectionContainer";

const React = cssns("ChangePlanSummary").React as typeof R;

const ChangePlanWarning = () => (
	<div className="warning-section">
		<i className="fa fa-exclamation-circle" />
		<FormattedMessage {...messages.changePlanWarning} />
	</div>
);

interface ChangePlanSummaryModalStateProps {
	isProceedWithChangePlanEnabled: boolean;
}
interface ChangePlanSummaryModalActionProps {
	actions: {
		cancel: () => void;
		proceed: () => void;
	};
}
interface ChangePlanSummaryModalProps extends ChangePlanSummaryModalStateProps, ChangePlanSummaryModalActionProps {}
const ChangePlanSummaryModal: React.SFC<ChangePlanSummaryModalProps> = props => (
	<OcModal
		title={<FormattedMessage {...messages.modalTitle} />}
		showModal={true}
		bsSize="lg"
		onClose={props.actions.cancel}
		onOk={props.actions.proceed}
		okButtonLabel={<FormattedMessage {...messages.changePlanButtonText} />}
		okDisabled={!props.isProceedWithChangePlanEnabled}
	>
		<div className="this">
			<h4>
				<FormattedMessage {...messages.planComparisonSection} />
			</h4>
			<PhoneNumberSectionContainer />
			<PlansInfoSection />

			<AffectedServicesSectionContainer />
			<h4>
				<FormattedMessage {...messages.paymentSection} />
			</h4>
			<FeeSectionContainer />
			<PaymentSectionContainer />
			<ChangePlanWarning />
		</div>
	</OcModal>
);

export {
	ChangePlanSummaryModal,
	ChangePlanSummaryModalStateProps,
	ChangePlanSummaryModalActionProps,
	ChangePlanSummaryModalProps,
};
