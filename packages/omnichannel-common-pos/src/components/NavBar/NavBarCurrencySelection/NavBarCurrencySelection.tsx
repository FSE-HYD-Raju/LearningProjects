import cssns from "../../../utils/cssnsConfig";
import OcSelect from "../../ocComponents/OcSelect";

const { React } = cssns("NavBarCurrencySelection");

export interface CurrencySelectionStateProps {
	currencies: Array<{ code: string }>;
	selectedCurrency: string;
}

export interface CurrencySelectionActionProps {
	actions: {
		changeCurrency(value: string): void;
	};
}

const NavBarCurrencySelection: React.FC<CurrencySelectionStateProps & CurrencySelectionActionProps> = props => {
	const { currencies, selectedCurrency, actions } = props;

	return (
		<div className="container" id="NavbarCurrencySelection">
			<OcSelect
				id="selectedCurrency"
				name="selectedCurrency"
				value={selectedCurrency}
				onChange={(e: any) => actions.changeCurrency(e.target.value)}
			>
				{currencies && currencies.map(c => <option value={c.code} key={c.code} children={c.code} />)}
			</OcSelect>
		</div>
	);
};

export default NavBarCurrencySelection;
