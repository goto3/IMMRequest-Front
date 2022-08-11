import { Topic } from "./Topic";

export class Area {
	id: string;
	name: string;
	topics: Topic[];

	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}
}
