import {
	FormattedMessage,
	cssns,
	ContextType,
} from "omnichannel-common-pos";
import { Component } from "react";
import messages from "../ProductTable.messages";

const { React } = cssns("Availability");

interface Inventory {
	id: string;
	placeName: string;
	count: string;
}

type OrgIdToInventories = Record<string, Array<Inventory>>;

interface SalesOrganization {
	id: string;
}

interface AvailabilityStateProps {
	salesOrgs?: Array<SalesOrganization>;
	orgIdToInventories?: OrgIdToInventories;
	sku: string;
}

interface AvailabilityActionProps {
	actions: {
		getOrgsAndItsInventories: (sku: string) => void;
	}
}

type AvailabilityProps = AvailabilityStateProps & AvailabilityActionProps;

class Availability extends Component<AvailabilityProps> {
	constructor(props: AvailabilityProps, context: ContextType) {
		super(props, context);
	}

	componentDidMount() {
		this.props.actions.getOrgsAndItsInventories(this.props.sku);
	}

	render() {
		const { salesOrgs, orgIdToInventories } = this.props;
		const inventoryElements = orgIdToInventories && salesOrgs && salesOrgs.map(salesOrg => {
			const inventories = orgIdToInventories[salesOrg.id];
			return inventories && inventories.map(inventory => {
				return (
					<li key={inventory.id}>
						<hr />
						<div className="flex flex-row flex-space-between">
							<div className="flex flex-column">
								<h6>{inventory.placeName}</h6>
							</div>
							<div className="flex flex-column">
								<div>
									<FormattedMessage {...messages.quantity}/>
								</div>
								<div className="text-align-end">{inventory.count}</div>
							</div>
						</div>
					</li>
				);
			});
		});

		return (
			<div className="main flex flex-column">
				<div className="container">
					<div>
						<FormattedMessage {...messages.thisProductAvailability}/>
					</div>
					<ul className="list-style-none">
						{inventoryElements}
					</ul>
				</div>
			</div>
		);
	}
}

export default Availability;
export {
	AvailabilityStateProps,
	AvailabilityActionProps,
	AvailabilityProps,
	SalesOrganization,
	OrgIdToInventories,
};
