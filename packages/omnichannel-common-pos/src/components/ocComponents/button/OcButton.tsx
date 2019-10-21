import * as React from "react";
import * as classnames from "classnames";

enum OcButtonType {
	SECONDARY = "SECONDARY",
	DEFAULT = "DEFAULT",
	PRIMARY = "PRIMARY",
	SUCCESS = "SUCCESS",
	DANGER = "DANGER",
	LINK = "LINK",
}

enum OcButtonSize {
	SMALL = "SMALL",
	LARGE = "LARGE",
	DEFAULT = "DEFAULT",
}

enum OcButtonDropdownType {
	SPLIT = "SPLIT",
	REGULAR = "REGULAR",
}

type OcButtonHtmlButtonType = "submit" | "reset" | "button";

interface OcButtonProps extends React.ClassAttributes<HTMLButtonElement> {
	children?: React.ReactNode;
	onClick?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
	buttonType?: keyof typeof OcButtonType;
	buttonSize?: keyof typeof OcButtonSize;
	htmlBtnType?: OcButtonHtmlButtonType;
	className?: string;
	outline?: boolean;
	disabled?: boolean;
	id?: string;
	icon?: string;
	block?: boolean;
	dropdownType?: keyof typeof OcButtonDropdownType;
	style?: React.CSSProperties;
	title?: string;
}

const OcButtonInternal: React.RefForwardingComponent<HTMLButtonElement, OcButtonProps> = (props: OcButtonProps, ref: React.Ref<HTMLButtonElement>) => {
	const { buttonType, outline, buttonSize, block, disabled, className = "", dropdownType, icon, id, htmlBtnType = "button" } = props;
	const buttonClasses = classnames({
		btn: true,
		"btn-outline": !buttonType && outline,
		"btn-secondary": buttonType && (!outline && buttonType === OcButtonType.SECONDARY),
		"btn-outline-secondary": buttonType && (outline && buttonType === OcButtonType.SECONDARY),
		"btn-primary": buttonType && (!outline && buttonType === OcButtonType.PRIMARY),
		"btn-outline-primary": buttonType && (outline && buttonType === OcButtonType.PRIMARY),
		"btn-success": buttonType && (!outline && buttonType === OcButtonType.SUCCESS),
		"btn-outline-success": buttonType && (outline && buttonType === OcButtonType.SUCCESS),
		"btn-danger": buttonType && (!outline && buttonType === OcButtonType.DANGER),
		"btn-outline-danger": buttonType && (outline && buttonType === OcButtonType.DANGER),
		"btn-link": buttonType && buttonType === OcButtonType.LINK,
		"btn-lg": buttonSize === OcButtonSize.LARGE,
		"btn-sm": buttonSize === OcButtonSize.SMALL,
		"dropdown-toggle": dropdownType,
		"btn-block": block,
		"btn-icon-link": icon,
		disabled: disabled,
		[className]: Boolean(className)
	});
	return (
		<button
			type={htmlBtnType}
			className={buttonClasses}
			disabled={disabled}
			onClick={props.onClick}
			id={id}
			style={props.style}
			title={props.title}
			key={props.key}
			ref={ref}
		>
			{icon && <i className={`fa fa-fw ${icon}`}/> }
			{icon && " "}
			{dropdownType && dropdownType === OcButtonDropdownType.SPLIT && <span className="caret"/> }
			{dropdownType && dropdownType === OcButtonDropdownType.REGULAR &&
				<span>
					{props.children}{" "}<span className="caret"/>
				</span>}
			{!dropdownType && props.children}
		</button>
	);
};
OcButtonInternal.displayName = "OcButton";

const OcButton: React.ForwardRefExoticComponent<OcButtonProps & React.RefAttributes<HTMLButtonElement>> =
	React.forwardRef<HTMLButtonElement, OcButtonProps>(OcButtonInternal);
OcButton.displayName = "OcButton";
export {
	OcButtonDropdownType,
	OcButtonSize,
	OcButtonType,
	OcButtonProps,
	OcButtonHtmlButtonType,
	OcButton,
};
