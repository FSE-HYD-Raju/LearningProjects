import { createCssNs, NsFunction, Options } from "css-ns";
import * as React from "react";

const excludeClasses = new RegExp(
	"(" +
		// Legacy
		"^list-unstyled|^pull-|^glyph-|^content-box$|^margin$|^oc-|^hidden-|^visible-|" +
		"^fa$|^fa-|^fas$|^far$|^fab$|^fal$|" +
		"^grid(-item|-header)?$|" +
		// Bootstrap 4
		"^col($|-)|^(form-)?row$|^btn|^alert|^nav|^input-group|^form-(control|group|check)$|^badge|^card|" +
		"^active$|^disabled$|^is-(in)?valid$|^(in)?valid-feedback$|^custom-(control|checkbox|radio|select)(-input|-label)?$|" +
		"^modal-(content|header|body|footer|title)$|" +
		"^table(-striped|-bordered|-hover|-sm|-active|-responsive|-dark|-light|-primary|-secondary|-info|-success|-warning|-danger)?$|" +
		"^thead-(dark|light)$|^shrink$|^nowrap$|" +
		"^dropdown(-toggle|-menu(-right)?|-item|-link|-header|-divider)?$|^show$|" +
		"^list-group|" +
		"^breadcrumb|" +
		"^progress(-bar)?$|" +
		"^d-(flex|none|block|sm-block|sm-none)|" +
		"^text-(right|left|center)$|" +
		"^justify-content-(start|end|between|around|center)|" +
		"^flex-row-reverse|" +
		"^align-items-(start|end|center|baseline|stretch)|" +
		"^align-content-(start|end|center|between|around|stretch)|" +
		"^align-self-(start|end|center|between|auto|stretch)|" +
		"^text-uppercase|" +
		"^text-danger|" +
		// Shared classes and Weasel
		"^b2c-|^w-" +
		")"
);
const cssns = (namespace: string): NsFunction<typeof React> => {
	const options: Options<typeof React> = {
		namespace: namespace,
		React: React,
		exclude: excludeClasses
	};
	return createCssNs<typeof React>(options);
};

export default cssns;
