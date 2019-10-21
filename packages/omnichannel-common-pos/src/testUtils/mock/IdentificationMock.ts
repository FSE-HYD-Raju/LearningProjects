import { Identification } from "../../redux/types";

export default class IdentificationMock {
	static make(): Identification {
		return {
			id: "identification_1",
			identificationId: "passport_1",
			type: "passport"
		};
	}
}
