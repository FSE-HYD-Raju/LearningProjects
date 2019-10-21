import cssns from "../../../utils/cssnsConfig";
import activateSimMessages from "../activateSim.messages";
import FormattedMessage from "../../../channelUtils/FormattedMessage";
const { React } = cssns("SimExampleView");

export interface SimExampleViewProps {}

const SimExampleView: React.FC<SimExampleViewProps> = (props: SimExampleViewProps) => {
	return (
		<div className="container">
			<div className="logo">
				<FormattedMessage {...activateSimMessages.logo}/>
			</div>
			<div className="right">
				<div className="right-inner">
					<div className="code">
						<span className="bold first" />
						<span className="bold second" />
						<span className="bolder" />
						<span className="bold third" />
					</div>
					<div className="wrapper">
						<div className="sim-main" />
					</div>
				</div>
				<div className="number">
					<span>
						<FormattedMessage {...activateSimMessages.activateSimExampleNumber} />
					</span>
					<span className="highlighted">
						<FormattedMessage {...activateSimMessages.iccidDigitsPlaceholder} />
					</span>
				</div>
			</div>
		</div>
	);
};

export default SimExampleView;
