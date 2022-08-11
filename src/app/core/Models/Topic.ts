import { TopicType } from "./TopicType";

export class Topic {
	id: string;
	name: string;
	topicTypes: TopicType[];

	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}
}
