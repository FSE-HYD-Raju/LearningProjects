import { ComponentClass, ComponentType } from "react";
import { connect } from "react-redux";
import { AppState } from "../../redux/reducers";
import { HasFlux, HocResult, OmitUnsafe, ProductPath, MsisdnConfigurationValidation } from "../../redux/types";
import { Dispatch, AnyAction } from "redux";
import actions from "../../redux/actions";

interface WithProductOfferingConfigurationStateProps {
	characteristicsAliases: Record<string, string>;
	ICCIDPreactivationValidationPOs: Array<string>;
	msisdnConfiguration: MsisdnConfigurationValidation;
	isValidIccid?: boolean;
	isPreactivatedIccid?: boolean;
}

interface WithProductOfferingConfigurationActionsProps {
	actions: {
		setInputtedCharacteristic: (path: ProductPath, key: string, value: string) => void;
		setEnhancedCharacteristics: (path: ProductPath, key: string, valueArray: Array<{value: string}> | Array<string>) => void;
		resetConfigurations: () => void;
		resetValidIcc: () => void;
		triggerICCIDPreactivationValidation: (params: any) => void;
		triggerFnfValidation: (params: any) => void;
	};
}

type OwnProps<P> = HasFlux & OmitUnsafe<P, keyof WithProductOfferingConfigurationActionsProps>;
type WithProductOfferingConfigurationActionsResultProps<T> = HocResult<HasFlux, T, WithProductOfferingConfigurationActionsProps & WithProductOfferingConfigurationStateProps>;

const mapStateToProps = (state: AppState): WithProductOfferingConfigurationStateProps => {
	return {
		characteristicsAliases: state.feature.characteristicsAliases,
		ICCIDPreactivationValidationPOs: state.feature.ICCIDPreactivationValidationPOs,
		msisdnConfiguration: state.feature.msisdnConfiguration,
		isValidIccid: state.basket.isValidIccid, 
		isPreactivatedIccid: state.basket.isPreactivatedIccid,
	};
};

const mapDispatchToProps = <P>(dispatch: Dispatch<AnyAction>, ownProps: HasFlux): WithProductOfferingConfigurationActionsProps => {
	const flux = ownProps.flux;
	return {
		actions: {
			setInputtedCharacteristic: (path: ProductPath, key: string, value: string) => {
				dispatch(actions.productOfferingConfiguration.setInputtedCharacteristic(path, key, value));
			},
			setEnhancedCharacteristics: (path: ProductPath, key: string, valueArray: Array<{value: string}> | Array<string>) => {
				dispatch(actions.productOfferingConfiguration.setEnhancedCharacteristics(path, key, valueArray));
			},
			resetConfigurations: () => {
				dispatch(actions.productOfferingConfiguration.resetConfigurations());
			},
			resetValidIcc: flux.actions.BasketActions.resetValidIcc,
			triggerICCIDPreactivationValidation: flux.actions.BasketActions.triggerICCIDPreactivationValidation,
			triggerFnfValidation: flux.actions.BasketActions.triggerFnfValidation,
		},

	};
};

// this is required to omit flux property in component
const mergeProps = <P>(stateProps: WithProductOfferingConfigurationStateProps,
					dispatchProps: WithProductOfferingConfigurationActionsProps,
					ownProps: OwnProps<P>): P => {
	const { flux, ...restOwnProps} = ownProps as any;

	return {
		...stateProps,
		...dispatchProps,
		...restOwnProps,
	};
};

function withProductOfferingConfigurationActions<P = {}>(component: ComponentType<P>):
	ComponentClass<WithProductOfferingConfigurationActionsResultProps<P>> {

	const ConnectedComponent: ComponentClass<WithProductOfferingConfigurationActionsResultProps<P>> =
		connect<WithProductOfferingConfigurationStateProps, WithProductOfferingConfigurationActionsProps, OwnProps<P>, P, AppState>
		(mapStateToProps, mapDispatchToProps, mergeProps)(component) as any;
	return ConnectedComponent;
}

export default withProductOfferingConfigurationActions;
export {
	WithProductOfferingConfigurationActionsProps,
	WithProductOfferingConfigurationStateProps,
};
