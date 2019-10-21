import * as R from "react";
import cssns from "../../utils/cssnsConfig";
const React = cssns("OcDocumentReviewer").React as typeof R;

interface OcDocumentReviewerProps {
	document: { body?: string };
}

const OcDocumentReviewer: React.FC<OcDocumentReviewerProps> = props => {
	return (
		<div className="wrapper">
			{props.document &&
			props.document.body && (
				<div className="content">
					<div
						dangerouslySetInnerHTML={{
							__html: props.document.body
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default OcDocumentReviewer;
export { OcDocumentReviewerProps };
