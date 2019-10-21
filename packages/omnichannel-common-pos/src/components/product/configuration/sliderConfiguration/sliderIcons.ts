const iconClassNamesMapping: any = {
	voice: "fa fa-phone",
	data: "fa fa-wifi",
	sms: "fa fa-envelope"
};
const getSliderIconClassNames = (allowanceType: string): string => {
    return iconClassNamesMapping[allowanceType] || "";
};
export default getSliderIconClassNames;
