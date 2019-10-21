import { cssns } from "omnichannel-common-pos";
import PropTypes from "prop-types";
import ProductTable from "./ProductTable";

const { React } = cssns("MultiProductTable");

const MultiProductTable = ({
	subCategories,
	search,
	columns,
	categoryName,
	targetAgreementId,
	...other
}) => (
	<div>
		{subCategories.map((subCategory, index) => (
			<div>
				<h4>{subCategory.attributes.title}</h4>
				<ProductTable
					indexKey={subCategory.attributes.title + "-" + index}
					{...other}
					items={subCategory.attributes.productOfferings}
					search={search}
					columns={columns}
					categoryName={categoryName}
					targetAgreementId={targetAgreementId}
				/>
			</div>
		))}
	</div>
);

MultiProductTable.propTypes = {
	subCategories: PropTypes.array,
	search: PropTypes.string,
	columns: PropTypes.array,
	categoryName: PropTypes.string,
	targetAgreementId: PropTypes.string
};

export default MultiProductTable;
