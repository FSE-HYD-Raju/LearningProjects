import { MsisdnConfigurationProps } from "../../msisdn/withMsisdnConfiguration";

interface ProductOfferingMsisdnConfigurationProps extends Pick<MsisdnConfigurationProps,
	Exclude<keyof MsisdnConfigurationProps, "productNeedsMsisdnConfiguration">> {
}

export { ProductOfferingMsisdnConfigurationProps };
