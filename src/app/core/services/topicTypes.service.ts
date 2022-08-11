import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";

import { TopicType } from "../Models/TopicType";
import { AuthenticationService } from "./auth.service";
import { TopicTypeReportB } from "../Models/TopicTypeReportB";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class TopicTypesService {
	private WEB_API_URL: string = environment.apiURL;

	constructor(private router: Router, private http: HttpClient, private authService: AuthenticationService) {}

	post(topicType: TopicType) {
		let auth = this.authService.CurrentUser.token;
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append("Accept", "application/json");
		headers = headers.append("Auth", auth);
		const httpOptions = {
			headers: headers,
			responsetype: "text",
		};
		return this.http.post<TopicType>(this.WEB_API_URL + "TopicTypes", topicType, httpOptions).pipe(
			map((req) => {
				return req;
			}),
			catchError(this.handleError)
		);
	}

	get(id: string): Observable<TopicType> {
		return this.http.get<TopicType>(this.WEB_API_URL + "TopicTypes/" + id).pipe(catchError(this.handleError));
	}

	getAll(): Observable<Array<TopicType>> {
		let auth = this.authService.CurrentUser.token;
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append("Accept", "application/json");
		headers = headers.append("Auth", auth);
		const httpOptions = {
			headers: headers,
		};
		return this.http.get<Array<TopicType>>(this.WEB_API_URL + "TopicTypes/", httpOptions).pipe(catchError(this.handleError));
	}

	getReportB(dt1: string, dt2: string) {
		let auth = this.authService.CurrentUser.token;
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append("Accept", "application/json");
		headers = headers.append("Auth", auth);

		let params: HttpParams = new HttpParams();
		params = params.append("dateStart", dt1);
		params = params.append("dateEnd", dt2);

		const httpOptions = {
			headers: headers,
			params: params,
		};
		return this.http.get<Array<TopicTypeReportB>>(this.WEB_API_URL + "TopicTypes/ReporteB", httpOptions).pipe(catchError(this.handleError));
	}

	delete(tt: TopicType) {
		let auth = this.authService.CurrentUser.token;
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append("Accept", "application/json");
		headers = headers.append("Auth", auth);
		const httpOptions = {
			headers: headers,
		};
		return this.http.delete<any>(this.WEB_API_URL + "TopicTypes/" + tt.id, httpOptions).pipe(catchError(this.handleError));
	}

	private handleError(error: any) {
		console.error(error);
		return throwError(error.error || error.message);
	}
}
