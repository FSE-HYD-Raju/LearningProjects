import cssns from "../../../utils/cssnsConfig";
import { get, isEmpty } from "lodash";
import { FC } from "react";
import { CommercialEnrichments, ProductOffering } from "../../../redux/types";

const { React } = cssns("ShopBundleImage");

interface ShopBundleImageProps {
	product: ProductOffering;
	idx: number;
}

const ALTERNATIVE_TEXT: string = "ShopBundleImage";

const ShopBundleImage: FC<ShopBundleImageProps> = (props: ShopBundleImageProps) => {
	const product = get(props, "product");

	const commercialEnrichments = get(product, "attributes.commercialEnrichments");

	const commercialEnrichment = commercialEnrichments.find((commercialEnrichment: CommercialEnrichments) => {
			return !isEmpty(commercialEnrichment.media);
		}
	);

	const src = get(commercialEnrichment, "media.thumbnail-image");
	const className = src ? "shop-bundle-image" : "-shop-bundle-image-empty";

	return (
		<div>
			<img
				id={`ShopBundleImage-${product.id}-${props.idx}`}
				className={className}
				src={src ? src : ""}
				alt={ALTERNATIVE_TEXT}
			/>
		</div>
	);
};

export default ShopBundleImage;
export {
	ShopBundleImageProps,
};
