"use strict";

import * as React from "react";
import { IntlProvider } from "react-intl";
import { connect } from "react-redux";
import { AppState } from "../redux";

// README: Needed for tests
const EN = "en";
const getLocale = (state: Partial<AppState> = {}) => state.consul ? (state.consul.locale || EN) : EN;
const getMessages = (state: Partial<AppState> = {}) => state.consul ? (state.consul.messages || {}) : {};

const mapStateToProps = (state: AppState, ownProps: IntlProvider.Props = {locale: EN}): IntlProvider.Props => {
	let locale = getLocale(state) || ownProps.locale;
	if (locale === "en") {
		/* in order to display currency symbol after sum european settings should be added in case of "en" locale */
		locale += "-DE";
	}
	return {
		...ownProps,
		locale: locale,
		messages: getMessages(state)
	};
};

export default connect(mapStateToProps)(IntlProvider);
