import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import MsisdnSelection, { MsisdnSelectionActionProps, MsisdnSelectionProps } from "./MsisdnSelection";

import {
	AppState, actions,
	MsisdnSelectionUseCase,
	MsisdnReservationCreate,
	MsisdnWithCost,
} from "../../redux";

interface MsisdnSelectionContainerProps {
	productId: string;
	msisdnPatternSearchInputValidation?: string;
	customReservationId?: string;
	msisdnPoCategoryId?: string;
}
const mapStateToProps = (state: AppState, props: MsisdnSelectionContainerProps): MsisdnSelectionProps => {
	return ({
		productId: props.productId,
		numberClassProductOfferings: state.msisdnSelection.productOfferings,
		msisdnReservationNumberCount: state.feature.msisdnReservationNumberCount,
		msisdnPatternSearchInputValidation: props.msisdnPatternSearchInputValidation || state.feature.msisdnPatternSearchInputValidation,
		selectedMsisdn: state.msisdnSelection.selectedMsisdn,
		msisdnsReservationsByUseCase: state.msisdnSelection.msisdnsReservationsByUseCase,
		customReservationId: props.customReservationId,
		msisdnPoCategoryId: props.msisdnPoCategoryId,
	});
};

type InitMsisdnsAction = (payload: { poId: string }) => void;

type ReserveMsisdnsAction = (payload: {
	msisdnSelectionUseCase: MsisdnSelectionUseCase;
	msisdnReservationCreate: MsisdnReservationCreate;
	reservedFor?: string;
	msisdnPoCategoryId?: string;
}) => void;

type ReleaseMsisdnsAction = (payload: {
	msisdnSelectionUseCase: MsisdnSelectionUseCase;
	reservedFor: string;
}) => void;

type SelectMsisdnAction = (payload: {
	msisdnSelectionUseCase: MsisdnSelectionUseCase;
	selectedMsisdn: MsisdnWithCost;
	poId: string;
}) => void;

type UpdateMsisdnAction = (payload: {
	selectedMsisdn: MsisdnWithCost;
}) => void;

interface MsisdnSelectionContainerActions {
	actions: {
		initMsisdns: InitMsisdnsAction;
		reserveMsisdns: ReserveMsisdnsAction;
		releaseMsisdns: ReleaseMsisdnsAction;
		selectMsisdn: SelectMsisdnAction;
		updateMsisdn: UpdateMsisdnAction;
		reserveMsisdnsByStock: ReserveMsisdnsAction;
	};
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): MsisdnSelectionContainerActions => ({
	actions: {
		initMsisdns: ({ poId }) =>
			dispatch(actions.msisdnSelection.init({
				poId
			})),
		reserveMsisdns: ({ msisdnSelectionUseCase, msisdnReservationCreate, reservedFor }) =>
			dispatch(actions.msisdnSelection.reserveMsisdns({
				msisdnSelectionUseCase,
				msisdnReservationCreate,
				reservedFor
			})),
		reserveMsisdnsByStock: ({ msisdnSelectionUseCase, msisdnReservationCreate, reservedFor, msisdnPoCategoryId }) =>
			dispatch(actions.msisdnSelection.reserveMsisdnsByStock({
				msisdnSelectionUseCase,
				msisdnReservationCreate,
				reservedFor,
				msisdnPoCategoryId
			})),
		releaseMsisdns: ({ msisdnSelectionUseCase, reservedFor }) =>
			dispatch(actions.msisdnSelection.releaseMsisdns({
				msisdnSelectionUseCase,
				reservedFor
			})),
		selectMsisdn: ({ msisdnSelectionUseCase, selectedMsisdn, poId }) =>
			dispatch(actions.msisdnSelection.selectMsisdn({
				msisdnSelectionUseCase,
				selectedMsisdn,
				poId
			})),
		updateMsisdn: ({ selectedMsisdn }) =>
			dispatch(actions.msisdnSelection.updateMsisdn({
				selectedMsisdn
			}))
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(MsisdnSelection);
export {
	MsisdnSelectionContainerActions,
	MsisdnSelectionContainerProps,
	MsisdnSelectionActionProps,
	ReleaseMsisdnsAction,
	MsisdnSelectionProps,
	ReserveMsisdnsAction,
	SelectMsisdnAction,
	UpdateMsisdnAction,
	InitMsisdnsAction,
};
