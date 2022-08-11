import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

import { Topic } from "../Models/Topic";

@Injectable({
	providedIn: "root",
})
export class TopicsService {
	private WEB_API_URL: string = environment.apiURL;

	constructor(private router: Router, private http: HttpClient, @Inject("LOCALSTORAGE") private localStorage: Storage) {}

	getTopic(id: string): Observable<Topic> {
		return this.http.get<Topic>(this.WEB_API_URL + "Topics/" + id).pipe(catchError(this.handleError));
	}

	private handleError(error: any) {
		console.error(error);
		return throwError(error.error || error.message);
	}
}
