export interface Links {
	self?: string;
	related?: string;
}

export interface HasLinks {
	links: Links;
}
