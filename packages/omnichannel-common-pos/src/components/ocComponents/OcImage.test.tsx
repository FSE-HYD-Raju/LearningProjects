import * as React from "react";
import toJson from "enzyme-to-json";
import { mount, shallow } from "enzyme";

import OcImage from "./OcImage";

describe("OcImage", () => {
	it("succeeds at shallow mount with minimum props", () => {
		const wrapper = shallow(
			<OcImage
				product={{
					attributes: {}
				}}
			/>
		);
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it("succeeds at deep mount without props", () => {
		mount(
			<OcImage
				product={{
					attributes: {}
				}}
			/>
		);
	});

	it("should render a product", () => {
		const props = {
			product: {
				attributes: {
					images: [
						{
							location: "product.png",
							altText: "The product you need"
						}
					]
				}
			},
			imgClasses: "foo bar"
		};

		const wrapper = mount(<OcImage {...props} />);

		const img = wrapper.find("img");
		expect(img.prop("src")).toEqual(
			props.product.attributes.images[0].location
		);
		// location not rendered for product image
		expect(img.prop("alt")).toEqual(
			props.product.attributes.images[0].altText
		);
		// alt text not rendered for product image
		expect(img.prop("className")).toEqual(
			props.imgClasses
		);
		// no class names rendered for product image
	});

	it("should appear as span when there's a product without images", () => {
		const props = {
			product: {
				attributes: {
					images: []
				}
			},
			imgClasses: "foo bar"
		};

		mount(<OcImage {...props} />);
	});
});
