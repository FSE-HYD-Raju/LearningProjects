import { connect } from "react-redux";
import { AppState } from "../../../redux/reducers";
import { AnyAction, Dispatch } from "redux";
import actions from "../../../redux/actions";
import MiniBasketErrorBlock, {
	MiniBasketErrorActionProps,
	MiniBasketErrorListProps
} from "./MiniBasketErrorBlock";

const mapStateToProps = (state: AppState): MiniBasketErrorListProps => ({
	basketErrorList: state.basketError && state.basketError.errors
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): MiniBasketErrorActionProps => ({
	actions: {
		removeBasketError: (errorId: string) =>
			dispatch(actions.basketError.removeBasketError(errorId))
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniBasketErrorBlock);
