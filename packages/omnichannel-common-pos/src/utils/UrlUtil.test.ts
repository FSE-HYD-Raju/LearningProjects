import UrlUtil from "../../src/utils/UrlUtil";

describe("UrlUtil start test", () => {
    const url = "/servicedesk/customer?toolmode=true&indivi*dualIdasionde";
    it("return part of the string which holds query parameters ", () => {
		expect(UrlUtil.getQueryString(url, "?")).toEqual(
			"?toolmode=true&indivi*dualIdasionde"
		);
	});
});
