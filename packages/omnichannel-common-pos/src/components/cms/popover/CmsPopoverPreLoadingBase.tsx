import * as React from "react";
import CmsContentSpot from "../CmsContentSpot";

interface CmsPopoverPreLoadingOwnProps {
	id?: string;
	className?: string;
	fragmentId: string;
	publishTarget: string;
	children?: React.ReactNode;
	scheduleUpdate?: () => void; // this props comes from OverlayTrigger
}

interface CmsPopoverPreLoadingStateProps {
	hasContent: boolean;
	isMobile?: boolean;
}

interface CmsPopoverPreLoadingActionProps {
	actions: {
		getCurrentContent: () => void;
	};
}

interface CmsPopoverPreLoadingState {
	isLoading: boolean;
}

type CmsPopoverPreLoadingProps =
	CmsPopoverPreLoadingOwnProps
	& CmsPopoverPreLoadingStateProps
	& CmsPopoverPreLoadingActionProps;

abstract class CmsPopoverPreLoadingBase<
	P extends CmsPopoverPreLoadingProps = CmsPopoverPreLoadingProps,
	S extends CmsPopoverPreLoadingState = CmsPopoverPreLoadingState>
	extends React.Component<CmsPopoverPreLoadingProps, CmsPopoverPreLoadingState> {

	static getDerivedStateFromProps(nextProps: CmsPopoverPreLoadingProps, prevState: CmsPopoverPreLoadingState): CmsPopoverPreLoadingState {
		if (prevState.isLoading && nextProps.hasContent) {
			return {isLoading: false};
		}
		return prevState;
	}

	constructor(props: CmsPopoverPreLoadingProps, context?: any) {
		super(props, context);
		this.state = {isLoading: false};
	}

	componentDidMount(): void {
		if (!this.props.hasContent) {
			this.loadContent();
		}
	}

	getContent = (): React.ReactNode => {
		return this.props.children ||
			<CmsContentSpot fragmentId={this.props.fragmentId}
							publishTarget={this.props.publishTarget}/>;
	};

	loadContent = (): void => {
		if (!this.state.isLoading) {
			this.setState({isLoading: true}, () => {
				this.props.actions.getCurrentContent();
			});
		}
	};
}

export default CmsPopoverPreLoadingBase;

export {
	CmsPopoverPreLoadingBase,
	CmsPopoverPreLoadingActionProps,
	CmsPopoverPreLoadingOwnProps,
	CmsPopoverPreLoadingStateProps,
	CmsPopoverPreLoadingProps,
	CmsPopoverPreLoadingState,
};
