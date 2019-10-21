import * as R from "react";
import cssns from "../../utils/cssnsConfig";
import { FormattedMessage as ReactIntlFormattedMessage } from "react-intl";
import FormattedMessage from "../../channelUtils/FormattedMessage";
import OcModal from "../ocComponents/OcModal";
import CheckableAddonMessages from "./CheckableAddon.messages";
import OcInput from "../ocComponents/OcInput";
import { CommonCustomizationPoints, withCustomization } from "../../customization";
import { CommonMessages } from "../../commonMessages";
import { OcButton, OcButtonType } from "../ocComponents/button/OcButton";

const React = cssns("CheckableAddon").React as typeof R;

interface CheckableAddonProps {
	id: string;
	title: string;
	shortDescription: string;
	longDescription: string;
	price: string | JSX.Element;
	period?: string | null;
	checked: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	tooltip?: React.ReactNode;
	upfrontPrice?: string;
	recurringPrice?: string;
}

interface CheckableAddonState {
	descriptionModalVisible: boolean;
}

interface CheckableAddonModalComponentProps {
	descriptionModalVisible: boolean;
	onClose: () => void;
	title: string;
	longDescription: string;
}

const CheckableAddonModalComponent: React.FC<CheckableAddonModalComponentProps> = (props) =>
	<OcModal
		showModal={props.descriptionModalVisible}
		bsSize="lg"
		title={props.title}
		onClose={props.onClose}
	>
		<article className="oc-external-html" dangerouslySetInnerHTML={{ __html: props.longDescription }} />
	</OcModal>;

class CheckableAddonBaseline extends (React as typeof R).PureComponent<CheckableAddonProps, CheckableAddonState> {

	constructor(props: CheckableAddonProps) {
		super(props);

		this.state = { descriptionModalVisible: false };
	}

	toggleDescriptionModal = () => {
		this.setState({
			descriptionModalVisible: !this.state.descriptionModalVisible
		});
	};

	render() {
		const { id, title, shortDescription, longDescription, checked, price, period, onChange, tooltip, upfrontPrice, recurringPrice } = this.props;
		const translatedPeriod = period && (CommonMessages as any)[`priceInterval_${period}_shorthand`] || null;
		return (
			<div className="card CheckableAddon">
				<div className="card-body">
					<OcInput
						id={`CheckableAddon-${id}`}
						type="checkbox"
						name={name}
						checked={checked}
						onChange={onChange}
					/>

					<div className="title-block">
						<h4 className="card-title title">{title}</h4>
						{tooltip && <div className="tooltip-icon">{tooltip}</div>}
					</div>

					{price &&
						<div className="price-section text-right">
							<span className="price">
								{price}
							</span>
							{translatedPeriod &&
								<span className="period" data-test-name="period">
									<FormattedMessage {...translatedPeriod} />
								</span>
							}
						</div>
					}

					{upfrontPrice &&
						<div className="price-section text-right">
							<span className="price">
								{upfrontPrice}
							</span>
						</div>
					}

					{recurringPrice && !upfrontPrice &&
						<div className="price-section text-right">
							<span className="price">
								{recurringPrice}
							</span>
							{translatedPeriod &&
								<span className="period" data-test-name="period">
									<FormattedMessage {...translatedPeriod} />
								</span>
							}
						</div>
					}

					{!recurringPrice && !upfrontPrice && !price &&
						<div className="price-section text-right">
							<span className="price">
								<FormattedMessage {...CheckableAddonMessages.priceFree} />
							</span>
						</div>
					}

					<div className="short-description">
						{shortDescription}
					</div>

					{recurringPrice && upfrontPrice &&
						<div className="extra-price-section text-right">
							<span className="extra-price">{recurringPrice}</span>
							{translatedPeriod &&
								<span className="period" data-test-name="period">
									<FormattedMessage {...translatedPeriod} />
								</span>
							}
						</div>
					}

					{longDescription &&
						<div className="long-description-button">
							<OcButton buttonType={OcButtonType.LINK} onClick={this.toggleDescriptionModal}>
								<FormattedMessage {...CheckableAddonMessages.viewMore} />
							</OcButton>
							<CheckableAddonModalComponent
								descriptionModalVisible={this.state.descriptionModalVisible}
								onClose={this.toggleDescriptionModal}
								title={title}
								longDescription={longDescription} />
						</div>
					}
				</div>
			</div>
		);
	}
}

const CheckableAddon: React.ComponentClass<any> = withCustomization<any>(
	CommonCustomizationPoints.CHECKABLE_ADDON_COMPONENT,
	CheckableAddonBaseline
) as React.ComponentClass<any>;

export default CheckableAddon;
export { CheckableAddonProps, CheckableAddonState };
