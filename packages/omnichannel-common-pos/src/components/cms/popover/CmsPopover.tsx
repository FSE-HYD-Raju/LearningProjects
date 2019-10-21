import * as React from "react";
import { OverlayTrigger } from "react-bootstrap";
import OcLoadingSpinner from "../../ocComponents/OcLoadingSpinner";
import { CmsPopoverPreLoadingBase, CmsPopoverPreLoadingProps } from "./CmsPopoverPreLoadingBase";
import { LoadingPopover } from "./LoadingPopover";

interface CmsPopoverAdditionalOwnProps {
	icon?: React.ReactNode;
	rightPos?: boolean;
}
/**
 * Popover with CmsComponent
 * While no data available popover is not shown to prevent flicking
 *
 * In case custom content is required - use children prop
 * In case custom icon is required - use icon prop
 */

interface CmsPopoverOwnProps extends CmsPopoverPreLoadingProps, CmsPopoverAdditionalOwnProps {}

class CmsPopover extends CmsPopoverPreLoadingBase<CmsPopoverOwnProps> {

	props: CmsPopoverOwnProps;

	constructor(props: CmsPopoverOwnProps) {
		super(props);
		this.props = props;
	}

	getIcon = (): React.ReactNode => {
		return this.props.icon || <i className="fa fa-info-circle"/>;
	};

	render(): React.ReactNode {
		const { isMobile, rightPos, id, className, hasContent } = this.props;
		const placement = isMobile ? "top" : rightPos ? "right" : "left";
		return (
			<OverlayTrigger
				placement={placement}
				trigger={isMobile ? "click" : ["hover", "focus"]}
				overlay={
					<LoadingPopover
						id={id}
						className={`popover show bs-popover-${placement}`}
						isContentReady={hasContent}>
						{hasContent ? this.getContent() :
							<OcLoadingSpinner loading={this.state.isLoading}/>
						}
					</LoadingPopover>
				}
			>
				<div className={className}>{this.getIcon()}</div>
			</OverlayTrigger>
		);
	}
}

export {
	CmsPopover,
	CmsPopoverOwnProps,
	CmsPopoverAdditionalOwnProps,
};
