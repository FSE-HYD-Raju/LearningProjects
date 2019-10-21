import * as React from "react";

type UrlLocator = (serviceName: string) => string;

interface TemplatedAnchorProps {
	id: string;
	href?: string;
	target?: string;
	className?: string;
	children: React.ReactNode;
	urlLocator: UrlLocator;
	showChildrenOnly?: boolean;
}

const serviceTemplateRegex = new RegExp("(https?)-service:\\/\\/([\\w-\\.]*)(\\/.*)?");

const TemplatedAnchor: React.FC<TemplatedAnchorProps> = props => {
	let { href } = props;
	const {id, children, urlLocator, showChildrenOnly, target, className} = props;
	if (!href) {
		return showChildrenOnly ? (<>{children}</>) : null;
	}

	const hrefTemplate = serviceTemplateRegex.exec(href);
	if (hrefTemplate) {
		const [protocol, serviceName, path] = hrefTemplate.slice(1);
		href = `${protocol}://${urlLocator(serviceName) || serviceName}${path || ""}`;
	}
	return (<a id={id} href={href} target={target} className={className}>{children}</a>);
};

export default TemplatedAnchor;
export { TemplatedAnchor, TemplatedAnchorProps, UrlLocator };
