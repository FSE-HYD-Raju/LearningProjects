import cssns from "../../utils/cssnsConfig";
const Form = require("react-formal");

const { React } = cssns("OcFormField");

class OcFormField extends Form.Field<any> {
	getSchemaTitle() {
        const getSchemaForPath = (this.context && this.context.reactFormalContext) ? this.context.reactFormalContext.schema : undefined;
        /* NOTE this relies on both form & schema being of only 1 level in depth. */
        const schema = typeof getSchemaForPath === "function" ? getSchemaForPath("..") : undefined;
		return schema ? schema._label : undefined;
	}

	componentWillMount() {
		try {
			super.componentWillMount();
		} catch (e) {
			if (e.message.match(/^There is no corresponding schema defined for this field/)) {
				const schemaTitle = this.getSchemaTitle();
				console.error(`Form.Field will not mount because the schema '${schemaTitle}' is vague`);
			}

			throw e;
		}
    }
}

export default OcFormField;
