import { SessionUtils } from "./index";
import { SessionStorageKeysEnum } from "../../redux/services/SessionStorage";

const TEST_SESSION_KEY = SessionStorageKeysEnum.app;

describe("SessionUtils", () => {
	afterEach(() => {
		sessionStorage.removeItem(TEST_SESSION_KEY);
	});

	describe("setItem", () => {
		it("should set item", () => {
			SessionUtils.setItem(TEST_SESSION_KEY, "true");
			const auth = sessionStorage.getItem(TEST_SESSION_KEY);
			expect(auth).toBe("true");
		});
	});

	describe("getTimedItem ", () => {
		it("should get value from sessionStorage", async () => {
			SessionUtils.setTimedItem(TEST_SESSION_KEY, "true");

			const item = SessionUtils.getTimedItem(TEST_SESSION_KEY, 20);

			expect(item).toBe("true");
		});

		it("should return null if sessionStorage item has been expired", async () => {
			SessionUtils.setTimedItem(TEST_SESSION_KEY, "true");
			await new Promise(resolve => setTimeout(resolve, 40));
			const item = SessionUtils.getTimedItem(TEST_SESSION_KEY, 20);
			expect(item).toBe(null);
		});
	});
});
