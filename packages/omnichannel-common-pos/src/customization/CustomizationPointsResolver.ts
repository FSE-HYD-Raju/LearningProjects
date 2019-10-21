import * as React from "react";
import { AppState } from "../redux";
import { CustomizationPointsMapping } from "./types/CustomizationPointsMapping";
import { noop } from "lodash";
import { CustomizationFunction } from "./types/CustomizationFunction";
import { EmptyComponent } from "../components/EmptyComponent";

export class CustomizationPointsResolver {
	customizationPointsMapping: CustomizationPointsMapping<any> = {};

	setCustomizationPointsMapping<S extends AppState>(customizationPointsMapping: CustomizationPointsMapping<S>): void {
		this.customizationPointsMapping = {...customizationPointsMapping};
	}

	getComponent<P>(customizationKey: string, defaultComponent: React.ComponentType<P>): React.ComponentType<P> {
		const customizationPointToComponent = this.customizationPointsMapping.components;

		if (!customizationPointToComponent || !customizationPointToComponent[customizationKey]) {
			// defaultComponent can be null
			if (defaultComponent === null) {
				return EmptyComponent;
			} else if (defaultComponent) {
				return defaultComponent;
			}
			throw new Error(
				`No Component found for key ${customizationKey}`
			);
		}
		return customizationPointToComponent[customizationKey];
	}

	getSchema(customizationKey: string, defaultSchema: any) {
		const schema = this.customizationPointsMapping.schemas
						? this.customizationPointsMapping.schemas[customizationKey]
						: undefined;

		if (schema) {
			return schema;
		}

		if (defaultSchema) {
			return defaultSchema;
		}
		throw new Error(`No schema found for key ${customizationKey}`);
	}

	getFunction(customizationKey: string, defaultFunction: CustomizationFunction): CustomizationFunction {
		const customFunction = this.customizationPointsMapping.functions
			? this.customizationPointsMapping.functions[customizationKey]
			: undefined;

		if (customFunction) {
			return (...args: any[]) =>
				customFunction(defaultFunction || noop, ...args);
		}
		if (defaultFunction) {
			return defaultFunction;
		}
		throw new Error(`No function found for key ${customizationKey}`);
	}

	getClassType<T>(
		customizationKey: string,
		defaultClass: new (...args: any[]) => T
	): new (...args: any[]) => T {
		const classType: (new (...args: any[]) => T) | undefined = this.customizationPointsMapping.classes
			? this.customizationPointsMapping.classes[customizationKey]
			: undefined;

		if (classType) {
			return classType;
		}
		if (defaultClass) {
			return defaultClass;
		}
		throw new Error(`No class type found for key ${customizationKey}`);
	}

	getObject<T>(customizationKey: string, defaultObject: T): T {
		const customObject: T | undefined = this.customizationPointsMapping.objects
			? this.customizationPointsMapping.objects[customizationKey]
			: undefined;

		if (customObject) {
			return customObject;
		}

		if (defaultObject) {
			return defaultObject;
		}
		throw new Error(`No object found for key ${customizationKey}`);
	}
}

function createCustomizationPointsResolver(): CustomizationPointsResolver {
	const customizationPointsResolverObject = (<any> window).customizationPointsResolver || new CustomizationPointsResolver();
	(<any> window).customizationPointsResolver = customizationPointsResolverObject;
	return customizationPointsResolverObject;
}
const customizationPointsResolver: CustomizationPointsResolver = createCustomizationPointsResolver();

export default customizationPointsResolver;
