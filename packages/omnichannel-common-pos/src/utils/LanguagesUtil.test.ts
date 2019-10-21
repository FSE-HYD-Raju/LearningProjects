import LanguagesUtil from "./LanguagesUtil";

describe("LanguagesUtil", () => {
	it("should return array of languages", () => {
		const languages = [{ code: "spa", name: "Spanish" }];

		const filteredLanguages = LanguagesUtil.uniqueLanguageCodes(languages);

		expect(filteredLanguages.length).toBe(1);
	});

	it("should combine languages with same code", () => {
		const languages = [
			{ code: "spa", name: "Spanish" },
			{ code: "spa", name: "Castilian" },
			{ code: "spa", name: "Basque" },
			{ code: "eng", name: "English" },
			{ code: "eng", name: "American" },
			{ code: "eng", name: "Nigerian" },
			{ code: "ukr", name: "Ukrainian" },
		];

		const filteredLanguages = LanguagesUtil.uniqueLanguageCodes(languages);

		expect(filteredLanguages.length).toBe(3);
		expect(filteredLanguages[0].name).toEqual("Basque / Castilian / Spanish");
		expect(filteredLanguages[1].name).toEqual("Nigerian / American / English");
		expect(filteredLanguages[2].name).toEqual("Ukrainian");
	});
});
