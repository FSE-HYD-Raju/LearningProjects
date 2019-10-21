import { put, call } from "redux-saga/effects";
import { onSubmit } from "./changeSim.saga";
import { ChangeSimActions, LoadingOverlayActions } from "../../../actions";
import { default as ChangeSimService, ChangeSimServiceSubmitData } from "../../../services/ChangeSimService";
import { changeSim } from "./changeSim.actions";
import { cloneDeep } from "lodash";
import ChangeSimSagaUtil, { ReinitializationResult } from "./ChangeSimSagaUtil";
import { submitData as baseSubmitData } from "./changeSimTestData";

describe("changeSim.saga", () => {
	let submitData: ChangeSimServiceSubmitData;
	beforeEach(() => {
		submitData = cloneDeep(baseSubmitData);
	});
	it("should do nothing when no submit data provided", () => {
		const gen = onSubmit({ type: ChangeSimActions.SUBMIT });
		expect(gen.next().done).toBe(true);
	});
	it("succeeds at sim change", () => {
		const gen = onSubmit({ type: ChangeSimActions.SUBMIT, submitData });
		expect(gen.next().value).toMatchObject(put({ type: LoadingOverlayActions.SHOW_LOADING_OVERLAY }));
		expect(gen.next().value).toMatchObject(call(ChangeSimSagaUtil.submitCaseWithAttachments, submitData));
		expect(gen.next().value).toMatchObject(call(ChangeSimService.submit, submitData));
		expect(gen.next().value).toMatchObject(put(changeSim.submitComplete()));
		expect(gen.next().value).toMatchObject(put(changeSim.showChangeSimModal(false)));
		expect(gen.next().value).toMatchObject(put({ type: LoadingOverlayActions.HIDE_LOADING_OVERLAY }));
		expect(gen.next().done).toBeTruthy();
	});
	it("should call reinitialize when no basketId is set", () => {
		const newBasketId = "new_basket_id";
		const newBasketItemIdToRemove = "new_item";
		submitData.basketId = undefined;
		const gen = onSubmit({ type: ChangeSimActions.SUBMIT, submitData });
		expect(gen.next().value).toMatchObject(put({ type: LoadingOverlayActions.SHOW_LOADING_OVERLAY }));
		expect(gen.next().value).toMatchObject(call(ChangeSimSagaUtil.reinitializeBeforeSubmit, submitData));
		expect(
			gen.next({ basketId: newBasketId, basketItemIdToRemove: newBasketItemIdToRemove } as ReinitializationResult)
				.value
		).toMatchObject(call(ChangeSimSagaUtil.submitCaseWithAttachments, submitData));
		expect(submitData.basketId).toBe(newBasketId);
		expect(submitData.basketItemIdToRemove).toBe(newBasketItemIdToRemove);
		expect(gen.next().value).toMatchObject(call(ChangeSimService.submit, submitData));
		expect(gen.next().value).toMatchObject(put(changeSim.submitComplete()));
		expect(gen.next().value).toMatchObject(put(changeSim.showChangeSimModal(false)));
		expect(gen.next().value).toMatchObject(put({ type: LoadingOverlayActions.HIDE_LOADING_OVERLAY }));
		expect(gen.next().done).toBeTruthy();
	});
	it("manages sim change submit failure", () => {
		const gen: any = onSubmit({ type: ChangeSimActions.SUBMIT, submitData });
		expect(gen.next().value).toMatchObject(put({ type: LoadingOverlayActions.SHOW_LOADING_OVERLAY }));
		// submit case
		gen.next();
		// submit order
		expect(gen.throw(new Error("test")).value).toMatchObject(put(changeSim.cleanup(submitData.basketId!)));
		expect(gen.next().value).toMatchObject(put(changeSim.submitComplete()));
		expect(gen.next().value).toMatchObject(put({ type: LoadingOverlayActions.HIDE_LOADING_OVERLAY }));
		expect(gen.next().done).toBeTruthy();
	});
});
