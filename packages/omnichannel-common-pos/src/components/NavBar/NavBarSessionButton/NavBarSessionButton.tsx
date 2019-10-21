import OcModal from "../../ocComponents/OcModal";
import OcSelect from "../../ocComponents/OcSelect";
import cssns from "../../../utils/cssnsConfig";
import { FC } from "react";
import { ContextType, contextTypesValidationMap } from "../../../types";
import { User, Basket } from "../../../redux";
import { SyntheticEvent } from "react";
import messages from "./NavBarSessionButton.messages";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
import { OcButton, OcButtonType } from "../../ocComponents/button/OcButton";

const { React } = cssns("NavBarSessionButton");

interface NavBarSessionButtonStateProps {
	error?: {
		errors: Array<{ status: string; title: string }>;
	};
	salesOrganizationRoleId: string;
	active: boolean;
	consulValuesLoaded: boolean;
	showSalesOrganizationModal: boolean;
	selectedTerminal?: string;
	showModal: boolean;
	terminals: any[];
	user?: User;
	userRoleId: string;
	activeBasket?: Basket;
}

interface NavBarSessionButtonActionsProps {
	actions: {
		clearSalesRepSession: () => void;
		showModal: (show: boolean) => void;
		updateInfo: (params: { name: string; value: string }) => void;
		clearSalesOrganizationAndInventory: () => void;
	};
}

type NavBarSessionButtonProps = NavBarSessionButtonStateProps & NavBarSessionButtonActionsProps;

const NavBarSessionButton: FC<NavBarSessionButtonProps> = (props: NavBarSessionButtonProps, context: ContextType) => {
	const {
		actions,
		error,
		salesOrganizationRoleId,
		active,
		consulValuesLoaded,
		showSalesOrganizationModal,
		selectedTerminal,
		showModal,
		terminals,
		userRoleId,
		user,
		activeBasket
	} = props;

	const { formatMessage } = context.intl;

	const closeModal = () => {
		error ? actions.clearSalesRepSession() : actions.showModal(false);
	};

	const handleClick = () => {
		actions.updateInfo({
			name: "userRoleId",
			value: userRoleId
		});
		actions.updateInfo({
			name: "salesOrganizationRoleId",
			value: salesOrganizationRoleId
		});
		actions.showModal(true);
	};

	const handleSelectedTerminalChange = (e: SyntheticEvent<any>) => {
		actions.updateInfo({
			name: (e.target as any).name,
			value: (e.target as any).value
		});
	};

	const handleContinueAfterSelectionClick = () => {
	};

	return (
		<div id="NavBarSessionButton" className="NavBarSessionButton">
			<div>
				{user ? (
					active ? (
						<a
							onClick={() => {
							}}
							href="javascript:"
						>
							{formatMessage(messages.endSession)}
						</a>
					) : (
						<a id="NavBarSessionButton-start-session" onClick={handleClick} href="javascript:">
							{formatMessage(messages.startSession)}
						</a>
					)
				) : (
					""
				)}
			</div>
			{consulValuesLoaded &&
				showSalesOrganizationModal &&
				!active &&
				!activeBasket && (
					<div>
						<a
							onClick={() => {
								actions.clearSalesOrganizationAndInventory();
							}}
							id="NavBarChangeSalesOrgButton"
							href="javascript:;"
						>
							<FormattedMessage {...messages.changesSalesOrganization} />
						</a>
					</div>
				)}

			<OcModal
				showModal={showModal}
				largeModal={true}
				onClose={closeModal}
				title={<FormattedMessage {...messages.startSessionSalesrep} />}
			>
				<div>
					{terminals.length > 0 && (
						<span>
							<OcSelect
								id="selectedTerminal"
								name="selectedTerminal"
								placeholder={formatMessage(messages.selectTerminal)}
								defaultValue={selectedTerminal || ""}
								onChange={handleSelectedTerminalChange}
							>
								{terminals.map(t => {
									return (
										<option value={t.id} key={t.id}>
											{t.name}
										</option>
									);
								})}
							</OcSelect>
							{selectedTerminal !== "" && (
								<OcButton
									id="continueAfterTeminalSelection"
									buttonType={OcButtonType.PRIMARY}
									disabled={!salesOrganizationRoleId || !selectedTerminal}
									onClick={handleContinueAfterSelectionClick}
								>
									<FormattedMessage {...messages.startSession} />
								</OcButton>
							)}
						</span>
					)}
				</div>
				{error && (
					<div className="alert alert-danger">
						{(error.errors || []).map(err => {
							return <div key={err.title}>{err.status + " " + err.title}</div>;
						})}
					</div>
				)}
			</OcModal>
		</div>
	);
};

NavBarSessionButton.contextTypes = contextTypesValidationMap;
export default NavBarSessionButton;
export {
	NavBarSessionButtonProps,
	NavBarSessionButtonStateProps,
	NavBarSessionButtonActionsProps,
};
