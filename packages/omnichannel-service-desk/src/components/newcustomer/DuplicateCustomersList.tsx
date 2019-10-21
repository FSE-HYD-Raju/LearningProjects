import { Component } from "react";
import { FormattedMessage, Customer, cssns, OcButton, OcButtonType, NewCustomer } from "omnichannel-common-pos";
import { map, isEmpty } from "lodash";
import messages from "../../index.messages";
import newCustomerMsg from "./NewCustomer.messages";

const { React } = cssns("DuplicateCustomersList");

interface DuplicateCustomersListStateProps {
	customerToCreate: NewCustomer;
	customers?: Array<Customer>;
	matchForIdTypeAndNumber: Array<Customer>;
}

interface DuplicateCustomersListActionProps {
	actions: {
		ignoreDuplicates: () => void;
		setCustomer: (customer: Customer, a: boolean) => void;
		clearSearch: () => void;
		showCustomerCreationModal: (show: boolean) => void;
	}
}

type DuplicateCustomersListProps = DuplicateCustomersListStateProps & DuplicateCustomersListActionProps;

class DuplicateCustomersList extends Component<DuplicateCustomersListProps> {
	selectCustomer = (customer: Customer) => {
		this.props.actions.setCustomer(customer, true);
		this.props.actions.showCustomerCreationModal(false);
	};

	continueToCreateNewCustomer = () => {
		this.props.actions.ignoreDuplicates();
	};

	clearSearch = (e: any) => {
		e.preventDefault();
		e.stopPropagation();
		this.props.actions.clearSearch();
	};

	renderDuplicatesTable = (persons: Array<Customer> | undefined, messageID: string) => {
		const msg = (messages as any)[messageID];
		const firstName = this.props.customerToCreate.firstName;
		const lastName = this.props.customerToCreate.lastName;
		return (
			<div className="table-item">
				<h5 className="header">
					{msg && <FormattedMessage {...msg}
					values={{
						amount: Array.isArray(persons) && persons.length,
						firstName: <b>{firstName}</b>,
						lastName: <b>{lastName}</b>
					}}

				/>}
				</h5>
				<div className="table-container">
					<table className="table">
						<thead className="table-head">
						<tr className="table-row">
							<th>
								<FormattedMessage {...messages.customerId} />
							</th>
							<th>
								<FormattedMessage {...messages.customerName} />
							</th>
							<th>
								<FormattedMessage {...messages.msisdn} />
							</th>
							<th>
								<FormattedMessage {...messages.customerMainAddress} />
							</th>
							<th>
								<FormattedMessage {...messages.activeCustomer} />
							</th>
							<th />
						</tr>
						</thead>
						<tbody>
						{persons && persons.map((c: Customer) => {
							const address = c.attributes && c.attributes.postalAddresses && c.attributes.postalAddresses[0];
							return (
								<tr className="duplicate-customers-row" key={c.id}>
									<td>
										<a onClick={() => this.selectCustomer(c)}>
											{c.id}
										</a>
									</td>
									<td>
										<a onClick={() => this.selectCustomer(c)}>
											{c.attributes && (c.attributes.firstName + " " + c.attributes.lastName)}
										</a>
									</td>
									<td>{c.attributes && !isEmpty(c.attributes.mobileNumbers) ? c.attributes.mobileNumbers[0].number : ""}</td>
									<td>
										{address && (
											<span>
													{address.street && address.street + ", "}
												{address.postalCode && address.postalCode + ", "}
												{address.city && address.city + ", "}
												{address.country}
												</span>
										)}
									</td>
									<td>
										<FormattedMessage {...messages.isActive} />
									</td>
									<td>
										<OcButton
											className="button-wide"
											buttonType={OcButtonType.SUCCESS}
											buttonSize="SMALL"
											onClick={() => this.selectCustomer(c)}
										>
											<FormattedMessage {...newCustomerMsg.duplicateSelectCustomer} />
										</OcButton>
									</td>
								</tr>
							);
						})}
						</tbody>
					</table>
				</div>
			</div>
		);
	};

	render() {
		const { customers, matchForIdTypeAndNumber } = this.props;
		return (
			<div className="this">
				<div>
					{matchForIdTypeAndNumber.length > 0 ? (
						this.renderDuplicatesTable(matchForIdTypeAndNumber, "idNumberAndTypeMatch")
					) : (
						this.renderDuplicatesTable(customers, "duplicateCustomersTitle")
					)}
				</div>
				<div className="button-container">
					<div>
						<OcButton id="duplicate-results-go-back-button" onClick={this.clearSearch} buttonType={OcButtonType.DEFAULT}>
							<FormattedMessage {...messages.backToCustomerInfo} />
						</OcButton>

						{this.props.matchForIdTypeAndNumber.length < 1 && (
							<OcButton id="buttonContinueToCreateNewCustomer" onClick={this.continueToCreateNewCustomer} buttonType={OcButtonType.SUCCESS}>
								<FormattedMessage {...messages.continueToCreateNewCustomer} />
							</OcButton>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default DuplicateCustomersList;
export {
	DuplicateCustomersListStateProps,
	DuplicateCustomersListActionProps,
	DuplicateCustomersListProps,
}
