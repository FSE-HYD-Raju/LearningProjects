/* tslint:disable:max-line-length */
"use strict";

export const mockedOrganizationPayload = {
	type: "organizations",
	attributes: {
		characteristics: {},
		formattedName: "Test Company",
		organizationType: "public-company",
		isLegalEntity: true,
		language: "fin",
		tradingName: "Test Company",
		privacySettings: {},
		validFor: {
			startDate: "2015-08-03T08:00:00.000Z"
		},
		identification: {
			identificationId: "1234",
			type: "IT"
		}
	}
};

export const mockedOrganizationSuccess = {
	success: {
		attributes: {
			characteristics: {},
			formattedName: "Test Company",
			identifications: {
				identificationId: "1234",
				type: "IT"
			},
			isLegalEntity: true,
			language: "fin",
			organizationType: "public-company",
			privacySettings: {},
			tradingName: "Test Company",
			validFor: {
				startDate: "2015-08-03T08:00:00.000Z"
			}
		},
		id: "kopo",
		links: "kopo",
		type: "organizations"
	}
};

export const mockedOrganizationError = {
	error: {
		errors: [
			{
				status: "500",
				code: "error-code",
				title: "Title",
				detail: "Detail"
			}
		],
		status: 500
	}
};
