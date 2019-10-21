// @Flow
import PropTypes from "prop-types";
import {
	cssns,
	contextTypesValidationMap,
	OcTextInput,
	OcInputLabelPosition,
	OcButtonType,
	OcButton
} from "omnichannel-common-pos";
import { Component } from "react";
import messages from "../../index.messages";

const { React } = cssns("ProductTable");

class ProductTableAddressValidation extends Component {
	static displayName = "ProductTableAddressValidation";
	static contextTypes = contextTypesValidationMap;

	static propTypes = {
		validateStreetAddress: PropTypes.func,
		addressProposals: PropTypes.Object,
		productCategory: PropTypes.Object
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
			searchTerm: ""
		};
	}

	static defaultProps = {
		searchTerm: null
	};

	handleTextInput = (searchTerm: string) => {
		const trimmedTerm = searchTerm.trim();

		this.setState(
			{
				searchTerm: trimmedTerm
			},
			this.validateStreetAddress
		);
	};

	validateStreetAddress = () => {
		const trimmedTerm = this.state.searchTerm.trim();
		if (trimmedTerm && trimmedTerm !== "") {
			this.props.validateStreetAddress(
				trimmedTerm,
				this.props.productCategory.id
			);
		}
	};

	render() {
		const { formatMessage } = this.context.intl;
		const { searchTerm } = this.state;
		const { addressProposals } = this.props;
		const showAddressValidationError = addressProposals && !addressProposals.valid && searchTerm.length > 0;

		return (
			<div className="validateStreetAddressFieldWrapper">
				<OcTextInput
					label="Find"
					labelPosition={OcInputLabelPosition.LEFT}
					className="validateStreetAddresField"
					placeholder={formatMessage({
						...messages.street
					})}
					onKeyPress={event => {
						if (event.key === "Enter") {
							this.handleTextInput(event.target.value);
						}
					}}
					required={true}
					addonRight={
						<OcButton
							className="validateStreetAddressButton"
							onClick={this.validateStreetAddress}
							buttonType={OcButtonType.LINK}
						>
							<i className="fa fa-search" />
						</OcButton>
					}
					errorMessage={
						showAddressValidationError ? (
							formatMessage({
								...messages.addressNotFound
							})
						) : (
							undefined
						)
					}
				/>
			</div>
		);
	}
}

export default ProductTableAddressValidation;
