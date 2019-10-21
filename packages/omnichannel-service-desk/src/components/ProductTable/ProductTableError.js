import React, { Component } from "react";
import { contextTypesValidationMap, OcAlert, OcAlertType } from "omnichannel-common-pos";
import PropTypes from "prop-types";
import messages from "./ProductTableError-messages";

type Props = {
	errorToBeShownOnProductTable: Object,
	clearErrorOnProductTable: Function
};

export default class ProductTableError extends Component<Props> {
	static displayName = "ProductTableError";
	static contextTypes = contextTypesValidationMap;

	static propTypes = {
		errorToBeShownOnProductTable: PropTypes.object,
		clearErrorOnProductTable: PropTypes.func
	};

	componentWillUnmount() {
		if (this.props.clearErrorOnProductTable) {
			this.props.clearErrorOnProductTable();
		}
	}

	render() {
		const formatMessage = this.context.intl.formatMessage;
		const { errorToBeShownOnProductTable } = this.props;
		return (
			<div>
				{errorToBeShownOnProductTable &&
				errorToBeShownOnProductTable.code && (
					<div className="product-error">
						{errorToBeShownOnProductTable.code ===
							"out-of-stock" && (
							<OcAlert alertType={OcAlertType.DANGER}>
								{formatMessage({
									...messages.errorOutOfStock
								})}
							</OcAlert>
						)}
						{errorToBeShownOnProductTable.code ===
							"unmapped-error" && (
							<OcAlert alertType={OcAlertType.DANGER}>
								{formatMessage({
									...messages.errorUnmmaped
								})}
							</OcAlert>
						)}
						{errorToBeShownOnProductTable.code ===
							"no-disability-identification" && (
							<OcAlert alertType={OcAlertType.DANGER}>
								{formatMessage({
									...messages.errorNoDisabilityIdentification
								})}
							</OcAlert>
						)}
						{errorToBeShownOnProductTable.code ===
							"ERR_CUSTOMER_TARIFA_INELIGIBLE" && (
							<OcAlert alertType={OcAlertType.DANGER}>
								{formatMessage({
									...messages.errorNotTarifaSolidariaEligible
								})}
							</OcAlert>
						)}
						{errorToBeShownOnProductTable.code ===
							"ERR_CUSTOMER_TARIFA_BLACKLISTED" && (
							<OcAlert alertType={OcAlertType.DANGER}>
								{formatMessage({
									...messages.errorTarifaSolidariaBlacklisted
								})}
							</OcAlert>
						)}
					</div>
				)}
			</div>
		);
	}
}
