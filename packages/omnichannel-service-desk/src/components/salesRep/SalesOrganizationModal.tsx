import * as React from "react";
import {
	OcModal,
	FormattedMessage,
	Inventory,
	SalesOrganizationRole,
	OcButton,
	OcButtonType
} from "omnichannel-common-pos";
import { isEmpty } from "lodash";
import classnames from "classnames";
import messages from "./SalesOrganizationModal.messages";

interface SalesOrganizationModalStateProps {
	inventories?: Array<Inventory>;
	salesOrganizations?: Array<SalesOrganizationRole>;
	activeSalesOrganization?: SalesOrganizationRole;
	activeInventory?: Inventory;
	showSalesOrganizationModal: boolean;
	consulValuesLoaded: boolean;
	toolmode: boolean;
}

interface SalesOrganizationModalActionProps {
	actions: {
		setSelectedOrganization: (organization: SalesOrganizationRole, inventory: Inventory) => void;
		revertSalesOrganizationAndInventory: () => void;
		getInventories: (organizationId: string) => void;
		getOrganizations: () => void;
	};
}

interface SalesOrganizationModalState {
	selectedOrganization?: SalesOrganizationRole;
	selectedInventory?: Inventory;
	searchingForOrganization: boolean;
	isOrganizationSearchInputFocused: boolean;
	searchingForInventory: boolean;
	isInventorySearchInputFocused: boolean;
	selectedOrganizationFilter?: string;
	selectedInventoryFilter?: string;
	customerSearchInput: string;
}

type SalesOrganizationModalProps = SalesOrganizationModalStateProps & SalesOrganizationModalActionProps;

class SalesOrganizationModal extends React.Component<SalesOrganizationModalProps, SalesOrganizationModalState> {
	constructor(props: SalesOrganizationModalProps) {
		super(props);

		this.state = {
			customerSearchInput: "",
			selectedOrganizationFilter: "",
			selectedInventoryFilter: "",
			selectedOrganization: undefined,
			selectedInventory: undefined,
			searchingForOrganization: false,
			searchingForInventory: false,
			isOrganizationSearchInputFocused: false,
			isInventorySearchInputFocused: false
		};
	}

	componentWillReceiveProps(nextProps: SalesOrganizationModalProps) {
		if (isEmpty(this.state.selectedOrganizationFilter) && nextProps.activeSalesOrganization) {
			this.selectOrganization(nextProps.activeSalesOrganization, true);
		}
	}

	componentDidMount() {
		const {
			consulValuesLoaded,
			showSalesOrganizationModal
		} = this.props;

		if (consulValuesLoaded && showSalesOrganizationModal) {
			this.props.actions.getOrganizations();
		}
	}

	getOrganization = () => {
		const filter = this.state.selectedOrganizationFilter;
		const { isOrganizationSearchInputFocused } = this.state;
		const organizations = this.props.salesOrganizations || [];

		if (!filter || !isOrganizationSearchInputFocused) {
			return organizations;
		}

		const rgxp = new RegExp(filter, "i");
		const filteredResult = organizations.filter((organization: SalesOrganizationRole) => {
			const attributes = organization.attributes;
			if (attributes && attributes.externalId) {
				return attributes.externalId.match(rgxp) !== null;
			} else {
				return attributes && attributes.code && attributes.code.match(rgxp) !== null;
			}
		});

		return filteredResult;
	};

	getInventory = () => {
		const filter = this.state.selectedInventoryFilter;
		const { isInventorySearchInputFocused } = this.state;

		const inventories = this.props.inventories || [];
		if (!filter || !isInventorySearchInputFocused) {
			return inventories;
		}
		const rgxp = new RegExp(filter, "i");
		return inventories.filter((inventory: Inventory) => {
			return inventory.attributes && inventory.attributes["place-name"].match(rgxp) !== null;
		});
	};

	selectOrganization = (organization?: SalesOrganizationRole, isEmptyOrganization?: boolean) => {
		if (!organization) {
			return;
		}
		const isOrganizationChanged = this.state.selectedOrganization && organization.id !== this.state.selectedOrganization.id;
		if (isEmptyOrganization || isOrganizationChanged) {
			this.props.actions.getInventories(organization.id);
		}

		this.setState({
			selectedOrganizationFilter: organization.attributes && (organization.attributes.externalId || organization.attributes!.code),
			selectedOrganization: organization,
			selectedInventoryFilter: isOrganizationChanged ? "" : this.state.selectedInventoryFilter,
			selectedInventory: this.state.selectedInventory,
			searchingForInventory: false,
			searchingForOrganization: false,
			isOrganizationSearchInputFocused: false
		});
	};

	selectInventory = (inventory: Inventory) => {
		const invName = inventory.attributes && inventory.attributes["place-name"];
		this.setState({
			selectedInventoryFilter: invName,
			selectedInventory: inventory,
			searchingForInventory: false,
			isInventorySearchInputFocused: false
		});
	};

	setOrganizationFocus = (focused: boolean): void => {
		this.setState({
			searchingForOrganization: focused,
			isOrganizationSearchInputFocused: focused
		});
	};

	setOrganizationSearching = (isSearching: boolean): void => {
		this.setState({
			searchingForOrganization: isSearching,
			isOrganizationSearchInputFocused: false
		});
	};

	setInventoryFocus = (focused: boolean): void => {
		this.setState({
			searchingForInventory: focused,
			isInventorySearchInputFocused: focused
		});
	};

	setInventorySearching = (isSearching: boolean): void => {
		this.setState({
			searchingForInventory: isSearching,
			isInventorySearchInputFocused: false
		});
	};

	handleOrganizationSearchInput = (e: any) => {
		e.preventDefault();
		this.setState({
			selectedOrganizationFilter: e.target.value
		});
	};

	handleInventorySearchInput = (e: any) => {
		e.preventDefault();
		this.setState({
			selectedInventoryFilter: e.target.value
		});
	};

	renderInventories = () => {
		return this.getInventory().map((inventory: Inventory) => {
			return (
				<a
					key={inventory.id}
					className="inventory-list-item dropdown-item"
					onClick={e => {
						e.preventDefault();
						this.selectInventory(inventory);
					}}
				>
					{inventory.attributes && inventory.attributes["place-name"]}
				</a>
			);
		});
	};

	renderOrganizations = () => {
		return this.getOrganization().map((organization: SalesOrganizationRole) => {
			return (
				<a
					key={"organization-dropdown-list-item" + organization.id}
					className="organization-list-item dropdown-item"
					onClick={e => {
						e.preventDefault();
						this.selectOrganization(organization);
					}}
				>
					{organization.attributes && (organization.attributes.externalId || organization.attributes.code)}
				</a>
			);
		});
	};

	render() {
		const {
			selectedOrganizationFilter,
			searchingForOrganization,
			selectedOrganization,
			selectedInventoryFilter,
			searchingForInventory,
			selectedInventory
		} = this.state;

		const showModal = this.props.consulValuesLoaded && this.props.showSalesOrganizationModal
			&& (!this.props.activeSalesOrganization || !this.props.activeInventory);

		return (
			<OcModal
				className="SalesOrganizationModal"
				showModal={showModal}
				backdropStyle={{zIndex: 1050}}
				title={<FormattedMessage {...messages.serviceDeskOrganizationModalTitle}/>}
				hideCloseButton={true}
				onClose={() => { this.props.actions.revertSalesOrganizationAndInventory(); }}
				okButtonLabel={<FormattedMessage {...messages.activateButtonMessage}/>}
				okDisabled={isEmpty(selectedInventory) || isEmpty(selectedOrganization)}
				onOk={() =>
					this.props.actions.setSelectedOrganization(selectedOrganization!, selectedInventory!)}
			>
				<section className="SalesOrganizationModal-form">
					{isEmpty(this.props.salesOrganizations) && (
						<div className="alert alert-danger">
							<i className="fa fa-exclamation-circle btn-icon-left" />
							<FormattedMessage {...messages.noEligibleSalesFound}/>
						</div>
					)}

					<div
						className={classnames({
							"SalesOrganizationModal-search-organization": true,
							"form-group": true,
							dropdown: true,
							show: searchingForOrganization
						})}
					>
						<label htmlFor="servicedesk-container-organization-search">
							<FormattedMessage {...messages.titleForOrganizationSelect}/>
						</label>
						<div className="input-group">
							<input
								id="servicedesk-container-organization-search"
								className="form-control"
								type="search"
								onChange={this.handleOrganizationSearchInput}
								value={selectedOrganizationFilter}
								onFocus={() => this.setOrganizationFocus(true)}
							/>
							<div className="input-group-append">
								<OcButton
									buttonType={OcButtonType.PRIMARY}
									outline={true}
									id="sales-organization-modal-search-organization"
									onClick={() => this.setOrganizationSearching(!searchingForOrganization)}
								>
									<i className="fa fa-chevron-down"/>
								</OcButton>
							</div>
						</div>
						<div
							className={classnames({
								"organization-list-dropdown": true,
								"dropdown-menu": true,
								show: searchingForOrganization
							})}
						>
							{searchingForOrganization && this.renderOrganizations()}
						</div>
					</div>
					<div
						className={classnames({
							"SalesOrganizationModal-search-inventory": true,
							"form-group": true,
							dropdown: true,
							show: searchingForOrganization
						})}
					>
						<label htmlFor="servicedesk-container-inventory-search">
							<FormattedMessage {...messages.titleForInventorySelect}/>
						</label>
						<div className="input-group">
							<input
								id="servicedesk-container-inventory-search"
								className="form-control"
								type="search"
								disabled={isEmpty(selectedOrganization)}
								onChange={this.handleInventorySearchInput}
								value={selectedInventoryFilter}
								onFocus={() => this.setInventoryFocus(true)}
							/>
							<div className="input-group-append">
								<OcButton
									buttonType={OcButtonType.PRIMARY}
									outline={true}
									id="sales-organization-modal-search-inventory"
									disabled={isEmpty(selectedOrganization)}
									onClick={() => this.setInventorySearching(!searchingForInventory)}
								>
									<i className="fa fa-chevron-down" />
								</OcButton>
							</div>
						</div>
						<div
							className={classnames({
								"inventory-list-dropdown": true,
								"dropdown-menu": true,
								show: searchingForInventory
							})}
						>
							{this.renderInventories()}
						</div>
					</div>
				</section>
			</OcModal>
		);
	}
}

export default SalesOrganizationModal;
export {
	SalesOrganizationModalStateProps,
	SalesOrganizationModalActionProps,
	SalesOrganizationModalProps,
	SalesOrganizationModalState,
};
