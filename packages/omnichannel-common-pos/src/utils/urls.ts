import isClient from "./isClient";
const url: string = "/omnichannel-api/api/v0";
const cmsUrl: string = "/omnichannel-cms-api/api/v0";
const restUrl: string = "/omnichannel-api/api/rest";
const { PORT } = process.env;
// noinspection TsLint
const apiUrl: string = !isClient ? `http://localhost:${PORT}${url}` : url;

// noinspection TsLint
export const cmsApiUrl: string = !isClient
	? `http://localhost:${PORT}${cmsUrl}`
	: cmsUrl;
export { restUrl };
export default apiUrl;
