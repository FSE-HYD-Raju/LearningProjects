import { defineMessages } from "react-intl";

const messages = defineMessages({
	errorOutOfStock: {
		id: "out-of-stock-error-messag",
		description: "ProductTableError, out of stock error message",
		defaultMessage: "Out of stock"
	},
	errorUnmmaped: {
		id: "unmapped-error-message",
		description:
			"ProductTableError, shown when there is an error within a ProductOffering that is not mapped in consul",
		defaultMessage: "An unrecognized error has occurred"
	},
	errorNoDisabilityIdentification: {
		id: "no-disability-identification",
		description:
			"ProductTableError, shown when user has no required disability identification",
		defaultMessage: "This plan is only for disabled persons."
	},
	errorNotTarifaSolidariaEligible: {
		id: "ERR_CUSTOMER_TARIFA_INELIGIBLE",
		description:
			"ProductTableError, shown when customer already has a tarifa solidaria plan",
		defaultMessage:
			"Customer already has a Tarifa Solidaria Plan with an Operator (Tigo / Others)"
	},
	errorTarifaSolidariaBlacklisted: {
		id: "ERR_CUSTOMER_TARIFA_BLACKLISTED",
		description:
			"ProductTableError, shown when customer is blacklisted for purchasing a tarifa solidaria plan",
		defaultMessage:
			"Customer is blacklisted by ATT for taking benefit of Tarifa Solidaria Plan"
	}
});

export default messages;
