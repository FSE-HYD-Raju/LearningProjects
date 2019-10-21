class LanguagesUtil {
	static findByCode = (items: Array<Item>, code: string): Item | undefined => {
		return items.find((it: Item) => {
			return it.code === code;
		});
	};

	static uniqueLanguageCodes = (languages: Array<Item>) => {
		return languages.reduce(
			(acc: Array<Item>, item: Item) => {
				const existingItem = LanguagesUtil.findByCode(acc, item.code);
				if (existingItem) {
					if (acc.length > 0) {
						acc = acc.filter((fitem: Item) => fitem.code !== existingItem.code);
						const newItem = new Item(item.name + " / " + existingItem.name, existingItem.code);
						acc.push(newItem);
					}
				} else {
					acc.push(item);
				}
				return acc;
			},
			[]);
	};
}

class Item {
	name: string;
	code: string;

	constructor(name: string, code: string) {
		this.name = name;
		this.code = code;
	}
}

export default LanguagesUtil;
export {
	Item,
};
