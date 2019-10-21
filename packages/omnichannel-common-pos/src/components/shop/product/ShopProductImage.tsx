import { ProductOffering, CommercialEnrichments } from "../../../redux";
import cssns from "../../../utils/cssnsConfig";
import { get, isEmpty } from "lodash";
import classnames from "classnames";
import { FC } from "react";

const { React } = cssns("ShopProductImage");

export interface ShopProductImageProps {
	idx?: number;
	width?: string;
	height?: string;
	product: ProductOffering;
}

const ShopProductImage: FC<ShopProductImageProps> = props => {
	const { product } = props;

	const commercialEnrichments: Array<CommercialEnrichments> = get(product, "attributes.commercialEnrichments", []);
	const commercialEnrichment = commercialEnrichments.find((ce: CommercialEnrichments) => {
		return !isEmpty(ce.media);
	});

	const src = get(commercialEnrichment, "media.thumbnail-image");

	const customStyles = {
		width: props.width,
		height: props.height
	};

	const imageClasses = classnames({
		image: true,
		placeholder: !src
	});

	const combinedId = `ShopProductImage-${product.id}` + props.idx ? `-${props.idx}` : "";
	return (
		<div className="container">
			<img
				className={imageClasses}
				id={combinedId}
				src={src ? src : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
				style={props.width || props.height ? customStyles : {}}
			/>
		</div>
	);
};

export default ShopProductImage;
