import * as React from "react";
import { get } from "lodash";

type OcImagesArray = {
	location: string,
	altText: string
};
interface OcImageProps {
	product: { attributes: { images?: Array<OcImagesArray> } };
	imgClasses?: string;
	key?: string;
}

const OcImage: React.FC<OcImageProps> = props => {
	const {
		product,
		imgClasses,
		key,
		...rest
	} = props;
	const img = get(product, "attributes.images[0]");

	if (!img) {
		return <span/>;
	}

	return (
		<img
			src={img.location}
			alt={img.altText}
			className={imgClasses}
			{...rest}
			key={key}
		/>
	);
};

export default OcImage;
export { OcImagesArray, OcImageProps };
