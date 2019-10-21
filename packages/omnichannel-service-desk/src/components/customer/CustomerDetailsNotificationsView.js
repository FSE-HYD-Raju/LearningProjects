import messages from "../../index.messages";
import { cssns, FormattedMessage } from "omnichannel-common-pos";
import CustomerDetailsView from "./CustomerDetailsView";
import CustomerDetailsNotificationsShow from "./CustomerDetailsNotificationsShow";
import CustomerDetailsNotificationsEdit from "./CustomerDetailsNotificationsEdit";
const { React } = cssns("CustomerDetailsView");

export default class CustomerDetailsNotificationsView extends CustomerDetailsView {
	render() {
		return (
			<div>
				<h5 className="header">
					{this.props.header &&
					messages[this.props.header] && (
						<FormattedMessage {...messages[this.props.header]} />
					)}
					<span
						style={{
							marginLeft: "5px",
							color: "#337ab7",
							cursor: "pointer"
						}}
					>
						{!this.props.editMode && (
							<span
								className="edit"
								onClick={this.editModeOn.bind(this)}
							>
								<i className="fa fa-pencil" />
								<FormattedMessage {...messages.edit} />
							</span>
						)}
						{this.props.editMode && (
							<span
								className="cancel"
								onClick={this.editModeOff.bind(this)}
							>
								<i className="fa fa-times" />
								<FormattedMessage {...messages.cancel} />
							</span>
						)}
					</span>
				</h5>
				{!this.props.editMode && (
					<CustomerDetailsNotificationsShow {...this.props} />
				)}
				{this.props.editMode && (
					<CustomerDetailsNotificationsEdit
						{...this.props}
						onSubmit={this.props.onSubmit}
					/>
				)}
			</div>
		);
	}
}
