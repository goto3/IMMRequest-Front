export class AdditionalField {
	id: string;
	name: string;
	fieldType: string;
	possibleValues: string[];
	multiple: string;

	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}
}
