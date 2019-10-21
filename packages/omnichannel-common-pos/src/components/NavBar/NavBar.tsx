import cssns from "../../utils/cssnsConfig";
import { Component, ValidationMap } from "react";
import { RouteComponentProps, withRouter, StaticContext } from "react-router";
import { Link } from "react-router-dom";
import classnames from "classnames";
import NavBarSessionButtonContainer from "./NavBarSessionButton/NavBarSessionButtonContainer";
import CustomerBasketsContainer from "../basket/customerBasket/CustomerBasketsContainer";
import TopUpContainer from "./topUp/TopUpContainer";
import NavBarButtonsContainer from "./NavBarButtons/NavBarButtonsContainer";
import NavBarChannelSelection from "./NavBarChannelSelection/NavBarChannelSelection";
import NavBarMobileContainer from "./NavBarMobile/NavBarMobileContainer";
import CustomerSelectionContainer from "./customerSelection/CustomerSelectionContainer";
import { Person, User } from "../../redux";
import { B2CComponentCustomizationPoints, withCustomization } from "../../customization";
import CmsContentSpot from "../cms/CmsContentSpot";
import { ContextType, contextTypesValidationMap } from "../../types";

import { isChannelB2c, isChannelPos, isChannelTelesales } from "../../utils/Channel.utils";
import { commonServiceDeskRoutes } from "../../routes/commonRoutesMap";
import navBarMessages from "./NavBar.messages";
const { React } = cssns("NavBar");

const BrandLink: React.FC<{ url: string, id: string }> = (props) => {
	return props.url.startsWith("http") ?
		<a href={props.url} id={props.id}>{props.children}</a> :
		<Link to={props.url} id={props.id}>{props.children}</Link>;
};

interface NavBarStateProps {
	user?: User;
	salesRepUser?: Person;
	logo: string;
	brandLink: string;
	hasUserPOSPermission: boolean;
	showMobileNavigation: boolean;
	showStartSessionButton: boolean;
}

type NavBarProps = NavBarStateProps & RouteComponentProps<any>;

class NavBar extends Component<NavBarProps> {
	static displayName: string = "NavBar";
	static contextTypes: ValidationMap<ContextType> = contextTypesValidationMap;

	constructor(props: NavBarProps, context: ContextType) {
		super(props, context);

		this.state = {
			criteria: "name",
			showCustomerListDropdown: false,
			confirmModalVisible: false
		};
	}

	render() {
		const isThisChannelB2c = isChannelB2c();
		const isThisChannelPos = isChannelPos();

		const navbarClasses = classnames({
			b2c: isThisChannelB2c,
			telesales: isChannelTelesales(),
			pos: isThisChannelPos,
			this: true
		});

		if (isThisChannelPos && (!this.props.user || !this.props.hasUserPOSPermission)) {
			return null;
		}

		const { logo, showMobileNavigation, showStartSessionButton } = this.props;

		return (
			<nav className={navbarClasses} id="w-app-header">
				<div className="branding-and-channels">

					{/* Customer branding ------------------------- */}

					<h1 className="branding" id="w-app-title">
						{this.props.salesRepUser && (
							<Link id="navbar-to-serviceDesk" to={commonServiceDeskRoutes.SERVICE_DESK_INDEX.createLink()}>
								<div className="logo">
									{logo && (
										<img
											alt={this.context.intl.formatMessage(navBarMessages.alternativeText)}
											src={this.props.logo}
											className="image-props"
										/>
									)}
								</div>
							</Link>
						)}
						{!this.props.salesRepUser && (
							<BrandLink url={this.props.brandLink} id="navbar-link-to-cold">
								<div className="logo">
									{logo && <img alt={this.context.intl.formatMessage(navBarMessages.alternativeText)} src={this.props.logo}/>}
								</div>
							</BrandLink>
						)}
					</h1>

					{/* Channel navigation ----------------------------- */}

					{isThisChannelB2c && (<NavBarChannelSelection />)}

				</div>

				<div className="global-navi">
					<CmsContentSpot
						fragmentId="global_navi"
						publishTarget="b2c"
					/>
				</div>

				{/* Customer selection ------------------------- */}

				{isThisChannelPos && <CustomerSelectionContainer flux={this.context.flux}/>}

				{/* Customer baskets ------------------------- */}

				{isThisChannelPos && <CustomerBasketsContainer flux={this.context.flux}/>}

				{/* Action buttons ------------------------- */}

				<div className="actions" id="w-app-actions">
					<TopUpContainer {...this.props} flux={this.context.flux}/>
					<NavBarButtonsContainer flux={this.context.flux}/>

					{isThisChannelPos && showStartSessionButton && <NavBarSessionButtonContainer flux={this.context.flux}/>}
				</div>

				{/* Mobile navigation ---------------------- */}

				{showMobileNavigation && (
					<NavBarMobileContainer flux={this.context.flux}/>
				)}
			</nav>
		);
	}
}

const NavBarWithRouter: React.ComponentClass<NavBarStateProps> = withRouter<NavBarProps>(NavBar);

export default withCustomization(B2CComponentCustomizationPoints.APP_HEADER_NAV_BAR_COMPONENT, NavBarWithRouter);

export { RouteComponentProps, StaticContext, NavBarStateProps, NavBarProps, NavBar as NavBarUnwrapped };
