import ServiceDeskRoute from "./routes/ServiceDeskRoute";
const { CustomerDetailsContainer, ConnectedCustomerDetailsContainer } = require("./components/customer/CustomerDetailsContainer");
const CustomerCaseBar = require("./components/customerCase/CustomerCaseBar");
const CustomerCreationModalContainer = require("./components/customer/CustomerCreationModalContainer");
import * as serviceDeskActions from "./actions";
import * as serviceDeskStores from "./stores";
import CustomerDataForm,
{
	CustomerDataFormProps,
	CustomerDataFormStateProps,
	CustomerDataFormActionProps,
	CustomerDataFormState
} from "./components/CustomerDataForm";
import IndexMessages from "./index.messages";

export * from "./customization";
export {
	CustomerDataForm,
	CustomerDataFormProps,
	CustomerDataFormStateProps,
	CustomerDataFormState,
	CustomerDataFormActionProps,
	CustomerDetailsContainer,
	ConnectedCustomerDetailsContainer,
	CustomerCaseBar,
	CustomerCreationModalContainer,
	ServiceDeskRoute,
	serviceDeskActions,
	serviceDeskStores,
	IndexMessages,
};
