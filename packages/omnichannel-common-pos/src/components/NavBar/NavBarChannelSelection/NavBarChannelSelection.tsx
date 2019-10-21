import cssns from "../../../utils/cssnsConfig";
import { PureComponent, ValidationMap } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import * as classnames from "classnames";
import { Link } from "react-router-dom";
import { commonDigitalLifeRoutes, commonShopRoutes } from "../../../routes/commonRoutesMap";
import messages from "../NavBarButtons/NavBarButtons.messages";
import { ContextType, contextTypesValidationMap } from "../../../types";
import FormattedMessage from "../../../channelUtils/FormattedMessage";

const { React } = cssns("NavBar");

interface NavBarChannelSelectionProps extends RouteComponentProps<any> {}

class NavBarChannelSelection extends PureComponent<NavBarChannelSelectionProps> {

	static contextTypes: ValidationMap<ContextType> = contextTypesValidationMap;

	constructor(props: NavBarChannelSelectionProps, context: ContextType) {
		super(props, context);
	}

	render() {
		const { user } = this.context.flux.stores.UserStore.state;
		const isChannelActive = (url: string): boolean => this.props.location.pathname.includes(url);

		return (
			<nav className="channels">
				<Link
					id="navbar-channels-eshop"
					className={classnames({
						channel: true,
						"channel-eshop": true,
						"channel-active": !isChannelActive(commonDigitalLifeRoutes.DIGITAL_LIFE_INDEX.createLink())
					})}
					to={commonShopRoutes.INDEX.createLink()}
				>
					<FormattedMessage {...messages.eShop}/>
				</Link>
				{user && (
					<Link
						id="navbar-channels-ecare"
						className={classnames({
							channel: true,
							"channel-ecare": true,
							"channel-active": isChannelActive(commonDigitalLifeRoutes.DIGITAL_LIFE_INDEX.createLink())
						})}
						to={commonDigitalLifeRoutes.DIGITAL_LIFE_INDEX.createLink()}
					>
						<FormattedMessage {...messages.eCare}/>
					</Link>
				)}
			</nav>
		);
	}
}

export default withRouter(NavBarChannelSelection);
export {
	NavBarChannelSelectionProps
};
