import { RechargePurchaseConfigType } from "../redux";
import { B2C_SUB_CHANNEL } from "../redux/utils";

class TopUpSelector {
	static getRechargePurchaseStream(
		config: RechargePurchaseConfigType,
		subChannel: B2C_SUB_CHANNEL | undefined
	): string | undefined {
		return (
			(config.rechargePurchaseSubChannelToStreamMap &&
				subChannel &&
				config.rechargePurchaseSubChannelToStreamMap[subChannel]) ||
			config.rechargePurchaseStream
		);
	}
}
export default TopUpSelector;
