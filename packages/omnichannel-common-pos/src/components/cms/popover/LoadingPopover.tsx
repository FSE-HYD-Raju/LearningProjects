import * as React from "react";
import { Popover } from "react-bootstrap";

interface LoadingPopoverProps extends Partial<Popover.PopoverProps> {
	isContentReady: boolean;
	className: string;
	scheduleUpdate?: any; // property injected by OverlayTrigger and should be used to update after resize of content
}

class LoadingPopover extends React.Component<LoadingPopoverProps> {

	componentDidUpdate(prevProps: LoadingPopoverProps): void {
		if (!prevProps.isContentReady && prevProps.isContentReady) {
			if (this.props.scheduleUpdate) {
				this.props.scheduleUpdate();
			}
		}
	}

	render(): React.ReactNode {
		return <Popover {...this.props}/>;
	}
}

export {
	LoadingPopover,
	LoadingPopoverProps,
};
