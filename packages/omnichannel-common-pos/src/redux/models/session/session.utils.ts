export class Guid {
	id: string;

	constructor() {
		this.id = this.generateUI();
	}

	generateUI() {
		return (
			this.s4() +
			this.s4() +
			"-" +
			this.s4() +
			"-" +
			this.s4() +
			"-" +
			this.s4() +
			"-" +
			this.s4() +
			this.s4() +
			this.s4()
		);
	}

	s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
}
