import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	AltContainer,
	ErrorModalContainer,
	isClient,
	NavBarContainer,
	SessionStatePollingIFrameContainer,
	ToasterContainer,
	VersionInformationContainer,
	WindowSize,
	IntlContainer,
	ChannelUtils,
	contextTypesValidationMap,
	LoadingOverlayContainer,
	CommonCustomizationPoints,
	withCustomization,
	EmptyComponent,
	actions,
	AuthUtils,
	UrlUtil,
} from "omnichannel-common-pos";
import { CustomerCaseBar, CustomerCreationModalContainer } from "omnichannel-service-desk";
import moment from "moment";
import TopBarContainerPOS from "../components/topBar/TopBarContainerPOS";
import { get, find, isArray, isEqual } from "lodash";
import AppBodyRoutes from "../routes/AppBodyRoutes";

const { clientIntl, setAxiosInterceptor } = ChannelUtils;

const CmsPreviewContent = withCustomization(CommonCustomizationPoints.CMS_PREVIEW_CONTENT, EmptyComponent);
const CmsAssetLibrary = withCustomization(CommonCustomizationPoints.CMS_ASSET_LIBRARY, EmptyComponent);

class App extends React.Component {
	static displayName = "POSRootComponent";

	static propTypes = {
		children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
		user: PropTypes.object,
		translations: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
		messages: PropTypes.object,
		locale: PropTypes.string,
		locales: PropTypes.array,
		UserActions: PropTypes.object,
		SalesRepSessionActions: PropTypes.object,
		ConsulStore: PropTypes.object,
		CMSAdminStore: PropTypes.object,
		ConsulActions: PropTypes.object,
		SessionActions: PropTypes.object,
		UserStore: PropTypes.object,
		CustomerCaseStore: PropTypes.object,
		location: PropTypes.object,
		flux: PropTypes.object,
		store: PropTypes.object,
		actions: PropTypes.object,
	};

	static contextTypes = contextTypesValidationMap;

	static childContextTypes = {
		location: PropTypes.object
	};

	getChildContext() {
		return {
			location: this.props.location
		};
	}

	constructor(props, context) {
		super(props, context);
		setAxiosInterceptor({
			flux: props.flux,
			store: props.store,
			intl: context.intl
		});
		this.state = {
			locales: []
		};
	}

	componentWillMount() {
		if (AuthUtils.isCmsUser(this.context.flux.reduxStore.getState())) {
			this.context.flux.actions.CMSAdminActions.initData();
		}
		const { location: { search = "" } } = this.props;
		const queryString = UrlUtil.getQueryString(search, "?");

		if (queryString) {
			const searchParams = new URLSearchParams(queryString);
			if (searchParams.get("toolmode") !== null) {
				this.context.flux.reduxStore.dispatch(actions.navBar.toggleToolmode(true));

				const language = searchParams.get("language");
				if (language) {
					this.context.flux.reduxStore.dispatch(actions.navBar.toggleToolmodeLanguage(language));
				}
				this.props.UserActions.setToolmodeId(searchParams.get("individualId") || "");
				const customerAccountId = searchParams.get("customerAccountId");
				if (customerAccountId) {
					this.props.actions.setActiveCustomerAccount({ id: customerAccountId })
				}
			}
			this.props.UserActions.setToolmodeId(searchParams.get("individualId") || "");

			const language = searchParams.get("language") || this.context.flux.reduxStore.getState().navBar.toolmodeLanguage;

			if (language) {
				// Try to find locale first using iso6392 code (e.g eng, rus, ukr)
				// and as backup using 2 letter format, e.g en, ru, uk
				const localeObject = find(this.props.ConsulStore.locales, locale => {
						return locale.iso6392 === language;
					}) || find(this.props.ConsulStore.locales, locale => {
						return locale.locale === language;
					});

				if (localeObject) {
					this.context.flux.actions.ConsulActions.changeLanguage(localeObject);
				}
			}
		}

		this.props.UserActions.checkUsers();

		this.setState({
			locales: this.props.ConsulStore.locales
		});

		this.props.ConsulStore.locales.forEach(loc => {
			// locales should have been gotten serverside
			// so add localedata to client here
			clientIntl(loc.locale);
		});
		moment.locale(this.props.ConsulStore.locale);
	}

	componentWillReceiveProps(newprops) {
		if (!isEqual(newprops.ConsulStore.locale, this.props.ConsulStore.locale)) {
			// change locale for moment
			moment.locale(newprops.ConsulStore.locale);
		}
		if (process.env.NODE_ENV === "development" && isClient) {
			if (isEqual(newprops.ConsulStore.locales, this.props.ConsulStore.locales)) {
				newprops.ConsulStore.locales.forEach(loc => {
					clientIntl(loc.locale);
				});
			}
		}

		if (newprops.UserStore.user && !isEqual(newprops.UserStore.user, this.props.UserStore.user)) {
			if (AuthUtils.isCmsUser(this.context.flux.reduxStore.getState())) {
				this.context.flux.actions.CMSAdminActions.initData();
			}
		}
	}

	render() {
		const { UserStore } = this.context.flux.stores;
		const globalStyles = get(this.context.flux.reduxStore.getState().cms, "styles");
		const { user } = UserStore.state;
		const reduxState = this.context.flux.reduxStore.getState();
		const authStore = reduxState.auth;
		const isCmsUser = user && AuthUtils.isCmsUser(reduxState);
		const shouldRenderSessionStatePoller = user && authStore.sessionCheckEnabled && authStore.sessionCheckIntervalSeconds
			&& authStore.clientId && get(authStore, "openIdConfiguration.check_session_iframe");

		return (
			<IntlContainer>
				<div className="pos-app-container">
					<CustomerCreationModalContainer />
					<AltContainer component={WindowSize} />
					<style>{this.props.ConsulStore.styles}</style>
					{isArray(globalStyles) &&
						globalStyles.map(style => {
							return <style>{style.css || ""}</style>;
						})}
					{!this.context.flux.reduxStore.getState().navBar.toolmode ? (
						<div className="pos-page-container">
							{reduxState.customerCase.activeCustomerCase && reduxState.location.locationSelectionEnabled && (
								<TopBarContainerPOS/>
							)}

							<header className="qvantel-page-header pos-page-header">
								<CmsPreviewContent isCmsUser={isCmsUser}/>
								<NavBarContainer/>
								{this.props.CustomerCaseStore && this.props.CustomerCaseStore.activeCustomerCase && (
									<AltContainer
										stores={{
											CustomerCaseStore: this.context.flux.stores.CustomerCaseStore,
											UserStore: this.context.flux.stores.UserStore
										}}
										actions={{
											CustomerCaseActions: this.context.flux.actions.CustomerCaseActions,
											SalesActions: this.context.flux.actions.SalesActions,
											UserActions: this.context.flux.actions.UserActions,
											BasketActions: this.context.flux.actions.BasketActions,
										}}
										component={CustomerCaseBar}
									/>
								)}
								<ErrorModalContainer />
							</header>

							<AppBodyRoutes flux={this.props.flux} store={this.props.store} />

							<ToasterContainer />
							<LoadingOverlayContainer />

							<CmsAssetLibrary isCmsUser={isCmsUser}/>
							<VersionInformationContainer />
							{shouldRenderSessionStatePoller && <SessionStatePollingIFrameContainer />}
						</div>
					) : (
						<AppBodyRoutes flux={this.props.flux} store={this.props.store} />
					)}
				</div>
			</IntlContainer>
		);
	}
}

const mapDispatchToProps = dispatch  =>({
	actions: {
		setActiveCustomerAccount: customerAccount => dispatch(actions.customer.setActiveCustomerAccount(customerAccount)),
	}
})

export default connect(null, mapDispatchToProps)(App);