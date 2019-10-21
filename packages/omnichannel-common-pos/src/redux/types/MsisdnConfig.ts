export interface MsisdnConfig {
	mandatoryConfigurations?: Array<MsisdnConfiguration>;
}

export interface MsisdnConfiguration {
	product: string;
	msisdn?: string;
}
