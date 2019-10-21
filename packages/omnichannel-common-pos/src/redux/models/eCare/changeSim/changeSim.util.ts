import { ChangeResourceInitialization, ChangeSimActionInitializeRequest } from "../../../types";

export class ChangeSimUtil {
	static extractBasketId(changeResourceInitialization?: ChangeResourceInitialization): string | undefined {
		try {
			return changeResourceInitialization!.relationships!.basket!.data!.id;
		} catch (e) {
			return;
		}
	}
	static extractBasketItemIdToRemove(
		changeResourceInitialization?: ChangeResourceInitialization
	): string | undefined {
		try {
			return changeResourceInitialization!.basketItems![0].id;
		} catch (e) {
			return;
		}
	}
}
