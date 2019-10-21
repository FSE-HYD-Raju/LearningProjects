import { isChannelCmsAdmin } from "../../utils";

class CmsUtils {

	static getChannelFromEnvVariable(): string | undefined {
		let publishTargetKey = null;

		const app = process && process.env && process.env.omnichannel;
		if (app) {
			publishTargetKey = app;
		}
		return publishTargetKey;
	}

	static parseContentSpotKey = (publishTarget: string | undefined, fragment: string | undefined): string | undefined => {
		if (publishTarget && fragment) {
			return `${publishTarget}|${fragment}`;
		}
		return undefined;
	};

	static getCurrentPublishTargetKey(storeSelectedTarget?: any): string | undefined {
		let publishTargetKey = null;

		// Take from admins selected target or from channel
		if (isChannelCmsAdmin() && storeSelectedTarget) {
			publishTargetKey = storeSelectedTarget.key;
		} else {
			publishTargetKey = this.getChannelFromEnvVariable();
		}

		return publishTargetKey;
	}

	static splitContentSpotKey(key: string): {publishTarget: string; fragment: string} | undefined {
		if (key) {
			const partitions = key.split("|");
			if (partitions.length === 2) {
				return {
					publishTarget: partitions[0],
					fragment: partitions[1]
				};
			}
		}
		return undefined;
	}

	static getListItemById(list: Array<any>, idField: string, id: string | number): any {
		let foundItem = null;
		if (list) {
			foundItem = list.find(item => item[idField] === id);
		}
		return foundItem ? foundItem : null;
	}

	/**
	 * Appends given params to the queryString if they are defined.
	 *
	 * Usage: Utils.constructQueryString({pageId, refreshCache, language});
	 *
	 * returns: ?pageId=2&refreshCache=true&language=fi
	 */
	static constructQueryString(params: Record<string, any> = {}): string {
		let queryString = "";

		for (const property in params) {
			if (params.hasOwnProperty(property)) {
				const value = params[property];
				if (value || value === "" || value === 0) {
					if (queryString.length > 0) {
						queryString += "&";
					}
					queryString += property + "=" + value;
				}
			}
		}

		if (queryString.length > 0) {
			queryString = "?" + queryString;
		}

		return queryString;
	}

	static buildContentSpotKey(publishTarget: string, fragment: string | undefined): string | undefined {
		if (publishTarget && fragment) {
			return `${publishTarget}|${fragment}`;
		}
		return undefined;
	}
}

export {
	CmsUtils
};
