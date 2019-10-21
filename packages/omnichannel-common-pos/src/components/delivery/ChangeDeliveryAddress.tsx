import { isEqual } from "lodash";
import * as React from "react";
import classnames from "classnames";
import { Country, PostalAddress, SchemaItem, StoredCustomerType, ContactMediaTypeEnum, PostalAddressValidationErrorsType } from "../../redux/types";
import { ContextType, contextTypesValidationMap } from "../../types";
import PersonDetailsPostalAddressForm from "./forms/PersonDetailsPostalAddressForm";
import PostalAddressUtil from "../../utils/user/PostalAddressUtil";
import AddressValidationHandlerContainer from "../addressValidationHandler/AddressValidationHandlerContainer";

const withSchema = require("../../schemas/withSchema");

interface ChangeDeliveryAddressOwnProps {
	groupPostalAddressFormFields?: boolean;
	displayConfirmation?: boolean;
	skipProposals?: boolean;
	mode?: string;
	storedDeliveryAddress: any;
	isLoggedIn: boolean;
	storedCustomer: StoredCustomerType | undefined;
	storeValidAddressOnChange: boolean;
}

interface ChangeDeliveryAddressStateProps {
	countries: Array<Country>;
	addressValidationError: PostalAddressValidationErrorsType | undefined;
	schema: SchemaItem;
}

interface ChangeDeliveryAddressActionProps {
	actions: {
		clearAddressValidationError: () => void;
		storeSelectedShippingAddress: (address: PostalAddress, forceUpdateAddress?: boolean) => void;
		validateAddress: (address: Partial<PostalAddress>) => void;
		showAddressValidationLoader?: () => void,
		hideAddressValidationLoader?: () => void,
	};
}
interface ChangeDeliveryAddressProps
	extends ChangeDeliveryAddressOwnProps,
		ChangeDeliveryAddressStateProps,
		ChangeDeliveryAddressActionProps {}
interface ChangeDeliveryAddressState {
	model: Partial<PostalAddress>;
	isAddressValidationError: boolean;
	isValid: boolean;
	loading: boolean;
}

const CHANGE_SIM_MODE = "change-sim";

class ChangeDeliveryAddress extends React.Component<ChangeDeliveryAddressProps, ChangeDeliveryAddressState> {
	static contextTypes: React.ValidationMap<ContextType> = contextTypesValidationMap;

	containerRef: React.RefObject<HTMLDivElement> = React.createRef();

	constructor(props: ChangeDeliveryAddressProps, context: ContextType) {
		super(props, context);

		const model = this.props.storedDeliveryAddress;

		this.state = {
			isValid: model && Boolean(model.id),
			loading: false,
			model,
			isAddressValidationError: false
		};
	}

	componentWillReceiveProps(newProps: ChangeDeliveryAddressProps) {
		if (newProps.addressValidationError && !this.state.isAddressValidationError) {
			this.setState({ isAddressValidationError: true });
		}
	}

	handleInputChange = (model: any) => {
		this.setState({ model, isAddressValidationError: false });
		if (this.props.addressValidationError) {
			this.props.actions.clearAddressValidationError();
		}
		this.validateModel(model);
	};

	validateModel = (model: PostalAddress): void => {
		this.props.schema
			.validate(model)
			.then(validModel => {
				this.setState({ isValid: true });
				if (this.props.storeValidAddressOnChange) {
					this.props.actions.storeSelectedShippingAddress(validModel);
				}
			})
			.catch(error => {
				this.setState({ isValid: false });
				console.error(error);
			});
	};

	handleSubmit(model: PostalAddress, forceUpdateAddress?: boolean): void {
		this.props.schema
			.validate(model)
			.then(valid => {
				this.props.schema.isValid(valid);
				this.props.actions.clearAddressValidationError();
				this.props.actions.storeSelectedShippingAddress(valid, Boolean(forceUpdateAddress));
				this.props.actions.validateAddress(valid);
			})
			.catch(error => {
				console.error("Schema validation failure: " + error);
				this.setState({ loading: false });
			});
	}

	// notice, proposal selection will not handle forceUpdateAddress (currently proposals are not used in eCare)
	proposalSelected(model: PostalAddress, forceUpdateAddress: boolean): void {
		if (this.props.isLoggedIn && this.props.storedCustomer) {
			const currentDeliveryAddress =
				PostalAddressUtil.getAddressByRole(this.props.storedCustomer, ContactMediaTypeEnum.DELIVERY) || {};
			const { id } = currentDeliveryAddress;

			model.stateOrProvince = model.stateOrProvince || "";
			model.coAddress = model.coAddress || "";
			model.role = ContactMediaTypeEnum.DELIVERY;
			model.id = id || undefined;
		}

		this.setState({ model });
		this.props.actions.clearAddressValidationError();
		this.props.actions.storeSelectedShippingAddress(model);
	}

	componentDidMount() {
		const model = this.props.storedDeliveryAddress;
		this.validateModel(model);
	}

	componentWillMount() {
		const model = this.props.storedDeliveryAddress;
		this.props.schema.isValid(model || {});
	}

	hasChanged = (model: any) => {
		return isEqual(this.props.storedDeliveryAddress, model);
	};

	render() {
		const { model, loading } = this.state;
		const containerClasses = classnames({
			"ChangeDeliveryAddress-container": true,
			"ChangeSim-delivery-info": this.props.mode === CHANGE_SIM_MODE
		});

		return (
			<div className={containerClasses}>
				<AddressValidationHandlerContainer
					addressValidationError={this.props.addressValidationError}
					model={model}
					handlerType="dropdown"
					displayConfirmation={Boolean(this.props.displayConfirmation)}
					skipProposals={Boolean(this.props.skipProposals)}
					containerRef={this.props.mode === CHANGE_SIM_MODE ? this.containerRef : null}
					className={this.props.mode === CHANGE_SIM_MODE ? "inner-block-message" : ""}
					actions={{
						proposalSelected: (model: PostalAddress, forceUpdateAddress: boolean) =>
							this.proposalSelected(model, forceUpdateAddress),
						cancel: !this.props.displayConfirmation ? this.props.actions.clearAddressValidationError : () => {},
						parentSubmit: (model: PostalAddress, forceUpdateAddress: boolean) =>
							this.handleSubmit(model, forceUpdateAddress),
					}}
				/>
				<PersonDetailsPostalAddressForm
					countries={this.props.countries}
					handleInputChange={this.handleInputChange}
					handleSubmit={() => this.handleSubmit(model)}
					model={model}
					schema={this.props.schema}
					enableSaveButton={this.state.isValid && !this.state.loading && !this.state.isAddressValidationError}
					loading={loading}
					groupFields={this.props.groupPostalAddressFormFields}
					showSaveButton={true}
				/>
				<div className="inner-block-handler-container" ref={this.containerRef} />
			</div>
		);
	}
}

export default withSchema("deliveryAddress")(ChangeDeliveryAddress);

export {
	ChangeDeliveryAddressOwnProps,
	ChangeDeliveryAddressStateProps,
	ChangeDeliveryAddressActionProps,
	ChangeDeliveryAddressProps,
	ChangeDeliveryAddressState
};
