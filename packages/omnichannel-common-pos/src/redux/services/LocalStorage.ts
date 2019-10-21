"use strict";

export default class LocalStorage {
	static setItem = setItem;
}

function setItem(name: string, data: any) {
	localStorage.setItem(name, JSON.stringify(data));
}
