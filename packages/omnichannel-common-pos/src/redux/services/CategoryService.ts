import BaseService from "./BaseService";
import { AxiosResponse, Category } from "../types";
import { REST } from "../settings/core";
import { Rest } from "./Rest";

export default class CategoryService extends BaseService {
	static async fetchCategories(): Promise<AxiosResponse<Array<Category>>> {
		let resp: any;
		try {
			resp = await Rest.get(`${REST.CATEGORIES}`);
			this.validateResp(resp);
		} catch (e) {
			throw e;
		}
		return resp;
	}
}
