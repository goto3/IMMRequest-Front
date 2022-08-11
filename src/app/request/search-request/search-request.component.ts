import { Component, OnInit, Inject } from "@angular/core";

@Component({
	selector: "app-search-request",
	templateUrl: "./search-request.component.html",
	styleUrls: ["./search-request.component.css"],
})
export class SearchRequestComponent implements OnInit {
	idList: string[] = [];

	requestId: string = "";

	constructor(@Inject("LOCALSTORAGE") private localStorage: Storage) {}

	ngOnInit() {
		var ids = JSON.parse(localStorage.getItem("SentRequests"));
		if (ids) {
			ids.forEach((element) => this.idList.push(element.requestId));
		}
	}

	public deleteRequests() {
		localStorage.setItem("SentRequests", null);
		this.idList = [];
	}
}
