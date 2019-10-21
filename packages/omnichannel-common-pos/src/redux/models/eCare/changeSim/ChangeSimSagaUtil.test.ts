import ChangeSimSagaUtil from "./ChangeSimSagaUtil";
import { submitData as baseSubmitData } from "./changeSimTestData";
import { ChangeSimServiceSubmitData } from "../../../services/ChangeSimService";
import { cloneDeep } from "lodash";
import CasesService from "../../../services/CasesService";
import { MockDataMaker } from "../../../../testUtils";
import ProductOfferingService from "../../../services/ProductOfferingService";

describe("ChangeSimSagaUtil", () => {
	let submitData: ChangeSimServiceSubmitData;
	beforeEach(() => {
		submitData = cloneDeep(baseSubmitData);
		CasesService.addCustomerCase = jest.fn();
	});
	describe("submitCaseWithAttachments", () => {
		const attachments = [new File([], "test.png")];

		it("should do nothing when no attachments", async () => {
			submitData.caseAttachments = [];
			await ChangeSimSagaUtil.submitCaseWithAttachments(submitData);
			expect(CasesService.addCustomerCase).not.toBeCalled();
		});
		it("should do nothing when no caseCategory", async () => {
			submitData.caseCategoryId = "";
			submitData.caseAttachments = attachments;
			await ChangeSimSagaUtil.submitCaseWithAttachments(submitData);
			expect(CasesService.addCustomerCase).not.toBeCalled();
		});
		it("should create case when has attachments", async () => {
			submitData.caseAttachments = attachments;
			await ChangeSimSagaUtil.submitCaseWithAttachments(submitData);
			expect(CasesService.addCustomerCase).toBeCalledWith({
				actorId: MockDataMaker.user.getDefaultValues().id,
				description: "",
				categoryId: submitData.caseCategoryId,
				formattedName: submitData.initializeRequest.user.attributes.formattedName,
				attachments
			});
		});
	});

	describe("fetchReasons", () => {
		it("should fetch product offerings one by one", async () => {
			ProductOfferingService.getProductOffering = jest.fn().mockImplementation(poId => poId);
			const productOfferings = await ChangeSimSagaUtil.fetchReasons(["1", "2"]);
			expect(productOfferings).toEqual(["1", "2"]);
			expect(ProductOfferingService.getProductOffering).toHaveBeenCalledWith("1");
			expect(ProductOfferingService.getProductOffering).toHaveBeenCalledWith("2");
		});
		it("should skip error on fetching", async () => {
			ProductOfferingService.getProductOffering = jest.fn().mockImplementation(poId => {
				if (poId === "1") {
					throw new Error();
				}
				return poId;
			});
			const productOfferings = await ChangeSimSagaUtil.fetchReasons(["1", "2"]);
			expect(productOfferings).toEqual(["2"]);
			expect(ProductOfferingService.getProductOffering).toHaveBeenCalledWith("1");
			expect(ProductOfferingService.getProductOffering).toHaveBeenCalledWith("2");
		});
	});
});
