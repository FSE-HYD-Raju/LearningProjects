import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../testUtils";

import OcCancelOrderModal, { OcCancelOrderModalProps } from "./OcCancelOrderModal";
import { Order } from "../../redux/types";

describe("OcCancelOrderModal", () => {
	let minimumProps: OcCancelOrderModalProps;

	beforeEach(() => {
		minimumProps = {
			itemName: "testItem",
			order: {
				id: "testOrderId",
				type: "none",
				price: 11,
				changeable: true,
				cancelable: true,
				attributes: {
					id: "testOrderId",
					price: 11,
					status: "CANCELED",
					changeable: true,
					cancelable: true
				}
			} as any as Order,
			reasons: [
				{
					id: "treason1",
					name: "I found a better one",
					value: "PRNS",
					channels: ["b2c", "pos"],
					attributes: {
						id: "treason1",
						name: "I found a better one",
						value: "PRNS",
						channels: ["b2c", "pos"],
					}
				},
				{
					id: "treason2",
					name: "I found a better one",
					value: "PRPC",
					channels: ["b2c", "pos"],
					attributes: {
						id: "treason2",
						name: "I found a better one",
						value: "PRPC",
						channels: ["b2c", "pos"],
					}
				}
			],
			cancelOrder: (orderId: string, reason: string) => { return; }
		};
	});

	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallowWithContext(
			<OcCancelOrderModal {...minimumProps} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount with minimum props", () => {
		mountWithContext(<OcCancelOrderModal {...minimumProps} />);
	});
});
