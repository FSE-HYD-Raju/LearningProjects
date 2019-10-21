import { CharacteristicValue, Characteristic, cssns } from "omnichannel-common-pos";
import { FC } from "react";

const { React } = cssns("TechnicalDetails");

interface TechnicalDetailsProps {
	featureCharacteristics?: Array<CharacteristicValue>;
	instanceCharacteristics?: Record<string, Characteristic>;
}

const TechnicalDetails: FC<TechnicalDetailsProps> = (props: TechnicalDetailsProps) => {
	return (
		<div className="container">
			{props.featureCharacteristics && props.featureCharacteristics.map((characteristic: CharacteristicValue) => {
				return (
					characteristic && characteristic.value && (
						<div className="name-container" key={characteristic.value}>
							<span>
								{characteristic.name || characteristic.value}
								</span>
						</div>
					)
				);
			})}
			{props.instanceCharacteristics && Object.keys(props.instanceCharacteristics).map((key: string) => {
				const characteristic = props.instanceCharacteristics && props.instanceCharacteristics[key];
				if (characteristic && characteristic.values && !characteristic.hidden) {
					return (
						<div className="name-container" key={key}>
						  <div className="row">	
							<div className="col-6">
								{characteristic.name || key}
							</div>
							<div className="col-6">
								{characteristic.values.map((value: any) => {
									return value.name || value.value;
								}).join(", ")}
							</div>
						   </div>	
						</div>
					);
				} else {
					return <span/>;
				}
			})}
		</div>
	);
};

export default TechnicalDetails;
export {
	TechnicalDetailsProps
};
