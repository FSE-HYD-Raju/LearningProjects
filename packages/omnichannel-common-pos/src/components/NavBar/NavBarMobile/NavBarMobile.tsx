import cssns from "../../../utils/cssnsConfig";
import { withRouter, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { User, Category } from "../../../redux";
import { LocationInfo, LOCATIONS_ROOT_LEVEL_QUERY } from "../../../redux/models/location/location.types";
import { PostalAddress } from "../../../redux";
import LocationUtil from "../../../utils/LocationUtil";
import { isEmpty } from "lodash";
import { isChannelB2c } from "../../../utils/Channel.utils";

import { commonShopRoutes } from "../../../routes/commonRoutesMap";
import { NavBarMobilePage, digitalLifePages } from "./NavBarMobilePages";
import { PureComponent, ComponentClass } from "react";
import messages from "./NavBarMobile.messages";
import { B2CComponentCustomizationPoints, withCustomization } from "../../../customization";
import FormattedMessage from "../../../channelUtils/FormattedMessage";

const { React } = cssns("NavBarMobile");

interface NavBarMobileStateProps {
	changePasswordUrl?: any;
	user?: User;
	mainCategories: Category[];
	defaultLocationAddress?: PostalAddress;
	customerAddress?: PostalAddress;
	fetchingLocations: boolean;
	fetchingDefaultLocation: boolean;
	isUserLoggedIn: boolean;
	locationListVisible: boolean;
	selectedLocation?: LocationInfo;
	locations: Array<LocationInfo>;
	locationSelectionEnabled?: boolean;
}

interface NavBarMobileActionProps {
	actions: {
		aaLogin: () => void;
		logout: () => void;
		toggleMobileNavigation: () => void;
		getLocations(address?: PostalAddress, additionalParameters?: string, additionalPath?: string): void;
		getDefaultLocation(address: PostalAddress, isUserLoggedIn: boolean): void;
		setLocationListVisible(value: boolean): void;
		setLocation(location: LocationInfo): void;
		toggleLocationList(): void;
		setDefault(): void;
	};
}

interface NavBarMobileContainerProps {
	isMobileViewActive?: boolean;
}

type NavBarMobileProps = NavBarMobileActionProps & NavBarMobileStateProps & RouteComponentProps<any>;

type NavBarMobileMergedProps = NavBarMobileActionProps &
	NavBarMobileStateProps & NavBarMobileContainerProps;

class NavBarMobile extends PureComponent<NavBarMobileProps> {
	navBarMobileStateBodyClass: string = "NavBarMobile-active";

	constructor(props: any) {
		super(props);
		document.body.classList.add(this.navBarMobileStateBodyClass);
	}

	getLocations(props: Partial<NavBarMobileProps>) {
		if (!props.fetchingLocations && isEmpty(props.locations) && props.actions) {
			props.actions.getLocations(undefined, LOCATIONS_ROOT_LEVEL_QUERY);
		}
	}

	fetchDefaultLocation(props: Partial<NavBarMobileProps>) {
		let address = props.defaultLocationAddress;

		if (props.isUserLoggedIn && props.customerAddress) {
			address = props.customerAddress;
		}

		if (address && props.actions) {
			props.actions.getDefaultLocation(address, Boolean(props.isUserLoggedIn));
		}
	}

	componentDidMount() {
		if (isChannelB2c() && this.props.locationSelectionEnabled) {
			this.getLocations(this.props);
		}
	}

	componentDidUpdate() {
		if (
			!this.props.fetchingDefaultLocation &&
			(this.props.selectedLocation === undefined ||
				(isEmpty(this.props.selectedLocation) && this.props.selectedLocation !== null))
		) {
			this.fetchDefaultLocation(this.props);
		}
	}

	// Open or close location list.
	toggleLocationOptions = () => this.props.actions.toggleLocationList();
	openLocationList = () => this.props.actions.setLocationListVisible(true);
	closeLocationList = () => this.props.actions.setLocationListVisible(false);

	componentWillUnmount() {
		document.body.classList.remove(this.navBarMobileStateBodyClass);
	}

	render() {
		const {
			actions,
			user,
			mainCategories,
			changePasswordUrl,
			location,
			selectedLocation,
			locations,
			locationListVisible
		} = this.props;
		const { toggleLocationList, setLocation } = actions && actions;

		const activateLink = (action: any): void => {
			window.scrollTo(0, 0);
			actions.toggleMobileNavigation();
			if (typeof action === "function") {
				action();
			}
		};

		const getActiveClass = (path: string, baseClass: string, strict: boolean = false): string => {
			return (strict && location.pathname === path) || (!strict && location.pathname.includes(path))
				? baseClass + " item-active"
				: baseClass;
		};

		const renderSelectedLocation = () => {
			const locationLabel = !isEmpty(selectedLocation)
				? LocationUtil.getLocationLabel(selectedLocation!)
				: undefined;
			return (
				<a id="toggle-locations" className="NavBarMobile-item-secondary" onClick={toggleLocationList}>
					<FormattedMessage {...messages.navBarMobileGeoLocations} />
					<strong>{locationLabel && `: ${locationLabel}`}</strong>
				</a>
			);
		};

		const renderLocationsList = locations && locationListVisible;

		return (
			<div className="this">
				{renderLocationsList ? (
					<div className="locations">
						<div className="section channel channel-ecare">
							<span className="item-primary">
								<strong>
									<FormattedMessage {...messages.navBarMobileChooseLocation} />
								</strong>
							</span>
							{locations &&
								locations.map((b, idx) => {
									return (
										<a
											key={idx}
											id={`location-option-${b.id}`}
											className="NavBarMobile-item-secondary"
											onClick={() => {
												setLocation(b);
											}}
										>
											{b.attributes.label}
										</a>
									);
								})}
						</div>
						<div className="section locations-active">
							<a
								id="toggle-locations-menu-open"
								className="NavBarMobile-item-primary"
								onClick={toggleLocationList}
							>
								<strong>
									<i className="fa fa-angle-left" />
									<FormattedMessage {...messages.navBarMobileBackToMenu} />
								</strong>
							</a>
						</div>
					</div>
				) : (
					<div>
						<div className="section channel channel-ecare">
							<Link
								className={getActiveClass("/", "item-primary", true)}
								to={{
									pathname: commonShopRoutes.INDEX.createLink(),
									state: {scrollToTop: true}
								}}
								onClick={activateLink}
								id="navbar-mobile-eshop"
							>
								<FormattedMessage {...messages.navBarMobileEshop} />
							</Link>
							{mainCategories.map((category: any, idx: number) => {
								return (
									<Link
										className={getActiveClass("/shop/categories/" + category.id, "item-secondary")}
										to={{
											pathname: commonShopRoutes.SHOP_CATEGORY.createLink({categoryId: category.id}),
											state: {scrollToTop: true}
										}}
										onClick={activateLink}
										key={idx}
										id={"navbar-mobile-eshop-" + category.id}
									>
										{category.attributes.name}
									</Link>
								);
							})}
						</div>

						{/* Not logged in ------------------------------- */}

						{!user && (
							<div className="not-logged-in-user">
								<div className="section">
									<a
										href="javascript:;"
										className="item-primary"
										onClick={() => {
											activateLink(actions.aaLogin);
										}}
									>
										<FormattedMessage {...messages.navBarMobileSignIn} />
									</a>
								</div>
							</div>
						)}

						{/* Logged in ----------------------------------- */}

						{user && (
							<div className="logged-in-user">
								{/* Digital life navigation ---- */}

								<div className="section channel channel-ecare">
									{digitalLifePages.map((page: NavBarMobilePage) => {
										return (
											<Link
												className={getActiveClass(
													page.url,
													page.primary ? "item-primary" : "item-secondary",
													page.primary
												)}
												to={{
													pathname: page.url,
													state: {scrollToTop: true}
												}}
												onClick={activateLink}
												key={page.id}
												id={"navbar-mobile-ecare-" + page.id}
											>
												<FormattedMessage {...page.messages} />
											</Link>
										);
									})}
								</div>

								{/* User profile options ---- */}

								<div className="section profile-options">
									{isChannelB2c() &&
									changePasswordUrl && (
										<Link to={changePasswordUrl} id="navbar-change-password-link" target="_blank">
											<FormattedMessage {...messages.navBarMobileChangePassword} />
										</Link>
									)}

									<a
										href="javascript:;"
										className="item-secondary"
										onClick={() => {
											activateLink(actions.logout);
										}}
									>
										<FormattedMessage {...messages.navBarMobileSignOut} />
									</a>
								</div>
							</div>
						)}

						{/* Settings ----------------------------------- */}

						<div className="section settings">
							<span className="item-primary">
								<FormattedMessage {...messages.navBarMobileSettings} />
							</span>
							{renderSelectedLocation()}
						</div>
					</div>
				)}
			</div>
		);
	}
}

const NavBarMobileWithRouter: ComponentClass<NavBarMobileStateProps & NavBarMobileActionProps> = withRouter(NavBarMobile);

export default withCustomization(B2CComponentCustomizationPoints.APP_HEADER_NAV_BAR_MOBILE_COMPONENT, NavBarMobileWithRouter);

export {
	RouteComponentProps,
	NavBarMobileStateProps,
	NavBarMobileActionProps,
	NavBarMobileProps,
	NavBarMobileMergedProps,
	NavBarMobile,
};
