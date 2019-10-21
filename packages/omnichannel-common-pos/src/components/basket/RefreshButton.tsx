import cssnsConfig from "../../utils/cssnsConfig";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import classnames from "classnames";
import { FC } from "react";
import messages from "./Basket.messages";
const { React } = cssnsConfig("RefreshButton");

interface RefreshButtonProps {
	refresh: () => void;
	updating: boolean;
	buttonId: string;
}

const RefreshButton: FC<RefreshButtonProps> = props => {
	return props.refresh ? (
		<a
			id={props.buttonId}
			data-test-name="refresh-button"
			className="refresh-button"
			onClick={e => {
				e.preventDefault();
				props.refresh();
			}}
		>
			<i
				className={classnames({
					"fa fa-sync-alt": !props.updating,
					"fa fa-sync-alt fa-spin": props.updating,
					"btn-icon-left": true
				})}
			/>
			<FormattedMessage {...messages.refresh} />
		</a>
	) : null;
};

export default RefreshButton;
export {
	RefreshButtonProps
};
