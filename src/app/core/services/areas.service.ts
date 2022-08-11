import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";
import { Area } from "../Models/Area";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class AreasService {
	private WEB_API_URL: string = environment.apiURL;

	constructor(private http: HttpClient) {}

	getAreas(): Observable<Array<Area>> {
		return this.http.get<Array<Area>>(this.WEB_API_URL + "Areas").pipe(catchError(this.handleError));
	}

	private handleError(error: any) {
		console.error(error);
		return throwError(error.error || error.message);
	}
}
