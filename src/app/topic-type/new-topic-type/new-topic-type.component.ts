import { Component, OnInit } from "@angular/core";
import { Area } from "src/app/core/Models/Area";
import { Topic } from "src/app/core/Models/Topic";
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { AreasService } from "src/app/core/services/areas.service";
import { TopicsService } from "src/app/core/services/topics.service";
import { TopicTypesService } from "src/app/core/services/topicTypes.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { MatDialog } from "@angular/material/dialog";
import { TopicType } from "src/app/core/Models/TopicType";
import { InfoDialogComponent } from "src/app/shared/dialogs/info-dialog/info-dialog.component";

@Component({
	selector: "app-new-topic-type",
	templateUrl: "./new-topic-type.component.html",
	styleUrls: ["./new-topic-type.component.css"],
})
export class NewTopicTypeComponent implements OnInit {
	areas: Area[];
	topics: Topic[];

	showTopics: boolean;

	newTTForm: FormGroup;
	topic: Topic;

	constructor(
		private areasService: AreasService,
		private topicsService: TopicsService,
		private topicTypesService: TopicTypesService,
		private notificationService: NotificationService,
		private dialog: MatDialog,
		private fb: FormBuilder
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
		this.newTTForm = this.fb.group({
			name: ["", Validators.required],
			additionalFields: this.fb.array([]),
		});
	}

	areaSelected(area: Area): void {
		this.topics = area.topics;
		this.showTopics = area.topics.length > 0;
		this.topic = null;
	}

	topicSelected(topic: Topic): void {
		this.topicsService.getTopic(topic.id).subscribe(
			(data: Topic) => {
				this.topic = data;
			},
			(error: any) => console.log(error)
		);
	}

	addNewAF() {
		let control = <FormArray>this.newTTForm.controls.additionalFields;
		control.push(
			this.fb.group({
				name: ["", Validators.required],
				fieldType: ["", Validators.required],
				multiple: ["False", Validators.required],
				possibleValues: this.fb.array([]),
			})
		);
	}

	deleteAF(index) {
		let control = <FormArray>this.newTTForm.controls.additionalFields;
		control.removeAt(index);
	}

	addNewPossibleValue(control) {
		control.push(new FormControl("", Validators.required));
	}

	addNewPossibleValueRange(control) {
		control.push(new FormControl("", Validators.required));
		control.push(new FormControl("", Validators.required));
	}

	deletePossibleValueRange(control) {
		control.clear();
	}

	deletePossibleValue(control, index) {
		control.removeAt(index);
	}

	cleanPossibleValues(control) {
		if (control) {
			control.clear();
		}
	}

	checkNewAFDisabled() {
		return false;
	}

	sendNewTT() {
		let formTT = this.newTTForm.value as TopicType;
		formTT.topic = this.topic.id;
		this.topicTypesService.post(formTT).subscribe(
			(data) => {
				this.newTTForm.reset();
				this.openDialog(data.id);
			},
			(error) => {
				this.notificationService.openSnackBar(error.details);
			}
		);
	}

	openDialog(id: string) {
		this.dialog.open(InfoDialogComponent, {
			data: {
				type: "NEW_TOPICTYPE",
				info: id,
			},
		});
	}
}
