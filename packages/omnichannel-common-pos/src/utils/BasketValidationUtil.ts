// @flow
import axios from "axios";
import { get } from "lodash";
import { ErrorContainer } from "../redux/services";

import { ICCIDValidationConditions, AppState } from "../redux";
import actions from "../redux/actions";

const Apicalls = require("./Apicalls");
import { FluxAlt } from "../redux/types/FluxAlt";

const commonHeaders = { "Content-Type": "application/vnd.api+json" };

const apiCalls = new Apicalls(axios);

export type ICCIDValidationParams = {
	iccid: string;
	conditions: ICCIDValidationConditions;
};

export type ICCIDPreactivationValidationParams = {
	iccid: string;
	conditions: ICCIDValidationConditions;
	configuration: {
		inputtedCharacteristics: any;
		id: string;
	},
	numberOrigin: string;
	path: Array<object>;
	alt: FluxAlt<AppState>;
};

export default class BasketValidationUtil {

	/* Sends CH_IMEI characteristic for validation to the backend
	 * response is either success 200 or specific error codes as 400
	 */
	static validateImei = async (imei: string) => {
		const payload = {
			type: "eligibility-decisions",
			attributes: {
				parameters: {
					imei
				},
				recipeId: "device-registration"
			},
			meta: {}
		};
		const resp = await apiCalls.post(
			"/eligibility-decisions",
			payload,
			commonHeaders
		);
		return resp;
	};

	/* Sends CH_Friend_Number characteristic for validation to the backend
	 * Response is either success 200 or specific error codes as 400
	 */
	static validateFnF = async (FnF: string, msisdn: string) => {
		const payload = {
			type: "eligibility-decisions",
			attributes: {
				parameters: {
					"friend-msisdn": FnF,
					msisdn: msisdn
				},
				recipeId: "friend-number-validation"
			},
			meta: {}
		};
		const resp = await apiCalls.post(
			"/eligibility-decisions",
			payload,
			commonHeaders
		);
		return resp;
	};

	static validateICCID = async (params: ICCIDValidationParams) => {
		const { iccid, conditions } = params;
		let response =  await apiCalls.get(`/sim-cards/${iccid}`, false);

		const simStatus: string = get(response, "data.attributes.simStatus", false);
		const validSimStatus: Array<string>  = get(conditions, "simStatus", []);

		if (!validSimStatus.includes(simStatus)) {
			response = ErrorContainer.composeErrorContainerWithSingleError(
				"400",
				"simCardStateInvalid",
				"Simcard State Invalid",
				"",
				false
			);
		}
		return response;
	};

	static validatePreactivatedICCID = async (params: ICCIDPreactivationValidationParams) => {
		const { iccid, conditions, configuration, numberOrigin, path, alt } = params;
		const response = await apiCalls.get(`/sim-cards/${iccid}`);
		const simCardFound = get(response, "data");

		const simStatus: string = get(response, "data.attributes.simStatus", false);
		const validSimStatus: Array<string>  = get(conditions, "simStatus", []);

		const resourceStockName = get(response, "data.attributes.msisdn.resourceStocks.name", "");
		const validResourceStockName = get(conditions, "resourceStockName", "");

		const validConditions =
			validSimStatus.includes(simStatus) &&
			resourceStockName === validResourceStockName;

		const preactivatedMsisdn = validConditions ? get(response,
			"data.attributes.msisdn.number") : false;

		if (simCardFound && preactivatedMsisdn) {
			if (numberOrigin) {
				const numberOriginPath = path || [{ po: configuration.id }];
				// fix-me remove mutation
				if (params.configuration &&
					params.configuration.inputtedCharacteristics
					!== undefined &&
					params.configuration.inputtedCharacteristics[numberOrigin]
					!== undefined) {
					params.configuration.inputtedCharacteristics[numberOrigin] = preactivatedMsisdn;
				}
				alt.reduxStore.dispatch(actions.productOfferingConfiguration.setInputtedCharacteristic(
					numberOriginPath,
					numberOrigin,
					preactivatedMsisdn
				));
			}
			return response;
		} else if (simCardFound && !preactivatedMsisdn || !response.data) {
			return ErrorContainer.composeErrorContainerWithSingleError(
				"400",
				"simCardNotPreactivated",
				"Simcard Not Preactivated",
				"",
				false
			);
		}
		return response;
	};

}
