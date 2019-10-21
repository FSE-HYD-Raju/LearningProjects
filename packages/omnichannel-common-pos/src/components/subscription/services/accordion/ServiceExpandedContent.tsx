import cssns from "../../../../utils/cssnsConfig";
import { Service } from "../../../../redux/types";
import { FC } from "react";
import { CharacteristicsContent } from "../../addon/accordion/CharacteristicsContent";

const { React } = cssns("AddonsTabView");

interface ServiceExpandedContentProps {
	addon: Service;
}

const ServiceExpandedContent: FC<ServiceExpandedContentProps> = props => {
	const { addon } = props;

	if (!addon) {
		return <span />;
	}

	return (
		<div id={"addon-expanded-content-" + addon.id} className="addon-expanded-content">
			<CharacteristicsContent characteristics={addon.characteristics}/>
		</div>
	);
};

export {
	ServiceExpandedContent,
	ServiceExpandedContentProps
};
