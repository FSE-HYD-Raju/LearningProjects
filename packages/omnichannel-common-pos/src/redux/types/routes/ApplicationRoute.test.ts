import ApplicationRoute from "./ApplicationRoute";

interface TestParams {
	categoryId: string;
	productId: string;
}

describe("ApplicationRoute", () => {
	it("should store path that was provided with constructor", () => {
		const route = new ApplicationRoute("test");
		expect(route.path).toBe("test");
	});

	it("should create correct link", () => {
		const route = new ApplicationRoute<TestParams>("/test/:categoryId/:productId");
		const params: TestParams = {
			categoryId: "1",
			productId: "aaa"
		};
		expect(route.createLink(params)).toBe("/test/1/aaa");
	});

	it("should correctly match path", () => {
		const route = new ApplicationRoute<TestParams>("/test/:categoryId/:productId");
		expect(route.pathRegexp.exec("/test/anyCat/anyProd")).not.toBeNull();
		expect(route.pathRegexp.exec("/test/anyCat/anyProd/other")).toBeNull();
	});
});
