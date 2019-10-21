import cssns from "../../../../utils/cssnsConfig";
import { FormattedMessage } from "../../../../channelUtils";
import { FC } from "react";
import { isEmpty } from "lodash";
import addonMessages from "../Addon.messages";

const { React } = cssns("AddonsTabView");

interface CharacteristicsContentProps {
	characteristics: Record<string, string> | undefined;
}

const CharacteristicsContent: FC<CharacteristicsContentProps> = props => {
	const { characteristics } = props;

	if (!characteristics || isEmpty(characteristics)) {
		return null;
	}

	return (
		<div className="addon-expanded-content-characteristics-list">
			<div>
				<FormattedMessage {...addonMessages.serviceConfiguration}/>
			</div>
			{Object.keys(characteristics).map(key => {
				return (
					<div key={`addon-${key}-characteristic`} className="addon-expanded-content-characteristic-list-item">
						<span className="addon-expanded-content-characteristic-name">{key}</span>
						<span className="addon-expanded-content-characteristic-value">{characteristics[key]}</span>
					</div>
				);
			})}
		</div>
	);
};

export {
	CharacteristicsContent,
	CharacteristicsContentProps
};
