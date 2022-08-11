export class User {
	id: string;
	name: string;
	email: string;
	password: string;
	token: string;

	constructor(name: string, email: string, password: string, token: string) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.token = token;
	}
}
