import { Component } from "react";
import Highlighter from "react-highlight-words";
import { OcInput, cssns } from "omnichannel-common-pos";
import { Async } from "react-select";

const { React } = cssns("AutoSuggestSelect");

interface AutoSuggestSelectProps {
	onSuggestionSelected: (selectedItem: any) => void;
	loadOptions?: (inputValue?: string) => Promise<any>;
	labelField: string;
	idField: string;
	placeholder?: string;
	value?: string;
	required?: boolean;
	minimalLength?: number;
}

const DEFAULT_MIN_LENGTH: number = 3;

interface AutoSuggestSelectState {
	value: string;
}

class AutoSuggestSelect extends Component<AutoSuggestSelectProps, AutoSuggestSelectState> {
	selectComponent: any;
	inputComponent: any;

	constructor(props: AutoSuggestSelectProps) {
		super(props);
		this.state = {
			value: props.value || ""
		};
	}

	componentWillReceiveProps(newProps: AutoSuggestSelectProps) {
		if (this.props.value !== newProps.value) {
			const newState = {
				value: newProps.value || ""
			};
			this.setState(newState);
		}
	}

	onChange = (selectedItem?: any) => {
		this.setState(
			{
				value:
					(selectedItem && selectedItem[this.props.labelField]) || ""
			},
			() => {
				if (this.props.onSuggestionSelected) {
					this.props.onSuggestionSelected(selectedItem);
				}
			}
		);
	};

	onInputChange = (changeEvent?: any) => {
		if (!changeEvent) {
			// clear icon click
			this.updateState();
			if (this.inputComponent) {
				this.inputComponent.inputElement.value = "";
			}
		} else if (changeEvent && changeEvent.target) {
			this.updateState(changeEvent.target.value);
		}
	};

	updateState = (inputText: string = "") => {
		this.setState({ value: inputText }, () => {
			if (this.selectComponent) {
				this.selectComponent.select.handleInputChange({
					target: { value: inputText }
				});
			}
		});
	};

	loadData = (inputText: string): Promise<any> => {
		const minLength = this.props.minimalLength || DEFAULT_MIN_LENGTH;
		if (inputText && inputText !== "" && inputText.length >= minLength) {
			if (this.props.loadOptions) {
				return this.props.loadOptions(inputText);
			}
		}
		return Promise.resolve({ options: [] });
	};

	onMenuClose = () => {
		if (this.inputComponent) {
			this.inputComponent.inputElement.focus();
		}
	};

	renderOption = (item: any) => {
		return (
			<Highlighter
				searchWords={[this.state.value]}
				textToHighlight={item[this.props.labelField]}
			/>
		);
	};

	render() {
		const { labelField, idField, required, placeholder } = this.props;
		const { value } = this.state;

		return (
			<div className="AutoSuggestSelect">
				<OcInput
					ref={inputComponent => {
						this.inputComponent = inputComponent;
					}}
					value={this.state.value}
					onChange={this.onInputChange}
					placeholder={this.props.placeholder}
					required={this.props.required}
				/>
				<Async
					className="AutoSuggestSelect-select"
					ref={(selectComponent: any) => {
						this.selectComponent = selectComponent;
					}}
					autoBlur={true}
					autoload={false}
					backspaceRemoves={false}
					labelKey={labelField}
					openOnFocus={true}
					loadOptions={this.loadData}
					loadingPlaceholder="Loading..."
					multi={false}
					onChange={this.onChange}
					onInputChange={this.onInputChange}
					onBlurResetsInput={false}
					onCloseResetsInput={false}
					onClose={this.onMenuClose}
					placeholder={placeholder}
					searchPromptText=""
					required={required}
					optionRenderer={this.renderOption}
					value={value}
					valueKey={idField}
				/>
			</div>
		);
	}
}

export default AutoSuggestSelect;
