import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";
import { RequestDT } from "src/app/core/Models/RequestDT";
import { AuthenticationService } from "./auth.service";
import { IRequestDT } from "../Models/IRequestDT";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class RequestsService {
	private WEB_API_URL: string = environment.apiURL;

	constructor(private http: HttpClient, private authService: AuthenticationService) {}

	post(request: RequestDT) {
		return this.http.post<RequestDT>(this.WEB_API_URL + "Requests", request).pipe(
			map((req) => {
				var oldItems = JSON.parse(localStorage.getItem("SentRequests")) || [];
				oldItems.unshift({ requestId: req.id });
				localStorage.setItem("SentRequests", JSON.stringify(oldItems));
				return req;
			}),
			catchError(this.handleError)
		);
	}

	get(id: string): Observable<RequestDT> {
		return this.http.get<RequestDT>(this.WEB_API_URL + "Requests/" + id).pipe(catchError(this.handleError));
	}

	getAll(): Observable<Array<RequestDT>> {
		let auth = this.authService.CurrentUser.token;
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append("Accept", "application/json");
		headers = headers.append("Auth", auth);
		const httpOptions = {
			headers: headers,
		};
		return this.http.get<Array<RequestDT>>(this.WEB_API_URL + "Requests", httpOptions).pipe(catchError(this.handleError));
	}

	putStatus(id: string, newStatus: string, newDescription: string) {
		let auth = this.authService.CurrentUser.token;
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append("Accept", "application/json");
		headers = headers.append("Auth", auth);
		const httpOptions = {
			headers: headers,
		};
		return this.http.put<any>(this.WEB_API_URL + "Requests/" + id, { status: newStatus, statusDescription: newDescription }, httpOptions).pipe(
			map((req) => {
				return req;
			}),
			catchError(this.handleError)
		);
	}

	getReportA(email: string, dt1: string, dt2: string) {
		let auth = this.authService.CurrentUser.token;
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append("Accept", "application/json");
		headers = headers.append("Auth", auth);

		let params: HttpParams = new HttpParams();
		params = params.append("email", email);
		params = params.append("dateStart", dt1);
		params = params.append("dateEnd", dt2);

		const httpOptions = {
			headers: headers,
			params: params,
		};
		return this.http.get<Array<IRequestDT>>(this.WEB_API_URL + "Requests/ReporteA", httpOptions).pipe(catchError(this.handleError));
	}

	private handleError(error: any) {
		console.error(error);
		return throwError(error.error || error.message);
	}
}
