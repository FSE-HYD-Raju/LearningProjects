import { Component } from "react";
import { cssns, contextTypesValidationMap, ContextType, Store } from "omnichannel-common-pos";
import AutoSuggestSelect from "./autoSuggest/AutoSuggestSelect";
import messages from "./OcStoreSearch.messages";

const { React } = cssns("StoreSearch");

interface OcStoreSearchProps {
	handleSelectItem: (data?: Store) => void;
	items: Array<Store>;
	selectedStore?: Store;
	required?: boolean;
}

interface OcStoreSearchState {
	selectedStore?: Store;
	stores: Array<Store>;
}

type OptionsData = {
	options: Array<Store>,
};

class OcStoreSearch extends Component<OcStoreSearchProps, OcStoreSearchState> {
	static displayName = "OcStoreSearch";
	static contextTypes = contextTypesValidationMap;

	constructor(props: OcStoreSearchProps, context: ContextType) {
		super(props, context);
		this.state = {
			stores: [],
			selectedStore: props.selectedStore
		};
	}

	resetSelection = () => {
		this.props.handleSelectItem();
	};

	clearState = () => {
		this.setState({
			selectedStore: this.props.selectedStore
		});
	};

	// TODO: create action for this
	asyncStoreSearch = (searchText?: string): Promise<OptionsData> => {
		// minimal length specified via AutoSuggestSelect "minimalLength" prop
		if (searchText && searchText !== "") {
			return this.context.flux.axios
				.get(`${this.context.flux.apiCalls.apiUrl}/pointOfSales?filter[searchTerm]=${searchText}`)
				.then((resp: any) => {
					//add location label to stores for autosuggest input
					const stores: Store[] = resp.data ? resp.data.data : [];
					stores.forEach(store => {
						store.locationLabel = this.getLocationLabel(store);
					});
					this.setState({
						selectedStore: undefined
					});
					return Promise.resolve({ options: stores });
				});
		}

		this.clearState();
		return Promise.resolve({ options: [] });
	};

	getLocationLabel = (store: Store) => {
		const street = store && store.attributes ? store.attributes.address.street : undefined;
		const city = store && store.attributes ? store.attributes.address.city : undefined;
		return street && city ? `${street}, ${city}` : street || city || "";
	};

	setSelectedStore = (suggestion?: Store) => {
		this.setState({
			selectedStore: suggestion
		});
		if (this.props.handleSelectItem) {
			this.props.handleSelectItem(suggestion);
		}
	};

	render() {
		const formatMessage = this.context.intl.formatMessage;
		const value = this.state.selectedStore ? this.state.selectedStore.locationLabel : "";

		const placeholderText = formatMessage(messages.searchForStoreLocation);

		return (
			<div>
				<AutoSuggestSelect
					value={value}
					onSuggestionSelected={this.setSelectedStore}
					loadOptions={this.asyncStoreSearch}
					placeholder={placeholderText}
					labelField="locationLabel"
					idField="id"
					required={this.props.required}
				/>
			</div>
		);
	}
}

export default OcStoreSearch;
export {
	OcStoreSearchProps,
	OcStoreSearchState,
};
