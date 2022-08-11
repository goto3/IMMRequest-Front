import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";
import "rxjs/add/operator/delay";
import { environment } from "src/environments/environment";

import { User } from "../Models/User";

@Injectable({
	providedIn: "root",
})
export class AuthenticationService {
	private WEB_API_URL: string = environment.apiURL;
	private userSubject: BehaviorSubject<User>;

	constructor(private router: Router, private http: HttpClient, @Inject("LOCALSTORAGE") private localStorage: Storage) {
		this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("CurrentUser")));
	}

	public get CurrentUser(): User {
		return this.userSubject.value;
	}

	login(email, password) {
		return this.http
			.post<User>(this.WEB_API_URL + "Sessions", { email, password })
			.pipe(
				map((user) => {
					localStorage.setItem("CurrentUser", JSON.stringify(user));
					this.userSubject.next(user);
					return user;
				}),
				catchError(this.handleError)
			);
	}

	logout(): void {
		localStorage.removeItem("CurrentUser");
		this.userSubject.next(null);
		this.router.navigate(["/auth/login"]);
	}

	updateCurrentUser(updatedUser: User) {
		updatedUser.token = this.CurrentUser.token;
		this.localStorage.setItem("CurrentUser", JSON.stringify(updatedUser));
	}

	private handleError(error: any) {
		console.error(error);
		return throwError(error.error || error.message);
	}
}
