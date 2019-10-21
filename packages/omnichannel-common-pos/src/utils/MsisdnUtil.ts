import { UtilsCustomizationPoints, withFunctionCustomization } from "../customization";

type GetMsisdnWithSeparatedAreaCodeType = (msisdn: string) => string;

class MsisdnUtil {
	static getMsisdnWithSeparatedAreaCode: GetMsisdnWithSeparatedAreaCodeType;
	static baselineGetMsisdnWithSeparatedAreaCode = (msisdn: string): string => {
		return msisdn;
	};
}

MsisdnUtil.getMsisdnWithSeparatedAreaCode = withFunctionCustomization(
	UtilsCustomizationPoints.GET_MSISDN_WITH_SEPARATED_AREA_CODE,
	MsisdnUtil.baselineGetMsisdnWithSeparatedAreaCode
);

export default MsisdnUtil;
