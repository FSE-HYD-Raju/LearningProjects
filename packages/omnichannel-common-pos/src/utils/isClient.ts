const isClient: boolean = !!(typeof document !== "undefined" || process.env.BROWSER);

export default isClient;
