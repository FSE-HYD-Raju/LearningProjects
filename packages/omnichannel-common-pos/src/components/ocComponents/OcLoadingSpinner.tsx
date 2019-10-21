import * as R from "react";
import cssns from "../../utils/cssnsConfig";
import * as classnames from "classnames";
const React = cssns("OcLoadingSpinner").React as typeof R;

interface OcLoadingSpinnerProps {
	loading: boolean;
	children?: React.ReactNode;
	inline?: boolean;
}
const OcLoadingSpinner: React.FC<OcLoadingSpinnerProps> = props => {
	if (props.loading) {
		return (
			<div
				className={
					classnames({
						flex: !props.inline,
						inline: props.inline
					})
				}
			>
				<i className="fa fa-spinner fa-spin icon" />
				<span className="text">{props.children}</span>
			</div>
		);
	} else {
		return <span>{props.children}</span>;
	}
};
export default OcLoadingSpinner;
export { OcLoadingSpinnerProps };
