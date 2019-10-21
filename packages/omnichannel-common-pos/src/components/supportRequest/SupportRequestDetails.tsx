import cssns from "../../utils/cssnsConfig";

const { React } = cssns("SupportRequestDetails");

export interface SupportRequestDetailsProps {
	resolution: string;
	description: string;
}

const SupportRequestDetails: React.FC<SupportRequestDetailsProps> = (props: SupportRequestDetailsProps) => {
	return (
		<div className="resolution-container">
			<div className="resolution-text">
				<span>{props.resolution}</span>
			</div>
			<div>
				<span>{props.description}</span>
			</div>
		</div>
	);
};

export default SupportRequestDetails;
