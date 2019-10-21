import actions, { DigitalLifeActions } from "../../actions";
import PersonService from "../../services/PersonService";
import { digitalLifeSaga } from "./digitalLife.saga";
import { PaginationData, PersonsOrderData } from "../../types";
const SagaTester = require("redux-saga-tester").default;

const ordersResponse: any = require("../../../../src/flux/tests/test-utils/juanita_orders.json");

const originalGetPersonOrders = PersonService.getPersonOrders;

describe("digitalLife.saga", () => {
	let sagaTester: any = null;

	beforeAll(() => {
		PersonService.getPersonOrders = jest.fn().mockReturnValue(ordersResponse);
	});

	afterAll(() => {
		PersonService.getPersonOrders = originalGetPersonOrders;
	});

	beforeEach(() => {
		sagaTester = new SagaTester({});
		sagaTester.start(digitalLifeSaga);
	});

	it("should load orders when called", async () => {
		sagaTester.dispatch(actions.digitalLife.getPersonOrders("juanita", {}));

		await sagaTester.waitFor(DigitalLifeActions.GET_PERSON_ORDERS_COMPLETE);

		const calledAcion = sagaTester.getLatestCalledAction();
		const expected: PersonsOrderData = {
			orders: ordersResponse.data,
			orderItems: ordersResponse.included,
			orderFilters: [],
			shipments: [],
			paginationData: ({
				first: undefined,
				next: undefined,
				prev: undefined,
				last: undefined,
				start: undefined,
				end: undefined,
				totalResourceCount: undefined
			} as any as PaginationData)
		};
		expect(calledAcion).toEqual(actions.digitalLife.getPersonOrdersComplete(expected));
		expect(PersonService.getPersonOrders).toHaveBeenCalledTimes(1);
		expect(PersonService.getPersonOrders).toHaveBeenCalledWith("juanita", {});
	});
});
