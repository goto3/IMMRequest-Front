import { Component, OnInit, Inject } from "@angular/core";
import { Area } from "src/app/core/Models/Area";
import { RequestDT } from "src/app/core/Models/RequestDT";
import { AreasService } from "src/app/core/services/areas.service";
import { Topic } from "src/app/core/Models/Topic";
import { TopicType } from "src/app/core/Models/TopicType";
import { TopicsService } from "src/app/core/services/topics.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TopicTypesService } from "src/app/core/services/topicTypes.service";
import { AdditionalField } from "src/app/core/Models/AdditionalField";
import { Applicant } from "src/app/core/Models/Applicant";
import { AdditionalFieldData } from "src/app/core/Models/AdditionalFieldData";
import { RequestsService } from "src/app/core/services/requests.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { MatDialog } from "@angular/material/dialog";

import * as moment from "moment";
import { InfoDialogComponent } from "src/app/shared/dialogs/info-dialog/info-dialog.component";

@Component({
	selector: "app-new-request",
	templateUrl: "./new-request.component.html",
	styleUrls: ["./new-request.component.css"],
})
export class NewRequestComponent implements OnInit {
	areas: Area[];
	topics: Topic[];
	topicTypes: TopicType[];

	showTopics: boolean;
	showTopicTypes: boolean;

	newRequestForm: FormGroup;
	topicType: TopicType;
	additionalFields: AdditionalField[];

	constructor(
		private areasService: AreasService,
		private requestsService: RequestsService,
		private topicsService: TopicsService,
		private topicTypesService: TopicTypesService,
		private notificationService: NotificationService,
		private dialog: MatDialog
	) {
		this.createForm();
	}

	ngOnInit() {
		this.areasService.getAreas().subscribe(
			(data: Array<Area>) => (this.areas = data),
			(error: any) => console.log(error)
		);
	}

	private createForm() {
		this.newRequestForm = new FormGroup({
			details: new FormControl(""),
			name: new FormControl("", Validators.required),
			email: new FormControl("", [Validators.required, Validators.email]),
			phoneNumber: new FormControl(""),
		});
	}

	sendNewRequest() {
		let request = this.GenerateRequestData();
		this.requestsService.post(request).subscribe(
			(data) => {
				this.newRequestForm.reset();
				this.openDialog(data.id);
			},
			(error) => {
				this.notificationService.openSnackBar(error.details);
			}
		);
	}

	areaSelected(area: Area): void {
		this.topics = area.topics;
		this.showTopics = area.topics.length > 0;
		this.topicType = null;
		this.topicTypes = null;
	}

	topicSelected(topic: Topic): void {
		this.topicsService.getTopic(topic.id).subscribe(
			(data: Topic) => {
				this.topicTypes = data.topicTypes;
				this.showTopicTypes = data.topicTypes.length > 0;
				this.topicType = null;
			},
			(error: any) => console.log(error)
		);
	}

	topicTypeSelected(topicType: TopicType): void {
		this.topicTypesService.get(topicType.id).subscribe(
			(data: TopicType) => {
				this.createForm();
				data.additionalFields.forEach((af) => {
					this.newRequestForm.addControl(af.id, new FormControl("", Validators.required));
				});
				this.topicType = topicType;
				this.topicType.additionalFields = data.additionalFields;
				this.additionalFields = data.additionalFields;
			},
			(error: any) => console.log(error)
		);
	}

	openDialog(id: string) {
		this.dialog.open(InfoDialogComponent, {
			data: {
				type: "NEW_REQUEST",
				info: id,
			},
		});
	}

	private GenerateRequestData() {
		let details = this.newRequestForm.controls["details"].value;
		let name = this.newRequestForm.controls["name"].value;
		let email = this.newRequestForm.controls["email"].value;
		let phoneNumber = this.newRequestForm.controls["phoneNumber"].value;
		let applicant = new Applicant(name, email, phoneNumber);
		let topicTypeId = this.topicType.id;
		var afList = new Array();
		let i = 0;
		this.additionalFields.forEach((af) => {
			var dataList = new Array();
			if (af.multiple == "True") {
				dataList = this.newRequestForm.controls[af.id].value;
			} else {
				if (af.fieldType == "Date") {
					dataList[0] = moment(this.newRequestForm.controls[af.id].value).format("DD/MM/yyyy");
				} else {
					dataList[0] = new String(this.newRequestForm.controls[af.id].value);
				}
			}
			let newAf = new AdditionalFieldData(af.id, dataList);
			afList[i] = newAf;
			i++;
		});
		let request = new RequestDT(details, applicant, topicTypeId, afList);
		return request;
	}
}
