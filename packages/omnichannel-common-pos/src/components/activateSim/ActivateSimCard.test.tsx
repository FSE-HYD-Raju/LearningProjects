import * as React from "react";
import { mountWithContext, shallowWithContext } from "../../testUtils";
import ActivateSimCard, { ActivateSimCardProps, SimCardActivationInfo } from "./ActivateSimCard";
import { ActivateSimOrderData, User, ActivateSimConfigurationType } from "../../redux/types";

const activateSimOrderData: ActivateSimOrderData = require("./testdata/activateSimOrdersData.json");

const user: User = {
	id: "dummy-user-id",
	attributes: {
		firstName: "Thomas"
	}
} as User;

const configuration: ActivateSimConfigurationType = {
	verificationCharacteristicName: "CH_Allowed_Doc_Verif_Method",
	iccidVerificationValue: "sim_iccid",
	videoVerificationValue: "video",
	activatePOIds: ["PO_change_sim"],
	deliveryPOIds: ["PO_HomeDelivery"]
};

describe("ActivateSimCard", () => {
	let props: ActivateSimCardProps;

	beforeEach(() => {
		props = {} as ActivateSimCardProps;
	});

	it("succeeds at shallow mount without props", () => {
		const wrapper = shallowWithContext(<ActivateSimCard {...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mountWithContext(<ActivateSimCard {...props} />);
	});

	it("should call getInProgressOrders on mount", () => {
		const getInProgressOrders = jest.fn();
		props = ({
			user,
			actions: {
				getInProgressOrders
			}
		} as any) as ActivateSimCardProps;

		mountWithContext(<ActivateSimCard {...props} />);

		expect(getInProgressOrders).toBeCalledWith(user.id);
	});

	it("should show banner for proper orders", () => {
		props = ({
			user,
			activateSimOrderData,
			configuration,
			actions: {
				getInProgressOrders: () => {}
			}
		} as any) as ActivateSimCardProps;

		const wrapper = mountWithContext(<ActivateSimCard {...props} />);

		const banner = wrapper.find("ActivateSimBanner");
		expect(banner.length).toBe(1);
		expect(banner.props().name).toBe("Thomas");

		const simCardActivationInfo: SimCardActivationInfo[] = banner.props().simCardActivationInfo;
		expect(simCardActivationInfo.length).toBe(1);

		expect(simCardActivationInfo[0].iccid).toBe("8939883295001002529");
		expect(simCardActivationInfo[0].orderReference).toBe("CH231020181631");
		expect(simCardActivationInfo[0].tocTocUrl).toBe(
			"http://toctoc.com?token=eyJhbGciOiJIUzI1NiJ9.eyJPcmRlcklkIjoiSGFyZEJfSG9tZURlbGl2ZXJ5XzE1MzgzODM2MzkifQ.q3DNQrYZpAVufkDU6CwCDhqnOe4f8n6v3-JEjwxq3zA"
		);
		expect(simCardActivationInfo[0].iccidVerification).toBeTruthy();
	});
});
