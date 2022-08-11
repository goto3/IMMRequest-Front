import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";
import { User } from "../Models/User";
import { AuthenticationService } from "./auth.service";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class UsersService {
	private WEB_API_URL: string = environment.apiURL;

	constructor(private http: HttpClient, private authService: AuthenticationService) {}

	create(newUser: User): any {
		let auth = this.authService.CurrentUser.token;
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append("Accept", "application/json");
		headers = headers.append("Auth", auth);
		const httpOptions = {
			headers: headers,
		};
		return this.http.post<Array<User>>(this.WEB_API_URL + "Users", newUser, httpOptions).pipe(catchError(this.handleError));
	}

	getAll(): Observable<Array<User>> {
		let auth = this.authService.CurrentUser.token;
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append("Accept", "application/json");
		headers = headers.append("Auth", auth);
		const httpOptions = {
			headers: headers,
		};
		return this.http.get<Array<User>>(this.WEB_API_URL + "Users", httpOptions).pipe(catchError(this.handleError));
	}

	update(updatedUser: User): any {
		let auth = this.authService.CurrentUser.token;
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append("Accept", "application/json");
		headers = headers.append("Auth", auth);
		const httpOptions = {
			headers: headers,
		};
		return this.http.put<any>(this.WEB_API_URL + "Users/" + updatedUser.id, updatedUser, httpOptions).pipe(catchError(this.handleError));
	}

	delete(user: User): any {
		let auth = this.authService.CurrentUser.token;
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append("Accept", "application/json");
		headers = headers.append("Auth", auth);
		const httpOptions = {
			headers: headers,
		};
		return this.http.delete<any>(this.WEB_API_URL + "Users/" + user.id, httpOptions).pipe(catchError(this.handleError));
	}

	private handleError(error: any) {
		console.error(error);
		return throwError(error.error || error.message);
	}
}
