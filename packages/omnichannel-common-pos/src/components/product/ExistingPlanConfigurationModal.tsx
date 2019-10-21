import OcModal from "../ocComponents/OcModal";
import { get } from "lodash";
import { ComponentType, FC } from "react";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import {
	ProductOffering,
	SalesActionSubmitProductConfiguration
} from "../../redux/types";
import cssns from "../../utils/cssnsConfig";
import messages from "./Product.messages";
import { ProductConfigurationSummary } from "../../redux";
import ProductOfferingConfigurationContainer, {
	ProductOfferingConfigurationContainerOwnProps,
	VeryOwnProps
} from "./ProductOfferingConfigurationContainer";
import { withMsisdnConfiguration } from "./msisdn/withMsisdnConfiguration";
import { ContextType, contextTypesValidationMap } from "../../types";
import { OcButton, OcButtonType } from "../ocComponents/button/OcButton";

const { React } = cssns("ExistingPlanConfigurationModal");

interface ExistingPlanConfigurationModalStateProps {
	showModal?: boolean;
	individualId?: string;
	plan?: ProductOffering;
	parentProductId: string;
	productConfigurationSummary?: ProductConfigurationSummary;
	productConfigurationErrors?: any;
}

interface ExistingPlanConfigurationModalActionProps {
	actions: {
		submitProductConfiguration: SalesActionSubmitProductConfiguration,
		terminateProductConfiguration: () => void,
	};
}

type ExistingPlanConfigurationModalProps = ExistingPlanConfigurationModalStateProps & ExistingPlanConfigurationModalActionProps;
const ProductOfferingConfigurationWithMsisdn: ComponentType<VeryOwnProps> =
	withMsisdnConfiguration<ProductOfferingConfigurationContainerOwnProps>(ProductOfferingConfigurationContainer);

const ExistingPlanConfigurationModal: FC<ExistingPlanConfigurationModalProps> = (props: ExistingPlanConfigurationModalProps, context: ContextType) => {
	if (!props.parentProductId || !props.plan || !props.individualId) {
		return <span />;
	}

	const {
		individualId,
		parentProductId,
		productConfigurationSummary,
		productConfigurationErrors
	} = props;

	const productName = get(props.plan, "attributes.name", "");

	if (productConfigurationErrors) {
		return (
			<OcModal
				showModal={true}
				smallModal={true}
				onClose={props.actions.terminateProductConfiguration}
				title={
					<FormattedMessage
						{...messages.planConfigurationFailure}
						values={{productName}}
					/>
				}
			>
				<div className="name-container">
					<FormattedMessage
						{...messages.configuringFailed}
						values={{productName}}
					/>
				</div>
			</OcModal>
		);
	}

	return productConfigurationSummary ? (
		<OcModal
			showModal={true}
			smallModal={true}
			onClose={props.actions.terminateProductConfiguration}
			title={
				<FormattedMessage
					{...messages.planConfiguration}
					values={{productName}}
				/>
			}
		>
			<div className="name-container">
				<FormattedMessage
					{...messages.planConfigured}
					values={{productName}}
				/>
			</div>
		</OcModal>
	) : (
		<OcModal
			showModal={true}
			onClose={props.actions.terminateProductConfiguration}
			noFooter={true}
			smallModal={true}
			title={
				<FormattedMessage
					{...messages.pleaseConfigurePlan}
					values={{productName}}
				/>
			}
		>
			<form
				className="wide"
				onSubmit={(event: any) => {
					event.preventDefault();
					props.actions.submitProductConfiguration({
						individualId,
						productId: parentProductId,
						inputtedCharacteristics: {},
						enhancedCharacteristics: {}
					});
				}}
			>
				<div className="configuration-container">
					<ProductOfferingConfigurationWithMsisdn
						flux={context.flux}
						product={props.plan}
					/>
				</div>

				<div className="footer-container">
					<OcButton
						id="buttonCancelPlanConfiguration"
						buttonType={OcButtonType.DEFAULT}
						onClick={props.actions.terminateProductConfiguration}
					>
						<FormattedMessage {...messages.cancel}/>
					</OcButton>
					<OcButton
						id="buttonApplyPlanConfiguration"
						htmlBtnType="submit"
						buttonType={OcButtonType.PRIMARY}
					>
						<FormattedMessage {...messages.apply}/>
					</OcButton>
				</div>
			</form>
		</OcModal>
	);
};

ExistingPlanConfigurationModal.contextTypes = contextTypesValidationMap;

export default ExistingPlanConfigurationModal;
export {
	ExistingPlanConfigurationModalProps,
	ExistingPlanConfigurationModalStateProps,
	ExistingPlanConfigurationModalActionProps,
};
