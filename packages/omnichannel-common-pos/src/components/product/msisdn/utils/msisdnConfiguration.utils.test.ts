import { MsisdnConfiguration } from "../../../../redux";
import MsisdnConfigurationUtils from "./msisdnConfiguration.utils";

const BASE_MANDATORY_CONF: MsisdnConfiguration = {
	product: "test",
	msisdn: ""
};
const MANDATORY_CONF_NO_MSISDN: MsisdnConfiguration = {
	...BASE_MANDATORY_CONF
};
const MANDATORY_CONF_WITH_MSISDN: MsisdnConfiguration = {
	...BASE_MANDATORY_CONF,
	...{ msisdn: "123" }
};

describe("isMsisdnNeedToBeConfigured", () => {
	it("should return false when no mandatory conf, no shared conf", () => {
		expect(MsisdnConfigurationUtils.isMsisdnNeedToBeConfigured({})).toBeFalsy();
	});
	it("should return true when msisdn is not set in mandatory conf, no shared conf", () => {
		expect(
			MsisdnConfigurationUtils.isMsisdnNeedToBeConfigured({
				mandatoryConfigurations: [MANDATORY_CONF_NO_MSISDN]
			})
		).toBeTruthy();
	});
	it("should return false when msisdn is set in mandatory conf, no shared conf", () => {
		expect(
			MsisdnConfigurationUtils.isMsisdnNeedToBeConfigured({
				mandatoryConfigurations: [MANDATORY_CONF_WITH_MSISDN]
			})
		).toBeFalsy();
	});
});
