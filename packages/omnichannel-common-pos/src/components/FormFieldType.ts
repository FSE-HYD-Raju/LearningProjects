interface FormFieldInputType {
	onBlur: () => void;
}
interface FormFieldType {
	input: FormFieldInputType;
}
export { FormFieldType, FormFieldInputType };
