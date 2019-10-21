export interface PaymentMethodsFiltersType {
	type: "inclusive" | "exclusive";
	/* Example object to matchTo:
	 *	{
	 *		attributes: {
	 *			type: string
	 *		}
	 *	}
	 */
	matchTo?: Array<any>;
}
