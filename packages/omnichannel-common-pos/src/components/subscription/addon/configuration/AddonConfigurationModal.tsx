import OcModal from "../../../ocComponents/OcModal";
import { get } from "lodash";
import FormattedMessage from "../../../../channelUtils/FormattedMessage";
import messages from "../../../product/Product.messages";
import addonMessages from "../Addon.messages";
import cssns from "../../../../utils/cssnsConfig";
import { PureComponent, SyntheticEvent } from "react";
import {
	ProductOffering,
	SalesActionSubmitProductConfiguration ,
	ProductConfigurationSummary,
	Configurations,
} from "../../../../redux";
import ProductUtil from "../../../../utils/product/ProductUtil";
import ProductOfferingUtil from "../../../../utils/ProductOfferingUtil";
import { AddonUtils } from "../Addon.utils";
import ProductOfferingConfigurationContainer from "../../../product/ProductOfferingConfigurationContainer";
import { ContextType, contextTypesValidationMap } from "../../../../types";
import {  withProductConfigurations } from "../../../product/withProductConfigurations";
import { OcButton, OcButtonType } from "../../../ocComponents/button/OcButton";

const { React } = cssns("AddonConfigurationModal");

interface AddonConfigurationModalOwnProps {
	product?: ProductOffering;
	productId?: string;
}

interface AddonConfigurationModalStateProps {
	individualId?: string;
	productConfigurationErrors?: any;
	productConfigurationSummary?: ProductConfigurationSummary;
	configurations: Configurations;
}

interface AddonConfigurationModalActionProps {
	actions: {
		submitProductConfiguration: SalesActionSubmitProductConfiguration;
		terminateProductConfiguration: () => void;
	};
}

type AddonConfigurationModalProps = AddonConfigurationModalStateProps & AddonConfigurationModalActionProps & AddonConfigurationModalOwnProps;

class AddonConfigurationModal extends PureComponent<AddonConfigurationModalProps> {
	static contextTypes = contextTypesValidationMap;

	constructor(props: AddonConfigurationModalProps, context: ContextType) {
		super(props, context);
	}

	handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();

		const { productId, individualId, product } = this.props;
		const inputtedCharacteristics: Record<string, string> = { ...ProductOfferingUtil.getInputtedCharacteristics(product!)};

		this.props.actions.submitProductConfiguration({
			individualId,
			productId: productId!,
			inputtedCharacteristics: inputtedCharacteristics,
			enhancedCharacteristics: {},
		});
	};

	render() {
		const { productId, individualId, product } = this.props;

		if (!productId || !individualId || !product) {
			return null;
		}

		const {productConfigurationSummary, productConfigurationErrors} = this.props;

		const productName = ProductUtil.getProductName(product);
		const isService = get(product, "attributes.specType", "").toLowerCase() === "service";

		if (productConfigurationErrors) {
			return (
				<OcModal
					showModal={true}
					smallModal={true}
					onClose={this.props.actions.terminateProductConfiguration}
					title={
						isService
							? <FormattedMessage {...messages.serviceConfigFailureModalTitle}/>
							: <FormattedMessage {...messages.addonConfigFailureModalTitle}/>
					}
				>
					<div className="failure-message-container">
						{isService
							? <FormattedMessage{...messages.serviceConfigFailureMessage} values={{productName}}/>
							: <FormattedMessage {...messages.addonConfigFailureMessage} values={{productName}}/>
						}
					</div>
				</OcModal>
			);
		}

		if (productConfigurationSummary) {
			return (
				<OcModal
					showModal={true}
					smallModal={true}
					onClose={this.props.actions.terminateProductConfiguration}
					title={
						isService
							? <FormattedMessage {...messages.serviceConfiguration}/>
							: <FormattedMessage {...messages.addonConfiguration} />
					}
				>
					<div className="failure-message-container">
						{isService
							? <FormattedMessage{...messages.serviceConfigured} values={{productName}}/>
							: <FormattedMessage{...messages.addonConfigured} values={{productName}}/>
						}
					</div>
				</OcModal>
			);
		}

		const configurationRequired = AddonUtils.isConfigurationRequired(product);

		return (
			<OcModal
				showModal={true}
				onClose={this.props.actions.terminateProductConfiguration}
				noFooter={true}
				smallModal={true}
				title={
					isService
						? <FormattedMessage {...messages.pleaseConfigureService}/>
						: <FormattedMessage {...messages.pleaseConfigureAddon}/>
				}
			>
				{configurationRequired && (
					<form
						className="full-width"
						onSubmit={this.handleSubmit}
					>
						<div className="message-container">
							<div>
								{isService
									? <FormattedMessage {...messages.serviceName}/>
									: <FormattedMessage {...messages.addonName}/>
								}
							</div>
							<div className="product-name-label">
								{productName}
							</div>
						</div>
						<div className="poc-container">
							<ProductOfferingConfigurationContainer
								toggleMsisdnModal={() => {}}
								msisdnConfig={{}}
								msisdnModalVisible={false}
								userOpened={false}
								flux={this.context.flux}
								product={product}
							/>
						</div>

						<div className="container">
							<OcButton
								id="buttonCancelAddonConfiguration"
								buttonType={OcButtonType.DEFAULT}
								onClick={this.props.actions.terminateProductConfiguration}
							>
								<FormattedMessage {...messages.addonCancel}/>
							</OcButton>
							<OcButton
								id="buttonApplyAddonConfiguration"
								htmlBtnType="submit"
								buttonType={OcButtonType.PRIMARY}
							>
								<FormattedMessage {...messages.save}/>
							</OcButton>
						</div>
					</form>
				)}
				{!configurationRequired && <h4><FormattedMessage {...addonMessages.noConfigurationRequired}/></h4>}
			</OcModal>
		);
	}
}

export default withProductConfigurations<AddonConfigurationModalProps>(AddonConfigurationModal);
export {
	AddonConfigurationModalActionProps,
	AddonConfigurationModalStateProps,
	AddonConfigurationModalOwnProps,
	AddonConfigurationModalProps,
};
