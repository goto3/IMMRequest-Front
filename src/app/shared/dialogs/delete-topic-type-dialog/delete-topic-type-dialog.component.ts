import { Component, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { RequestDT } from "src/app/core/Models/RequestDT";
import { NotificationService } from "src/app/core/services/notification.service";
import { TopicTypesService } from "src/app/core/services/topicTypes.service";
import { TopicType } from "src/app/core/Models/TopicType";
import { DeleteTopicTypeComponent } from "src/app/topic-type/delete-topic-type/delete-topic-type.component";

export interface DialogData {
	topicType: TopicType;
	father: DeleteTopicTypeComponent;
}

@Component({
	selector: "app-delete-topic-type-dialog",
	templateUrl: "./delete-topic-type-dialog.component.html",
	styleUrls: ["./delete-topic-type-dialog.component.css"],
})
export class DeleteTopicTypeDialogComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private TTService: TopicTypesService, private notificationService: NotificationService, private dialog: MatDialog) {}

	delete() {
		this.TTService.delete(this.data.topicType).subscribe(
			(data: any) => {
				this.data.father.loadTopicTypes();
				this.notificationService.openSnackBar("Tipo eliminado correctamente");
				this.dialog.closeAll();
			},
			(error) => {
				this.notificationService.openSnackBar(error.details);
			}
		);
	}
}
