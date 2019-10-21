import { isEmpty } from "lodash";
import { FC } from "react";
import cssns from "../../utils/cssnsConfig";
import { FormattedMessage } from "../../channelUtils";
import { VersionInformationMockMode, VersionInformationState } from "../../redux";
import messages from "./VersionInformation.messages";
import { OcButton, OcButtonGroup, OcButtonSize, OcButtonType } from "../..";
const { React } = cssns("VersionInformation");

interface VersionInformationProps {
	version: string;
	branch: string;
	commit: string;
	show: boolean;
	artifacts: VersionInformationState["artifacts"];
	mockdataDisplayMode: VersionInformationMockMode;
	displayVersionInformation: boolean;
}

interface VersionInformationActionProps {
	actions: {
		toggleMode(): void;
		setMockdataDisplayMode(mock: VersionInformationMockMode): void;
		fetchArtifactInfo(): void;
	};
}

const MockModeActions = ({currentMode, setMode}: {currentMode: VersionInformationMockMode; setMode(mode: VersionInformationMockMode): void}) => {

	const isActiveType = (mode: VersionInformationMockMode): OcButtonType => currentMode === mode ? OcButtonType.PRIMARY : OcButtonType.DEFAULT;

	const modes = [{
		icon: "fa-eye",
		mode: VersionInformationMockMode.VISIBLE,
	}, {
		icon: "fa-eye-slash",
		mode: VersionInformationMockMode.HIDDEN,
	}, {
		icon: "fa-fire",
		mode: VersionInformationMockMode.HIGHLIGHT,
	}];

	return (
		<OcButtonGroup className="mock-group">
			{modes.map((item) => {
				return (
					<OcButton
						key={item.mode}
						buttonSize={OcButtonSize.SMALL}
						icon={item.icon}
						buttonType={isActiveType(item.mode)}
						onClick={() => setMode(item.mode)}
					/>
				);
			})}
		</OcButtonGroup>
	);
};

const ArtifactsInfo = (props: Pick<VersionInformationProps, "artifacts">) => {
	return (
		<div className="artifacts-info">
			<div className="artifact-row header">
				<div className="artifact-cell">
					<FormattedMessage {...messages.name} />
				</div>
				<div className="artifact-cell">
					<FormattedMessage {...messages.version} />
				</div>
				<div className="artifact-cell">
					<FormattedMessage {...messages.commit} />
				</div>
			</div>
			{props.artifacts.map((item, i) => {
				return (
					<div className="artifact-row" key={item.name + `_${i}`}>
						<div className="artifact-cell">{item.name}</div>
						<div className="artifact-cell">{item.version || "n/a"}</div>
						<div className="artifact-cell">{item.commit || "n/a"}</div>
					</div>
				);
			})}
		</div>
	);
};

const PureArtifactsInfo = (props: Pick<VersionInformationProps, "version" | "branch" | "commit">) => {
	return (
		<div>
			<div className="artifact-item list-group-item">
				<FormattedMessage {...messages.version} />
				<span className="badge">{props.version}</span>
			</div>
			<div className="artifact-item list-group-item">
				<FormattedMessage {...messages.branch} />
				<span className="badge">{props.branch}</span>
			</div>
			<div className="artifact-item list-group-item">
				<FormattedMessage {...messages.commit} />
				<span className="badge">{props.commit}</span>
			</div>
		</div>
	);
};

const VersionInformation: FC<VersionInformationProps & VersionInformationActionProps> = (props) => {
	if (!props.displayVersionInformation) {
		return null;
	}

	if (!props.show) {
		return (
			<div className="VersionInformation" onClick={props.actions.toggleMode}>
				<span className="label label-default">
					<FormattedMessage {...messages.buildInfo} />
				</span>
			</div>
		);
	}

	const setMode = (mode: VersionInformationMockMode) => props.actions.setMockdataDisplayMode(mode);

	return (
		<div className="VersionInformation open">
			<div className="list-group">
				<div className="artifact-item list-group-item">
					<div className="build-info-container">
						<b>
							<FormattedMessage {...messages.buildInformation} />
						</b>
						<OcButton
							buttonType={OcButtonType.LINK}
							icon="fa-times"
							buttonSize={OcButtonSize.SMALL}
							onClick={props.actions.toggleMode}
						/>
					</div>
				</div>
				{
					isEmpty(props.artifacts) ?
						<PureArtifactsInfo version={props.version} commit={props.commit} branch={props.branch} /> :
						<ArtifactsInfo artifacts={props.artifacts} />
				}
				<div className="artifact-item list-group-item">
					<div className="mock-container">
						<FormattedMessage {...messages.mocks} />
						<MockModeActions currentMode={props.mockdataDisplayMode} setMode={setMode}/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VersionInformation;
export {
	VersionInformationProps,
	VersionInformationActionProps,
};
