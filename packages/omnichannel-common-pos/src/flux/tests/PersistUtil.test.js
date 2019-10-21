import { persistToStorage } from "../PersistUtil";

describe("PersistUtil", () => {
	const locationStoreState = {
		path: "path",
		query: "query"
	};

	const stores = {
		UrlLocationStore: { ...locationStoreState }
	};
	const alt = {
		stores: {
			...stores
		},
		takeSnapshot: () => {
			return JSON.stringify({ ...stores });
		}
	};

	afterEach(() => {
		sessionStorage.removeItem("app");
	});

	it("should add app to sessionStorage", () => {
		persistToStorage("app", alt);
		const app = JSON.parse(sessionStorage.getItem("app"));
		expect(app).not.toBeNull();
		expect(app.UrlLocationStore).toEqual(locationStoreState);
	});
});
