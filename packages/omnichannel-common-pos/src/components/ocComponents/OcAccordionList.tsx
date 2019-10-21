import * as R from "react";
import OcTransition from "./OcTransition";
import cssns from "../../utils/cssnsConfig";
const React = cssns("OcAccordionList").React as typeof R;

interface OcAccordionListProps {
	id: string;
	active: boolean;
	rowContent: React.ReactNode;
	expandedContent?: React.ReactNode;
	handleClick?: <T>(id: string, event: React.SyntheticEvent<T>) => void;
	style?: React.CSSProperties;
	className?: string;
}

const OcAccordionList: React.FC<OcAccordionListProps> = props => (
	<div style={props.style} className={props.className}>
		<div
			className="row-content-wrapper"
			onClick={(event) => props.handleClick!(props.id, event)}
			id={`OcAccordionList-${props.id}`}
		>
			<div className="row-content">
				{props.rowContent}
			</div>
		</div>

		<OcTransition expanded={props.active}>
			<div className="expanded-content">{props.expandedContent}</div>
		</OcTransition>
	</div>
);

OcAccordionList.defaultProps = {
	handleClick: (event) => {}
};

export default OcAccordionList;
export { OcAccordionListProps };
