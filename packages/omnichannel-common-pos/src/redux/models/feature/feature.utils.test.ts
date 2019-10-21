"use strict";

import * as utils from "./feature.utils";
import { setCustomizationPointsMapping } from "../../../customization";

describe("feature.utils", () => {
	describe("mapDomainContextKeys()", () => {
		const { mapDomainContextKeys } = utils;

		const baselineState = {
			foo: "bar"
		};

		it("returns keys for baseline", () => {
			const baselineMap = mapDomainContextKeys(baselineState as any);
			/* yes, it is intentional that the return value is an empty object and not the (whole) baselineState. */
			expect(baselineMap).toEqual({});
		});

		it("returns customization keys also, using custom mapper", () => {
			const customMapper = (state: object) => {
				return {
					fuzz: baselineState.foo
				};
			};

			setCustomizationPointsMapping({
				functions: { DOMAIN_CONTEXT_KEY_MAPPER: customMapper }
			});

			const customizationMap = mapDomainContextKeys(baselineState as any);

			/* yes, it is intentional that the return value is an empty object and not the (whole) baselineState. */
			expect(customizationMap).toEqual({
				fuzz: baselineState.foo
			});
		});
	});
});
