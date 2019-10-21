import * as React from "react";
import { mountWithContext, shallowWithContext } from "omnichannel-common-pos";
import InstallationTimeConfigurationModal from "./InstallationTimeConfigurationModal";

// TODO: Write better tests later
describe("InstallationTimeConfigurationModal", () => {
	const minProps = {
		setInputtedCharacteristic: () => {},
		toggleInstallationTimeConfigurationModal: () => {},
		showInstallationTimeConfigurationModal: true,
		installationTimeConfig: {
			path: [{}],
			key: "key",
		},
		resetConfigurableInstallationTime: () => {},
		configurations: {}
	};

	it("succeeds at shallow mount with min props", () => {
		const wrapper = shallowWithContext(	<InstallationTimeConfigurationModal {...minProps} />);
	});

	it("succeeds at deep mount with min props", () => {
		mountWithContext(<InstallationTimeConfigurationModal {...minProps} />);
	});
});
