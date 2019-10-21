import messages from "./NavBarSearchMenu.messages";
import { POSSearchConfiguration } from "../../../redux";
import { FormattedMessageDescriptor } from "../../../channelUtils";

const translationStore = (formatMessage: (messageDescriptor: FormattedMessageDescriptor) => string): Record<string, string[]> => {
	return {
		name: ["name",
			formatMessage(messages.searchCriteriaByCustomer)],
		"phone-number": [
			"number",
			formatMessage(messages.searchCriteriaByPhoneNumber)
		],
		email: ["contact_media_email", 
		    formatMessage(messages.searchCriteriaByEmail)
		],
		"contact_media_number": [
			"contact_media_number", 
			formatMessage(messages.searchCriteriaByContactMediaPhone)
		],
		passport: [
			"passport",
			formatMessage(messages.searchCriteriaByPassport)
		],
		"minor-ID": [
			"minor-ID",
			formatMessage(messages.searchCriteriaByMinorID)
		],
		"ID-card": ["ID-card", formatMessage(messages.searchCriteriaByIDCard)],
		"military-ID": [
			"military-ID",
			formatMessage(messages.searchCriteriaByMilitaryID)
		],
		"foreign-document": [
			"foreign-document",
			formatMessage(messages.searchCriteriaByForeignDocument)
		],
		"diplomatic-carnet": [
			"diplomatic-carnet",
			formatMessage(messages.searchCriteriaByDiplomaticCarnet)
		],
		"student-ID": [
			"student-ID",
			formatMessage(messages.searchCriteriaByStudentID)
		],
		"tax-ID": ["tax-ID", formatMessage(messages.searchCriteriaByTaxID)],
		"drivers-licence": [
			"drivers-licence",
			formatMessage(messages.searchCriteriaByDriversLicence)
		],
		"residence-number": [
			"residence-number",
			formatMessage(messages.searchCriteriaByResidenceNumber)
		],
		"work-permit": [
			"work-permit",
			formatMessage(messages.searchCriteriaByTemporaryWorkPermit)
		],
		"disability-cell": [
			"disability-cell",
			formatMessage(messages.searchCriteriaByDisabilityCell)
		],
		facebook: [
			"facebook",
			formatMessage(messages.searchCriteriaByFacebook)
		],
		twitter: ["twitter", formatMessage(messages.searchCriteriaByTwitter)],
		instagram: [
			"instagram",
			formatMessage(messages.searchCriteriaByInstagram)
		],
		tigold: ["tigold", formatMessage(messages.searchCriteriaByTigold)],
		"national-electorial-court": [
			"national-electorial-court",
			formatMessage(messages.searchCriteriaByNationalElectoralCourt)
		],
		other: ["other", formatMessage(messages.searchCriteriaByOther)]
	};
};

const parseSearchConfiguration = (searchConfigFromConsul: string): POSSearchConfiguration | undefined => {
	let defaultSearchConfiguration: string | boolean = false;
	if (!searchConfigFromConsul) {
		window.console.warn(
			"pos_search_configuration either not found or is empty in consul, using default configuration for search criteria."
		);
		defaultSearchConfiguration =
			"{\"POSSearchConfigs\":[{\"id\": \"name\", \"enabled\": true}," +
			"{\"id\": \"phone-number\",\"enabled\": true}," +
			"{\"id\": \"email\",\"enabled\": false}," +
			"{\"id\": \"contact_media_number\",\"enabled\": false}," +
			"{\"id\": \"passport\",\"identificationType\": \"passport\",\"enabled\": true}," +
			"{\"id\": \"minor-ID\",\"identificationType\": \"minor-ID\",\"enabled\": false}," +
			"{\"id\": \"ID-card\",\"identificationType\": \"identification-card\",\"enabled\": false}," +
			"{\"id\": \"military-ID\",\"identificationType\": \"military-ID\",\"enabled\": false}," +
			"{\"id\": \"foreign-document\",\"identificationType\": \"foreign-document\",\"enabled\": false}," +
			"{\"id\": \"diplomatic-carnet\",\"identificationType\": \"diplomatic-carnet\",\"enabled\": false}," +
			"{\"id\": \"student-ID\",\"identificationType\": \"student-ID\",\"enabled\": false}," +
			"{\"id\": \"tax-ID\",\"identificationType\": \"tax-ID\",\"enabled\": false}," +
			"{\"id\": \"drivers-licence\",\"identificationType\": \"drivers-licence\",\"enabled\": false}," +
			"{\"id\": \"residence-number\",\"identificationType\": \"residence-number\",\"enabled\": false}," +
			"{\"id\": \"work-permit\",\"identificationType\": \"work-permit\",\"enabled\": false}," +
			"{\"id\": \"disability-cell\",\"identificationType\": \"disability-cell\",\"enabled\": false}," +
			"{\"id\": \"facebook\",\"identificationType\": \"facebook\",\"enabled\": false}," +
			"{\"id\": \"twitter\",\"identificationType\": \"twitter\",\"enabled\": false}," +
			"{\"id\": \"instagram\",\"identificationType\": \"instagram\",\"enabled\": false}," +
			"{\"id\": \"tigold\",\"identificationType\": \"tigold\",\"enabled\": false}," +
			"{\"id\": \"national-electorial-court\",\"identificationType\": \"national-electorial-court\",\"enabled\": false}," +
			"{\"id\": \"other\",\"identificationType\": \"other\",\"enabled\": false}]}";
		try {
			return JSON.parse(defaultSearchConfiguration);
		} catch (e) {
			window.console.warn(
				"Error parsing pos_search_configuration fetched from consul",
				e
			);
			return undefined;
		}
	} else {
		return JSON.parse(searchConfigFromConsul);
	}
};

export { translationStore, parseSearchConfiguration };
