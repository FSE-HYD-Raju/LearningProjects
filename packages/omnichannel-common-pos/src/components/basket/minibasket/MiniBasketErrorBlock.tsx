import { Component, FC } from "react";
import { MiniBasketErrorType } from "../../../redux/models/basketError/basketError.types";
import OcPopover from "../../ocComponents/OcPopover";
import cssns from "../../../utils/cssnsConfig";
import { POSFunctionCustomizationPoints, withCustomization } from "../../../customization";
const { React } = cssns("MiniBasketErrorBlock");

interface  MiniBasketErrorActionProps {
	actions: {
		removeBasketError: (errorId: string) => void;
	};
}

interface MiniBasketErrorListProps {
	basketErrorList: Array<MiniBasketErrorType>;
}

type MiniBasketErrorProps = MiniBasketErrorActionProps & MiniBasketErrorListProps;

const PopoverContent: FC<MiniBasketErrorType> = (basketError: MiniBasketErrorType) => {
	const {error} = basketError;
	const {code, status, message, title} = error;
	return (
		<div>
			<div>
				<strong>{title}</strong>
			</div>
			<div>{code}</div>
			<div>{status}</div>
			<div>{message}</div>
		</div>
	);
};

const RenderDefaultError: FC<MiniBasketErrorType> = (basketError: MiniBasketErrorType) => {
	return (
		<OcPopover content={<PopoverContent {...basketError}/>}
				   id={`basketError-tooltip-${basketError.errorId}`}
				   placement={"bottom"}
				   trigger={["hover", "click"]}
				   show={true}>
			{basketError.productName}
			<i className="fa fa-exclamation btn-icon-right icon-info"/>
		</OcPopover>
	);
};

const RenderBasketError = withCustomization<MiniBasketErrorType>(
	POSFunctionCustomizationPoints.RENDER_BASKET_MINI_BASKET_ERROR,
	RenderDefaultError
);

class MiniBasketErrorBlock extends Component<MiniBasketErrorProps> {
	render() {
		const {basketErrorList} = this.props;
		if (!Array.isArray(basketErrorList) || !basketErrorList.length) {
			return <div/>;
		}
		return (
			<div className="MiniBasketErrorBlock alert alert-danger">
				{
					basketErrorList.map((basketError: MiniBasketErrorType) => {
						return (
							<div key={`${basketError.errorId}`} className="basket-error-record">
								<RenderBasketError {...basketError}/>
								<a
									id="clear-basket-error-button"
									onClick={() => {
										this.props.actions.removeBasketError(basketError.errorId);
									}}
								>
									<i className="fa fa-trash-alt btn-icon-right"/>
								</a>
							</div>
						);
					})
				}
			</div>
		);
	}
}

export {
	MiniBasketErrorProps,
	MiniBasketErrorListProps,
	MiniBasketErrorActionProps,
};
export default MiniBasketErrorBlock;
