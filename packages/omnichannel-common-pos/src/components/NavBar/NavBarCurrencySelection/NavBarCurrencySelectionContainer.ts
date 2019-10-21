"use strict";

import * as React from "react";
import { Dispatch, AnyAction } from "redux";
import { connect } from "react-redux";
import { AppState } from "../../../redux";
import actions from "../../../redux/actions";

import NavBarCurrencySelection, { CurrencySelectionStateProps, CurrencySelectionActionProps } from "./NavBarCurrencySelection";

const mapStateToProps = (state: AppState): CurrencySelectionStateProps => ({
	currencies: state.currency.currencies,
	selectedCurrency: state.currency.selectedCurrency
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): CurrencySelectionActionProps => ({
	actions: {
		changeCurrency: (selectedCurrency: string) => {
			dispatch(actions.currency.changeCurrency(selectedCurrency));
		}
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBarCurrencySelection);
