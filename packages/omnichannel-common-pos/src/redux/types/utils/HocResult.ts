import { OmitUnsafe } from "./Omit";
/**
 * HOC or High Order Component is a function that provides/calculates some of the properties of the component passed to it
 * So as a result - new component requires <b>less</b> props from own props anc optionally includes some new props
 * that are required for HOC only (for example flux for connect() HOC)
 * @see https://reactjs.org/docs/higher-order-components.html
 *
 * ReqProps - properties required by HOC
 * ComProps - properties required by component passed to HOC (e.g. component props)
 * AddedProps - properties that are covered by HOC
 */
type HocResult<ReqProps, CompProps, AddedProps> = OmitUnsafe<CompProps & ReqProps, keyof AddedProps>;

export {
	HocResult,
};
