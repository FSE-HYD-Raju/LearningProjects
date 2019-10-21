"use strict";
import * as React from "react";
import { OcLoadingSpinner, OrganizationCreationState, IdentificationType } from "omnichannel-common-pos";
import { default as NewOrganizationInfo } from "./NewOrganizationInfo";

const CreateOrganizationForm = require("./CreateOrganizationForm");

interface CreateOrganizationHOCStateProps {
	organizationCreation: OrganizationCreationState;
	organizationIdentification: Array<IdentificationType>;
	locale: string;
}

interface CreateOrganizationHOCActionProps {
	actions: {
		clearOrganizationState: () => void;
		createOrganization: (payload: any) => void;
	}
}

type CreateOrganizationHOCProps = CreateOrganizationHOCStateProps & CreateOrganizationHOCActionProps;

const CreateOrganizationHOC: React.FC<CreateOrganizationHOCProps> = (props: CreateOrganizationHOCProps) => {
	const { organizationCreation } = props;
	return (
		organizationCreation && organizationCreation.queryActive
			? (<OcLoadingSpinner loading={organizationCreation.queryActive}/>)
			: organizationCreation && organizationCreation.success
			? (<NewOrganizationInfo actions={props.actions} />)
				: (<CreateOrganizationForm {...props} />)
	);
};

export {
	CreateOrganizationHOCStateProps,
	CreateOrganizationHOCActionProps,
	CreateOrganizationHOCProps,
};
export default CreateOrganizationHOC;
