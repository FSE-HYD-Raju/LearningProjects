import { QueryParams } from "../services/Rest";

export interface PaginationData {
	first?: QueryParams;
	next?: QueryParams;
	prev?: QueryParams;
	last?: QueryParams;
	start: number;
	end: 10;
	totalResourceCount: number;
}
