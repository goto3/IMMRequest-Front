import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";
import { AuthenticationService } from "./auth.service";
import { DllInfo } from "../Models/DllInfo";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class DataImportService {
	private WEB_API_URL: string = environment.apiURL;

	constructor(private http: HttpClient, private authService: AuthenticationService) {}

	create(dllInfo: DllInfo): any {
		let auth = this.authService.CurrentUser.token;
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append("Accept", "application/json");
		headers = headers.append("Auth", auth);

		let params: HttpParams = new HttpParams();
		params = params.append("dllName", dllInfo.name);
		const httpOptions = {
			headers: headers,
			params: params,
		};
		return this.http.post<any>(this.WEB_API_URL + "DataImport", dllInfo.fields, httpOptions).pipe(catchError(this.handleError));
	}

	getAll(): Observable<Array<DllInfo>> {
		let auth = this.authService.CurrentUser.token;
		let headers: HttpHeaders = new HttpHeaders();
		headers = headers.append("Accept", "application/json");
		headers = headers.append("Auth", auth);
		const httpOptions = {
			headers: headers,
		};
		return this.http.get<Array<DllInfo>>(this.WEB_API_URL + "DataImport", httpOptions).pipe(catchError(this.handleError));
	}

	private handleError(error: any) {
		console.error(error);
		return throwError(error.error || error.message);
	}
}
