"use strict";

import { AppState } from "./index";
import { initialState as getBasketInitialState, BasketState } from "../models/basket/basket.reducers";
import { initialState as getConsulInitialState, ConsulState } from "../models/consul/consul.reducers";
import { digitalLifeInitialState, DigitalLifeState } from "../models/digitalLife/digitalLife.reducers";
import { salesInitialState, SalesState } from "../models/sales/sales.reducers";
import { initialState as getSchemaInitialState, SchemaState } from "../models/schema/schema.reducers";
import { getRecurringInitialState } from "../models/eCare/recurringTopUp/recurringTopUp.reducers";
import { featureInitialState } from "../models/feature/feature.reducers";

export type InitialState = Record<keyof AppState, () => any>;

const initialState: InitialState = {
	basket: getBasketInitialState,
	consul: getConsulInitialState,
	digitalLife: (): Partial<DigitalLifeState> => digitalLifeInitialState,
	schema: getSchemaInitialState,
	sales: (): Partial<SalesState> => salesInitialState,
	recurringTopUp: getRecurringInitialState,
	feature: () => featureInitialState,
} as InitialState;

export { initialState };
