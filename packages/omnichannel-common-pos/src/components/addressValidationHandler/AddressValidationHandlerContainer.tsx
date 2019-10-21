import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";

import { AppState } from "../../redux";

import {
	PostalAddressValidationErrorsType,
	PostalAddressValidationErrorType,
	PostalAddress,
} from "../../redux/types";

import AddressValidationHandler, { AddressValidationHandlerStateProps, AddressValidationHandlerActionProps } from "./AddressValidationHandler";

interface AddressValidationHandlerContainerActionProps {
	actions: {
		proposalSelected: (model: PostalAddress, forceUpdateAddress: boolean) => void;
		cancel: () => void;
		parentSubmit: (model: PostalAddress, forceUpdateAddress: boolean) => void;
		applyInvalidAddress?: (isChecked: boolean) => void;
		onClose?: () => void;
	};
}

interface OwnProps extends AddressValidationHandlerContainerActionProps {
	addressValidationError?: PostalAddressValidationErrorsType;
	className?: string;
	containerRef?: React.RefObject<HTMLDivElement> | null;
	handlerType?: "modal" | "dropdown";
	displayConfirmation: boolean;
	model: Partial<PostalAddress>;
	skipProposals: boolean;
	allowInvalidAddress?: boolean;
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): AddressValidationHandlerStateProps => {
	const props: AddressValidationHandlerStateProps = {
		address: ownProps.model,
		containerRef: ownProps.containerRef || null,
		className: ownProps.className || "",
		handlerType: ownProps.handlerType || "modal",
		displayConfirmation: ownProps.displayConfirmation,
		skipProposals: ownProps.skipProposals,
		proposals: null,
		isValidationFailed: false,
		validationMandatory: false,
	};

	const { addressValidationError } = ownProps;
	if (addressValidationError) {
		const errors: PostalAddressValidationErrorType[] | undefined = addressValidationError.errors;

		const invalidPostalAddressError =
			errors &&
			errors.find((error: PostalAddressValidationErrorType) => error.code === "invalid-postal-address");
		props.isValidationFailed = !!invalidPostalAddressError;
		const proposals = (invalidPostalAddressError && invalidPostalAddressError.meta && invalidPostalAddressError.meta.proposals)
			? (invalidPostalAddressError.meta.proposals)
			: null;
		props.proposals = proposals;

		props.validationMandatory = Boolean(
			invalidPostalAddressError &&
			invalidPostalAddressError.meta &&
			invalidPostalAddressError.meta.validAddressMandatory) as boolean;
		props.allowInvalidAddress = !props.validationMandatory;
	}

	return props;
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: OwnProps): AddressValidationHandlerActionProps => {
	return {
		actions: {
			proposalSelected: ownProps.actions.proposalSelected,
			cancel: ownProps.actions.cancel,
			onClose: ownProps.actions.onClose,
			createCustomer: () => ownProps.actions.parentSubmit(ownProps.model, true),
			applyInvalidAddress: (isChecked: boolean) => ownProps.actions.applyInvalidAddress && ownProps.actions.applyInvalidAddress(isChecked),
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressValidationHandler);
