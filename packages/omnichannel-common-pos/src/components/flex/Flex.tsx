import cssns from "../../utils/cssnsConfig";
import classnames from "classnames";
import { omit } from "lodash";

const { React } = cssns("Flex");

interface FlexProps {
	id?: string;
	className?: string;
	direction?: "column" | "column-reverse" | "row" | "row-reverse" | "";
	alignItems?: "flex-start" | "center" | "flex-end" | "space-around" | "space-between" | "start" | "end" | "around" | "between" | "";
	justifyContent?: "flex-start" | "center" | "flex-end" | "space-around" | "space-between" | "start" | "end" | "around" | "between" | "";
	alignSelf?: "flex-start" | "center" | "flex-end" | "start" | "end" | "";
	wrap?: "wrap" | "wrap-reverse" | "nowrap" | "";
	style?: object;
	flex?: string | number;
	children?: any;
}

const Flex = (props: FlexProps) => {
	let classes = classnames({
		this: true,
		"align-start": props.alignItems && props.alignItems.includes("start"),
		"align-center": props.alignItems && props.alignItems.includes("center"),
		"align-end": props.alignItems && props.alignItems.includes("end"),
		"justify-start": props.justifyContent && props.justifyContent.includes("start"),
		"justify-center": props.justifyContent && props.justifyContent.includes("center"),
		"justify-end": props.justifyContent && props.justifyContent.includes("end"),
		"justify-space-between": props.justifyContent && props.justifyContent.includes("between"),
		"justify-space-around": props.justifyContent && props.justifyContent.includes("around"),
		"align-self-start": props.alignSelf && props.alignSelf.includes("start"),
		"align-self-center": props.alignSelf && props.alignSelf.includes("center"),
		"align-self-end": props.alignSelf && props.alignSelf.includes("end"),
		"flex-row": props.direction === "row",
		"flex-row-reverse": props.direction === "row-reverse",
		"flex-column": props.direction === "column",
		"flex-column-reverse": props.direction === "column-reverse",
		"wrap": props.wrap === "wrap",
		"wrap-reverse": props.wrap === "wrap-reverse",
		"nowrap": props.wrap === "nowrap"
	});

	if (props.className) {
		classes += " " + props.className;
	}

	return (
		<div
			id={props && props.id ? props.id : undefined}
			className={classes}
			style={{
				...props.style,
				flex: props.flex || "initial",
				WebkitFlex: props.flex || "initial"
			}}
			{...omit(props, [
				"style",
				"className",
				"flex",
				"alignItems",
				"justifyContent",
				"alignSelf",
				"direction",
				"wrap",
				"intl"
			])}
		>
			{props.children}
		</div>
	);
};

Flex.defaultProps = {
	alignItems: "",
	justifyContent: "",
	alignSelf: "",
	wrap: "wrap"
};

export default Flex;
