import * as React from "react";
import { get } from "lodash";
import { Component } from "react";
import { AxiosResponse } from "axios";
import { FormalCheckbox, ErrorContainer, OrganizationResponse, ContextType, FormattedMessage } from "omnichannel-common-pos";
import messages from "./OrganizationSelect.messages";

export interface OrganizationSelectProps {
	organizations: Array<OrganizationFromApi>;
	showOrganizationSelect: boolean;
	selectedOrganizationId: string;
	onOrganizationSelectChange(organizationId: string): void;
	onOrganizationCheckboxChange(organizationId: boolean): void;
	getOrganizationById(id: string): Promise<AxiosResponse<OrganizationResponse>> | ErrorContainer;
}

export interface OrganizationSelectState {
	organizations: Array<OrganizationInfo>;
}

export interface OrganizationFromApi {
	relatedPersonId: string;
}

export interface OrganizationInfo {
	id: string;
	name: string;
}

/**
 * Display organization selection, if a user belongs to any organizations
 * so a user can perform checkout as organization.
 */
export default class OrganizationSelect extends Component<OrganizationSelectProps, OrganizationSelectState> {
	constructor(props: OrganizationSelectProps, context: ContextType) {
		super(props, context);

		this.state = {
			organizations: []
		};
	}

	componentWillMount() {
		this.fetchOrganizationNames();
	}

	/**
	 * Fetches organization names if needed
	 */
	fetchOrganizationNames = async () => {
		const { organizations, getOrganizationById } = this.props;

		if (organizations) {
			const fetches: Array<any> = [];
			organizations.forEach(organization => {
				fetches.push(getOrganizationById(organization.relatedPersonId));
			});

			const results = await Promise.all(fetches);

			if (results) {
				const organizations = results.map(result => {
					return {
						id: get(result, "data.id"),
						name: get(result, "data.attributes.formattedName")
					};
				});

				const selectedOrganizationId: string = get(organizations, "[0].id", null);
				this.props.onOrganizationSelectChange(selectedOrganizationId);

				this.setState({
					organizations
				});
			}
		}
	};

	render() {
		const { organizations } = this.state;

		if (!organizations || organizations.length === 0) {
			return null;
		}

		return (
			<React.Fragment>
				<FormalCheckbox
					id="use-organization-checkbox"
					checked={this.props.showOrganizationSelect}
					label={<FormattedMessage {...messages.checkboxLabel}/>}
					onChange={(value: boolean) => {
						this.props.onOrganizationCheckboxChange(value);
					}}
				/>

				{this.props.showOrganizationSelect && (
					<select
						className="custom-select"
						id="organization-select"
						value={this.props.selectedOrganizationId}
						onChange={event => {
							this.props.onOrganizationSelectChange(
								event.target.value
							);
						}}
					>
						{organizations.map((organization, key) => {
							return (
								<option
									key={key}
									value={organization.id}
									id={`organization-select-option-${
										organization.id
										}`}
								>
									{organization.name}
								</option>
							);
						})}
					</select>
				)}
			</React.Fragment>
		);
	}
}
