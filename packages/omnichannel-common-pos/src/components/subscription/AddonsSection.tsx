import * as React from "react";
import { FluidContainer } from "../../components/fluid/FluidContainer";
import { FormattedMessageDescriptor, FormattedMessage } from "../../channelUtils";

interface AddonsSectionProps {
	id: string;
	activeHeader: FormattedMessageDescriptor;
	inactiveHeader: FormattedMessageDescriptor;
	children: React.ReactNode;
	hasData: boolean;
}

interface AddonSectionState {
	expanded: boolean;
}

class AddonsSection extends React.Component<AddonsSectionProps, AddonSectionState> {

	constructor(props: AddonsSectionProps) {
		super(props);
		this.state = { expanded: true };
	}

	handleClick = (e: React.MouseEvent<HTMLHeadingElement>) => {
		e.preventDefault();

		if (this.props.hasData) {
			this.setState({expanded: !this.state.expanded});
		}
	};

	render() {
		const { id, activeHeader, inactiveHeader, hasData } = this.props;
		const { expanded } = this.state;

		return (
			<div className="AddonsTabView-section-header">
				<h3 id={id} onClick={this.handleClick} className={hasData ? "AddonsTabView-section-header-highlight" : ""}>
					{hasData && (
						<>
							{expanded ? (<i className="fa fa-caret-down" />) : (<i className="fa fa-caret-right" />)}
							<FormattedMessage {...activeHeader}/>
						</>
					)}
					{!hasData && <FormattedMessage {...inactiveHeader}/>}

				</h3>
				{hasData && (
					<FluidContainer height={expanded ? "auto" : 0}>
						{this.props.children}
					</FluidContainer>
				)}
			</div>
		);
	}
}

export {
	AddonsSection,
	AddonsSectionProps,
	AddonSectionState,
};
