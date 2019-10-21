import { get, truncate } from "lodash";
import { FormattedMessage } from "../../channelUtils";
import cssns from "../../utils/cssnsConfig";
import RefreshButton from "./RefreshButton";
import { PureComponent, ReactNode } from "react";
import { Agreement, User } from "../../redux/types";
import messages from "./Agreement.messages";
import OcModal from "../ocComponents/OcModal";

const { React } = cssns("ActiveAgreementSelect");

interface ActiveAgreementSelectStateProps {
	agreements?: Array<Agreement>;
	isBasketRefreshing: boolean;
	activeAgreementId?: string;
	basketLifeCycleStatusOpen?: boolean;
	customer?: User;
	hasBasketItems?: boolean;
}

interface ActiveAgreementSelectActionProps {
	actions: {
		changeActiveAgreement: (agreementCandidate?: string | null, discardBasket?: boolean) => void;
		getAgreements?: (user: User) => void;
	};
}

type ActiveAgreementSelectProps = ActiveAgreementSelectStateProps & ActiveAgreementSelectActionProps;

interface ActiveAgreementSelectState {
	agreementCandidate?: string | null;
	showConfirmationModal?: boolean;
}

class ActiveAgreementSelect extends PureComponent<ActiveAgreementSelectProps, ActiveAgreementSelectState> {
	static displayName: string = "ActiveAgreementSelect";

	static defaultProps: Partial<ActiveAgreementSelectProps> = {
		agreements: [],
		basketLifeCycleStatusOpen: true,
		hasBasketItems: false
	};

	constructor(props: ActiveAgreementSelectProps) {
		super(props);
		this.state = {
			showConfirmationModal: false,
			agreementCandidate: undefined,
		};
	}

	agreementChanged = (agreementCandidate?: string): void => {
		// Change without confirmation if basket does not contain items
		this.props.hasBasketItems
			? this.setState({
					agreementCandidate,
					showConfirmationModal: true
				})
			: this.props.actions.changeActiveAgreement(agreementCandidate);
	};

	handleChangeActiveAgreement = (): void => {
		this.props.actions.changeActiveAgreement(this.state.agreementCandidate, true);

		this.setState({
			showConfirmationModal: false,
			agreementCandidate: null
		});
	};

	closeAgreementChangeConfirmationModal = (): void => {
		this.setState({
			showConfirmationModal: false,
			agreementCandidate: null
		});
	};

	truncateAgreementId = (agreementId: string): string =>
		truncate(agreementId, { length: 30 });

	getFormattedId = () => {
		const activeAgreement = this.props.agreements
            && this.props.agreements.find(agreement =>
				agreement.id === this.props.activeAgreementId);
				
		return activeAgreement ? (this.truncateAgreementId(activeAgreement.attributes.referenceNumber))
				: (<FormattedMessage {...messages.selectedAgreementNew}/>);
	};

	refreshAgreements = () => {
		if (this.props.customer && this.props.actions.getAgreements) {
			this.props.actions.getAgreements(this.props.customer);
		}
	};

	renderConfirmationModal = (): ReactNode => {
		const backdropStyle = { zIndex: 1050 }; // really?

		return (
			<OcModal
				className="ActiveAgreementSelect"
				showModal={this.state.showConfirmationModal}
				smallModal={true}
				backdropStyle={backdropStyle}
				title={<FormattedMessage {...messages.agreementChangeConfirmation}/>}
				onClose={this.closeAgreementChangeConfirmationModal}
				onOk={this.handleChangeActiveAgreement}
				okButtonLabel={<FormattedMessage {...messages.changeAgreement}/>}
			>
				<div className="inner-container">
					<p className="confirmBasketDiscardText">
						<FormattedMessage {...messages.changingAgreementDiscards}/>
					</p>
					<p className="confirmBasketDiscardText">
						<FormattedMessage {...messages.areYouSureToChange}/>
					</p>
				</div>
			</OcModal>
		);
	};

	render() {
		const validAgreements = this.props.agreements ? this.props.agreements.filter(
			(agreement: Agreement) => get(agreement, "attributes.lifeCycleStatus", "") === "ACTIVE") : [];

		return (
			<div className="container">
				{this.state.showConfirmationModal && this.renderConfirmationModal()}
				<div className="agreement">
					{this.props.basketLifeCycleStatusOpen ? (
						<div className="agreement-select-container">
							<label htmlFor="minibasket-agreement-select">
								<FormattedMessage {...messages.minibasketForAgreement}/>
							</label>
							<select
								id={"minibasket-agreement-select"}
								className={"minibasket-agreement-select custom-select"}
								required={false}
								value={(this.props.activeAgreementId || "")}
								onChange={(e: any) => {
									const eTargetValue: any = validAgreements.find((agreement: Agreement) =>
										agreement.id === e.target.value
									);
									this.agreementChanged(eTargetValue ? eTargetValue.id : null); }}
							>
								<FormattedMessage {...messages.selectNewAgreement} tagName="option" />
								{validAgreements.map((agreement: Agreement) => {
									return (
										<option
											key={`mini-basket-agreement-select-${agreement.id}`}
											value={agreement.id}
											id={`mini-basket-agreement-select-id-${agreement.id}`}
										>
											{agreement.attributes && agreement.attributes.referenceNumber || this.truncateAgreementId(agreement.id)}
										</option>
									);
								})}
							</select>
						</div>
					) : (
						<div className="selectedAgreement">
							<div className="forAgreementLabel">
								<FormattedMessage {...messages.forAgreement}/>
							</div>
							<div className="selectedAgreementId">
								{this.getFormattedId()}
							</div>
						</div>
					)}
				</div>
				{this.props.customer && (
					<div className="refresh">
						<RefreshButton
							refresh={this.refreshAgreements}
							updating={this.props.isBasketRefreshing}
							buttonId="refreshButton"
						/>
					</div>
				)}
			</div>
		);
	}
}

export default ActiveAgreementSelect;
export {
	ActiveAgreementSelectProps,
	ActiveAgreementSelectStateProps,
	ActiveAgreementSelectActionProps,
	ActiveAgreementSelectState
};
