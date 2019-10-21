import cssns from "../../../utils/cssnsConfig";
import { Component, ReactNode, ValidationMap } from "react";
import { LifecycleChangeAction, Product, ProductOffering } from "../../../redux/types";
import { AddonsAccordion } from "./accordion/AddonsAccordion";
import AddonActivationModalContainer from "./activation/AddonActivationModalContainer";
import ManageAddonModalContainer from "./deactivation/ManageAddonModalContainer";
import { ContextType, contextTypesValidationMap } from "../../../types";
import ProductUtil from "../../../utils/product/ProductUtil";
import { AddonsTabLifecycleFilter } from "../AddonsTabLifecycleFilter";
import { AddonsSection } from "../AddonsSection";
import addonMessages from "./Addon.messages";
import { FormattedMessage, FormattedMessageDescriptor } from "../../../channelUtils";
import AddonStateChangeModalContainer from "./AddonStateChangeModalContainer";
import { CommonCustomizationPoints, withCustomization } from "../../../customization";
import messages from "../../../commonMessages";
import { OcButton, OcButtonSize, OcButtonType } from "../../ocComponents";

const { React } = cssns("AddonRows");

interface AddonsViewContentActionProps {
	actions: {
		getAvailableAddonProducts: () => void;
		getAlternateOfferingsForProduct: (productOfferingId: string) => void;
		initializeStateTransition: (addon: Product, transition: LifecycleChangeAction) => void;
	};
}

interface AddonsViewContentStateProps {
	activeAddons: Array<Product>;
	availableAddons: Array<ProductOffering>;
	addonPaginationCount: number;
	addonEnableError?: string;
	addonSuccessfullyUpdated?: boolean;
	showAddonModificationModal?: boolean;
	stateTransitionByActionName?: Record<string, Array<string> | string>;
}

interface AddonsViewContentOwnProps {
	agreementId: string;
	product: Product;
	lifecycleFilter: string;
	showActions: boolean;
	activeHeader?: FormattedMessageDescriptor;
	inactiveHeader?: FormattedMessageDescriptor;
	addonPaginationCount?: number;
	stateTransitionByActionName?: Record<string, Array<string> | string>;
}

type AddonsViewContentProps = AddonsViewContentStateProps & AddonsViewContentOwnProps & AddonsViewContentActionProps;

interface AddonsViewContentState {
	invisibleAddonsCount: number;
	addons: Array<Product | ProductOffering>;
	showActivationModal: boolean;
	showDeactivationModal: boolean;
	selectedAddon?: ProductOffering | Product;
}

class AddonsViewContent extends Component<AddonsViewContentProps, AddonsViewContentState> {
	static contextTypes: ValidationMap<ContextType> = contextTypesValidationMap;

	static getAddonsToDisplay(props: AddonsViewContentProps): Array<Product | ProductOffering> {
		const { lifecycleFilter } = props;
		const matchFilter = (filter: AddonsTabLifecycleFilter) => {
			try {
				return lifecycleFilter === filter ||
					(AddonsTabLifecycleFilter[lifecycleFilter as keyof typeof AddonsTabLifecycleFilter] === filter);
			} catch (e) {
				return false;
			}
		};

		if (matchFilter(AddonsTabLifecycleFilter.ACTIVE)) {
			return props.activeAddons;
		}

		if (matchFilter(AddonsTabLifecycleFilter.AVAILABLE)) {
			return props.availableAddons;
		}

		return [...props.availableAddons, ...props.activeAddons];
	}

	static getDerivedStateFromProps(nextProps: AddonsViewContentProps, state: AddonsViewContentState): Partial<AddonsViewContentState> {
		const addonsToDisplay =  AddonsViewContent.getAddonsToDisplay(nextProps);
		const newState: Partial<AddonsViewContentState> = {
			addons: addonsToDisplay,
		};

		// close addon of activation completed successfully
		if (nextProps.addonSuccessfullyUpdated && state.showActivationModal) {
			newState.showActivationModal = false;
			newState.selectedAddon = undefined;
		}

		return newState;
	}

	constructor(props: AddonsViewContentProps, context: ContextType) {
		super(props, context);
		this.state = {
			invisibleAddonsCount: 0,
			addons: [],
			showActivationModal: false,
			showDeactivationModal: false
		};
	}

	componentDidMount() {
		// load available addons
		this.props.actions.getAvailableAddonProducts();

		if (this.state.addons) {
			const invisibleAddonsNumber = Math.max(0, this.state.addons.length - this.props.addonPaginationCount);
			this.setState({invisibleAddonsCount: invisibleAddonsNumber});
		}
	}

	getVisibleAddons(): Array<Product | ProductOffering> {
		if (this.state.invisibleAddonsCount > 0) {
			return this.state.addons.slice(0,  this.state.addons.length - this.state.invisibleAddonsCount);
		}
		return this.state.addons ? this.state.addons : [];
	}

	handleShowMoreClick = () => {
		const invisibleAddonsCount = Math.max(0, this.state.invisibleAddonsCount - this.props.addonPaginationCount);
		this.setState({invisibleAddonsCount: invisibleAddonsCount});
	};

	handleChangeAddonClick = () => {
		if (this.props.actions.getAlternateOfferingsForProduct) {
			this.props.actions.getAlternateOfferingsForProduct(this.props.product.productOfferingId);
		}
	};

	selectAddonForActivation = (product: ProductOffering) => {
		this.setState({selectedAddon: product, showActivationModal: true});
	};

	selectAddonForDeactivation = (product: ProductOffering) => {
		this.setState({selectedAddon: product, showDeactivationModal: true});
	};

	isActiveAddon = (item: ProductOffering | Product): boolean => {
		return this.props.activeAddons.includes(item as Product);
	};

	handleActivationModalClose = (callback?: () => void) => {
		this.setState({showActivationModal: false}, () => {
			if (callback) {
				callback();
			}
		});
	};

	handleDeactivationModalClose = (callback?: () => void) => {
		this.setState({showDeactivationModal: false}, () => {
			if (callback) {
				callback();
			}
		});
	};

	public renderAddonsList(props: AddonsViewContentProps, state: AddonsViewContentState): ReactNode {
		const showMoreText = state.invisibleAddonsCount > props.addonPaginationCount
			? messages.subscriptionAvailableAddonsShowMore
			: messages.subscriptionAvailableAddonsShowAll;

		return (
			<>
				<AddonsSection
					id="product-addons"
					activeHeader={props.activeHeader || addonMessages.addonsTitle}
					inactiveHeader={props.inactiveHeader || addonMessages.noAddonsTitle}
					hasData={this.getVisibleAddons().length > 0}
				>
					<AddonsAccordion
						isActive={this.isActiveAddon}
						lifecycleStatus={props.lifecycleFilter}
						addons={this.getVisibleAddons()}
						showActions={props.showActions}
						selectAddonForActivation={this.selectAddonForActivation}
						onChangeAddon={this.handleChangeAddonClick}
						stateTransitionByActionName={props.stateTransitionByActionName}
						initializeStateTransition={props.actions.initializeStateTransition}
					/>
				</AddonsSection>
				<div className="show-more-button">
					{(state.invisibleAddonsCount > 0) && (
						<OcButton
							id="linkShowMoreAvailableAddons"
							buttonType={OcButtonType.LINK}
							buttonSize={OcButtonSize.SMALL}
							onClick={this.handleShowMoreClick}
						>
							<FormattedMessage {...showMoreText} values={{addonPaginationCount: props.addonPaginationCount}}/>
						</OcButton>
					)}
				</div>
			</>
		);
	}

	render() {
		return (
			<>
				{this.props.showAddonModificationModal && (
					<AddonStateChangeModalContainer
						phoneNumber={ProductUtil.getPhoneNumber(this.props.product)}
						requirePaymentMethodSelection={false}
						requireReasonSelect={true}
					/>
				)}
				{this.state.showActivationModal && this.state.selectedAddon && (
					<AddonActivationModalContainer
						product={this.props.product}
						flux={this.context.flux}
						addon={this.state.selectedAddon as ProductOffering}
						showModal={true}
						msisdn={ProductUtil.getPhoneNumber(this.props.product)}
						onModalClose={this.handleActivationModalClose}
						targetAgreementId={this.props.agreementId}
					/>
				)}
				{this.state.showDeactivationModal && this.state.selectedAddon && (
					<ManageAddonModalContainer
						showModal={true}
						addon={this.state.selectedAddon as Product}
						msisdn={ProductUtil.getPhoneNumber(this.props.product)}
						targetAgreementId={this.props.agreementId}
						closeModal={this.handleDeactivationModalClose}
					/>
				)}
				{this.renderAddonsList(this.props, this.state)}
			</>
		);
	}
}

const AddonsViewContentWithCustomization = withCustomization<AddonsViewContentProps>
	(CommonCustomizationPoints.ADDONS_LIST_CONTENT, AddonsViewContent);

export {
	AddonsViewContentWithCustomization as AddonsViewContent,
	AddonsViewContent as AddonsViewContentBaseline,
	AddonsViewContentState,
	AddonsViewContentProps,
	AddonsViewContentStateProps,
	AddonsViewContentOwnProps,
	AddonsViewContentActionProps
};
