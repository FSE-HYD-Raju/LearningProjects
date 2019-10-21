import * as R from "react";
import messages from "./OcComponents.messages";
import cssns from "../../utils/cssnsConfig";
import { File } from "../../redux/types";
import FormattedMessage from "../../channelUtils/FormattedMessage";
const React = cssns("OcDownloadButton").React as typeof R;

interface OcDownloadButtonProps {
	file?: File | null;
}

const OcDownloadButton: React.FC<OcDownloadButtonProps> = props => {
	if (!props.file) {
		return null;
	}
	const { filename, filetype, url } = props.file;
	return (
		<FormattedMessage
			{...messages.downloadButtonLabel}
			values={{ filetype }}
		>
			{message => (
				<a
					href={url}
					download={filename}
					className="btn btn-outline-secondary this"
				>
					{message}
				</a>
			)}
		</FormattedMessage>
	);
};

export default OcDownloadButton;
export { OcDownloadButtonProps };
