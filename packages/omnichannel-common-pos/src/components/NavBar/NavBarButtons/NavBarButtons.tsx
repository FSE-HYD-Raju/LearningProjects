import { RouteComponentProps, StaticContext, withRouter } from "react-router";
import cssns from "../../../utils/cssnsConfig";
import { Link } from "react-router-dom";
import * as classnames from "classnames";
import { get, pick } from "lodash";
import { LoginDropdown } from "../../login/LoginDropdown";
import BasketMenuContainer from "../../basket/BasketMenuContainer";
import OcDropdown from "../../ocComponents/OcDropdown";
import NavBarButton from "../NavBarButton/NavBarButton";
import NavBarCurrencySelectionContainer from "../NavBarCurrencySelection/NavBarCurrencySelectionContainer";
import ChangeLanguage from "../ChangeLanguage/ChangeLanguage";
import OnClickOut, { HandleClickOutside, InjectedOnClickOutProps, OnClickOutProps } from "react-onclickoutside";
import { Person } from "../../../redux";
import { isChannelB2c, isChannelPos } from "../../../utils/Channel.utils";
import IntlContainer from "../../../channelUtils/IntlContainer";
import LoginContainerRedux from "../../login/LoginContainerRedux";
import { commonServiceDeskRoutes, commonShopRoutes } from "../../../routes/commonRoutesMap";
import { ContextType, contextTypesValidationMap } from "../../../types";
import messages from "./NavBarButtons.messages";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
const { React } = cssns("NavBarButtons");

interface NavBarButtonsState {
	confirmModalVisible: boolean;
	showLogin: boolean;
	showRegistrationModal: boolean;
	showMobileNavigation: boolean;
}

interface NavBarButtonsActionProps {
	actions: {
		// from NavBarActions
		hideAll: () => void;
		toggleLogin: () => void;
		toggleBasketMenu: () => void;
		toggleMobileNavigation: () => void;
		// from UserActions
		aaLogin: () => void;
	};
}

interface NavBarButtonsStateProps {
	showBasket?: boolean;
	showBasketMenu?: boolean;
	showLogin?: boolean;
	showMobileNavigation?: boolean;
	salesRepUser?: Person;
	user?: Person;
	basketItems?: any[];
	isBasketAfterPayment?: boolean;
	registrationFormEnabled?: boolean;
	haveMultipleCurrencies: boolean;
	haveMultipleLanguages: boolean;
}

type NavBarButtonsProps = NavBarButtonsActionProps &
	NavBarButtonsStateProps &
	InjectedOnClickOutProps &
	RouteComponentProps<any>;

class NavBarButtons extends React.Component<NavBarButtonsProps, NavBarButtonsState> implements HandleClickOutside<any> {
	static displayName = "NavBarButtons";
	static contextTypes = contextTypesValidationMap;

	constructor(props: NavBarButtonsProps, context: ContextType) {
		super(props, context);
		if (process.env.BROWSER) {
			props.enableOnClickOutside();
		}

		this.state = {
			confirmModalVisible: false,
			showLogin: false,
			showRegistrationModal: false,
			showMobileNavigation: false
		};
	}

	handleClickOutside: React.MouseEventHandler<any> = () => {
		this.props.actions.hideAll();
	};

	componentWillUnmount() {
		this.props.actions.hideAll();
	}

	componentWillReceiveProps(newProps: NavBarButtonsProps) {
		if (this.props.location.pathname !== newProps.location.pathname) {
			this.props.actions.hideAll();
		}
	}

	hideLogin = () => {
		this.setState({
			showLogin: false
		});
	};

	showUserMenu = () => {
		this.props.actions.toggleLogin();
	};

	login = () => {
		this.props.actions.aaLogin();
	};

	showBasketMenu = () => {
		this.props.actions.toggleBasketMenu();
	};

	toggleMobileNavigation = () => {
		this.props.actions.toggleMobileNavigation();
	};

	getSalesRepresentativeName = (salesRepUser: Person): { firstName: string; lastName: string } => {
		const { attributes } = salesRepUser;

		const names = pick((salesRepUser.firstName && salesRepUser.lastName && salesRepUser) || attributes, [
			"firstName",
			"lastName"
		]);

		return names;
	};

	render() {
		const {
			showBasket,
			showBasketMenu,
			showLogin,
			showMobileNavigation,
			salesRepUser,
			user,
			basketItems,
			isBasketAfterPayment,
			registrationFormEnabled,
			haveMultipleCurrencies,
			haveMultipleLanguages
		} = this.props;

		const isThisChannelB2c = isChannelB2c();
		const isThisChannelPos = isChannelPos();

		const { firstName, lastName } = (salesRepUser && this.getSalesRepresentativeName(salesRepUser)) ||
			get(user, "attributes", user) || { firstName: "", lastName: "" };

		const shortLastName = lastName && lastName.length > 0 ? lastName.substring(0, 1) : "";

		const itemCount: number = basketItems ? basketItems.length : 0;

		const mobileNavigationIcon = showMobileNavigation ? "fa-times" : "fa-bars";

		return (
			<IntlContainer>
				<div className="this">
					{/* POS: Stop shopping as user ------------------------- */}

					{salesRepUser &&
						user && (
							<Link id="navbar-stop-shopping-as-user" className="button" to={commonServiceDeskRoutes.SERVICE_DESK_INDEX.createLink()}>
								<FormattedMessage
									{...messages.stopShopping}
									values={{
										firstName: user.firstName,
										lastName: user.lastName
									}}
								/>
							</Link>
						)}

					{/* Currency selection ------------------------------- */}
					{haveMultipleCurrencies && <NavBarCurrencySelectionContainer />}

					{/* B2C & POS: Language selection -------------------------- */}

					{(isThisChannelB2c || isThisChannelPos) && haveMultipleLanguages && <ChangeLanguage />}

					{/* Basket ----------------------------------------- */}

					{showBasket && (
						<div
							className={classnames({
								basket: true,
								active: showBasketMenu
							})}
						>
							<NavBarButton
								id="navbar-basket-button-label"
								handleClick={this.showBasketMenu}
								icon={<i className="fa fa-shopping-basket" />}
								badge={(!isBasketAfterPayment && itemCount) || undefined}
							>
								<FormattedMessage {...messages.basket}/>
							</NavBarButton>
							{showBasketMenu &&
								!isBasketAfterPayment && (
									<OcDropdown dropdownKey="basketMenuDropdown" trianglePosition="right" position="right">
										<BasketMenuContainer />
									</OcDropdown>
								)}
						</div>
					)}

					{/* Login ------------------------------------------- */}

					<div
						className={classnames({
							"sign-in": true,
							active: showLogin
						})}
					>
						{/* Not logged in --------------------------------- */}

						{!user && (
							<NavBarButton
								id="navbarbutton-sign-in"
								handleClick={this.login}
								icon={<i className="fa fa-user" />}
							>
								<FormattedMessage {...messages.signIn}/>
							</NavBarButton>
						)}

						{showLogin &&
							!this.state.showRegistrationModal && (
								<LoginContainerRedux hideLogin={this.hideLogin} flux={this.context.flux}>
									<LoginDropdown/>
								</LoginContainerRedux>
							)}

						{/* Logged in ------------------------------------- */}

						{user && (
							<div className="w-action-item">
								<button
									type="button"
									className="w-action-item-link"
									id="navbarbutton-show-login"
									onClick={this.showUserMenu}
								>
									<div className="w-action-item-label">
										<div className="w-action-item-label-key">
											<FormattedMessage {...messages.you}/>
										</div>
										<div className="w-action-item-label-value">
											{`${firstName ? firstName : ""} ${shortLastName ? shortLastName + "." : ""}`}
										</div>
									</div>
								</button>
							</div>
						)}
					</div>

					{/* Register ----------------------------------------- */}

					{!user &&
						registrationFormEnabled && (
							<NavBarButton
								id="navbarbutton-registration"
								handleClick={() => this.props.history.push(commonShopRoutes.REGISTRATION_REGISTER.createLink())}
								icon={<i className="fa fa-user-plus" />}
							>
								<FormattedMessage {...messages.navigation}/>
							</NavBarButton>
						)}

					{/* Mobile navigation -------------------------------- */}

					<div className="mobile">
						<NavBarButton
							id="navbarbutton-mobile-nav-toggle"
							handleClick={this.toggleMobileNavigation}
							icon={<i className={"fa " + mobileNavigationIcon} />}
						>
							<FormattedMessage {...messages.navigation}/>
						</NavBarButton>
					</div>
				</div>
			</IntlContainer>
		);
	}
}

const NavBarButtonWithClickOutside: React.ComponentClass<
	NavBarButtonsActionProps & NavBarButtonsStateProps & RouteComponentProps<any>
	> = OnClickOut(NavBarButtons);

const NavBarButtonsWithRouter: React.ComponentClass<NavBarButtonsStateProps & NavBarButtonsActionProps> = withRouter(
	NavBarButtonWithClickOutside
);

export default NavBarButtonsWithRouter;

export {
	OnClickOutProps,
	RouteComponentProps,
	StaticContext,
	NavBarButtonsActionProps,
	NavBarButtonWithClickOutside,
	NavBarButtonsStateProps
};
