"use strict";

const isClient = (): boolean => typeof document !== "undefined" || !!process.env.BROWSER;

export { isClient };

export * from "./modelUtils";
export * from "./channel";
export * from "./common";
