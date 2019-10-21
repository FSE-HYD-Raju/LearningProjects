import { LocaleItem } from "../../../redux";
import cssns from "../../../utils/cssnsConfig";
import * as R from "react";
import { withCustomization, CommonCustomizationPoints } from "../../../customization";
import OcSelect from "../../ocComponents/OcSelect";

const React = cssns("ChangeLanguage").React as typeof R;

interface LangsStateProps {
	locale: string;
	locales?: Array<LocaleItem>;
}

interface LangsActionProps {
	actions: {
		changeLanguage: (locale: LocaleItem, saveInCookie?: boolean) => void;
	};
}

interface LangsOwnProps {
	labelFunction?: (locale: string) => string;
}

type LangsProps = LangsStateProps & LangsActionProps & LangsOwnProps;

const defaultLabelFunction: LangsOwnProps["labelFunction"] = (locale: string) => {
	return locale;
};

const Langs: React.FC<LangsProps> = (props: LangsProps) => {
	const locale = props.locale;

	const handleChange = (e: any) => {
		const selectedLocale = e.target ? e.target.value : undefined;
		const localeObject = props.locales
			? props.locales.find(locale => {
					return locale.locale === selectedLocale;
			  })
			: undefined;

		if (localeObject) {
			props.actions.changeLanguage(localeObject, true);
		}
	};

	const labelFunction = props.labelFunction || defaultLabelFunction;

	return (
		<div className="container" data-test-name="change-language-menu">
			<OcSelect
				id="ChangeLanguage-select"
				name="selectedLanguage"
				classes="container"
				value={labelFunction(locale)}
				onChange={handleChange}
				data-customizable
			>
				{props.locales &&
					props.locales.map((localeOption, idx) => {
						const label: string = labelFunction(localeOption.locale);
						return (
							<option
								id={`ChangeLanguage-option-${localeOption.locale}`}
								value={label}
								key={`ChangeLanguage-option-${idx}`}
							>
								{label}
							</option>
						);
					})}
			</OcSelect>
		</div>
	);
};

export default withCustomization(CommonCustomizationPoints.LANGS_SELECTOR, Langs);

export { LangsStateProps, LangsActionProps, LangsOwnProps, LangsProps, defaultLabelFunction };
