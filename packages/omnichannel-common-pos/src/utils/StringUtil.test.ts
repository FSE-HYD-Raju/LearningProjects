import StringUtil from "../../src/utils/StringUtil";

describe("StingUtil start test", () => {
	it("run escapeSpecialChar remove special car", () => {
		expect(StringUtil.escapeSpecialCharacter("one@two@tree@@")).toEqual(
			"onetwotree"
		);
	});

	it("run escapeSpecialChar no special cahracter keep same", () => {
		expect(StringUtil.escapeSpecialCharacter("onetwotree")).toEqual(
			"onetwotree"
		);
	});

	it("run escapeSpecialChar null string ", () => {
		expect(StringUtil.escapeSpecialCharacter(null)).toEqual(null);
	});

	it("run escapeSpecialChar check all special character", () => {
		expect(
			StringUtil.escapeSpecialCharacter(
				"[`~!@#$%^&*()_|+\\-=?;:'\",.<>\\{\\}\\[\\]\\\\\\/]"
			)
		).toEqual("");
	});
});
