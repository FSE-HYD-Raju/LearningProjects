import * as React from "react";
import NominationSearchInput, {
	NominationSearchInputActionProps,
	NominationSearchInputStateProps
} from "./NominationSearchInput";
import { NominationCharacteristics, ProductPath, NominationType } from "../../../redux/types";
import { AppState } from "../../../redux/reducers";
import { connect } from "react-redux";
import { Dispatch, AnyAction } from "redux";
import actions from "../../../redux/actions";
import { get } from "lodash";

interface NominationSearchInputContainerOwnProps {
	path: ProductPath;
}

const mapStateToProps = (state: AppState, ownProps: NominationSearchInputContainerOwnProps): NominationSearchInputStateProps => {
	let posNominationSubscriptionInformation: NominationType | null =  null;

	if (ownProps.path && ownProps.path[0] && ownProps.path[0].po) {
		const firstPathElement: string = ownProps.path[0].po!;
		posNominationSubscriptionInformation = get(state.productOfferingConfiguration.nominationSubscriptionInformation, firstPathElement);
	}

	return {
		path: ownProps.path,
		posNominationSubscriptionInformation,
		nominationPOCharacteristics: state.feature.nominationPOCharacteristics && state.feature.nominationPOCharacteristics!.characteristics,
	};

};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, ownProps: NominationSearchInputContainerOwnProps): NominationSearchInputActionProps => ({
	actions: {
		resetConfigurations: () => {
			dispatch(actions.productOfferingConfiguration.resetConfigurations());
		},
		nominationSearch: (searchTerm: string, path: ProductPath, nominationCharacteristics: NominationCharacteristics) => {
			dispatch(actions.productOfferingConfiguration.nominationSearch(searchTerm, path, nominationCharacteristics));
		},
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(NominationSearchInput);
export {
	NominationSearchInputContainerOwnProps
};
