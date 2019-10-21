"use strict";
import { AppState } from "../../reducers";

const isAnonymousAuthenticationEnabled = () => (state: AppState): boolean => state.auth.anonymousAuthenticationEnabled;

export { isAnonymousAuthenticationEnabled };
