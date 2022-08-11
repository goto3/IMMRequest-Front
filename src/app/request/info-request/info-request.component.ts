import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RequestsService } from "src/app/core/services/requests.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { RequestDT } from "src/app/core/Models/RequestDT";
import { Applicant } from "src/app/core/Models/Applicant";
import { TopicType } from "src/app/core/Models/TopicType";
import { TopicTypesService } from "src/app/core/services/topicTypes.service";

@Component({
	selector: "app-info-request",
	templateUrl: "./info-request.component.html",
	styleUrls: ["./info-request.component.css"],
})
export class InfoRequestComponent implements OnInit, OnDestroy {
	requestId: string;
	private sub: any;

	request: RequestDT = new RequestDT("", new Applicant("", "", ""), "", null);
	topicType: TopicType = new TopicType();

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private requestsService: RequestsService,
		private topicTypeService: TopicTypesService,
		private notificationService: NotificationService
	) {}

	ngOnInit() {
		this.sub = this.route.params.subscribe((params) => (this.requestId = params["id"]));
		this.requestsService.get(this.requestId).subscribe(
			(data: RequestDT) => this.generateRequestData(data),
			(error) => {
				this.notificationService.openSnackBar(error.details);
				this.router.navigate(["/requests/not-found"]);
			}
		);
	}

	private generateRequestData(data: RequestDT) {
		this.request = data;
		this.topicTypeService.get(this.request.topicType).subscribe(
			(data: TopicType) => (this.topicType = data),
			(error) => this.notificationService.openSnackBar(error.details)
		);
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
