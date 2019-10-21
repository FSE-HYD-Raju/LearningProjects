"use strict";
import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { AppState, LocaleItem } from "../../../redux";
import actions from "../../../redux/actions";
import { default as Langs, LangsActionProps, LangsOwnProps, LangsStateProps } from "./Langs";

const mapStateToProps = (state: AppState, props: LangsOwnProps): LangsStateProps & LangsOwnProps => {
	return {
		locale: state.consul.locale,
		locales: state.consul.locales,
		...props
	};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): LangsActionProps => {
	return {
		actions: {
			changeLanguage: (locale: LocaleItem, saveInCookie: boolean = false) => {
				dispatch(actions.consul.changeLanguage(locale, saveInCookie));
			}
		}
	};
};

const ChangeLanguage: React.ComponentClass<LangsOwnProps> = connect(
	mapStateToProps,
	mapDispatchToProps
)(Langs);

export default ChangeLanguage;
