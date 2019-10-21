const marketingConsent = {
	$schema: "http://json-schema.org/draft-04/schema#",
	title: "marketingConsent",
	type: "object",
	properties: {
		ownMarketing: {
			type: "boolean",
			required: true,
			nullable: false
		},
		thirdPartyMarketing: {
			type: "boolean",
			required: true,
			nullable: false
		},
		geoLocalization: {
			type: "boolean",
			required: true,
			nullable: false
		},
		profiling: {
			type: "boolean",
			required: true,
			nullable: false
		},
		thirdPartyEnrichment: {
			type: "boolean",
			required: true,
			nullable: false
		},
		thirdPartyTransfer: {
			type: "boolean",
			required: true,
			nullable: false
		}
	}
};

export default marketingConsent;
