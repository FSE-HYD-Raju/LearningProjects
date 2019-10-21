import ConsulQuery from "./ConsulQuery";
import ConsulKv from "./ConsulKv";
import ConsulCatalog from "./ConsulCatalog";
import ConsulHealth from "./ConsulHealth";
import ConsulEvent from "./ConsulEvent";
import ConsulSession from "./ConsulSession";
import ConsulLock from "./ConsulLock";
import ConsulStatus from "./ConsulStatus";
import ConsulAgent from "./ConsulAgent";
import ConsulWatch from "./ConsulWatch";
import ConsulAcl from "./ConsulAcl";

export default interface Consul {
	parseQueryMeta: (res: any) => void;
	walk: () => void;
	acl: ConsulAcl;
	agent: ConsulAgent;
	catalog: ConsulCatalog;
	event: ConsulEvent;
	health: ConsulHealth;
	kv: ConsulKv;
	lock: ConsulLock;
	query: ConsulQuery;
	session: ConsulSession;
	status: ConsulStatus;
	watch: ConsulWatch;
}
