import { Component, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { RequestDT } from "src/app/core/Models/RequestDT";
import { RequestsService } from "src/app/core/services/requests.service";
import { NotificationService } from "src/app/core/services/notification.service";

export interface DialogData {
	request: RequestDT;
}

@Component({
	selector: "app-edit-request-dialog",
	templateUrl: "./edit-request-dialog.component.html",
	styleUrls: ["./edit-request-dialog.component.css"],
})
export class EditRequestDialogComponent {
	editRequestForm: FormGroup;
	possibleValues: string[] = [];

	constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private requestsService: RequestsService, private notificationService: NotificationService, private dialog: MatDialog) {
		this.generatePossibleValues();
		this.createForm();
	}

	private createForm() {
		this.editRequestForm = new FormGroup({
			newStatus: new FormControl(this.data.request.status, Validators.required),
			newDetails: new FormControl(this.data.request.statusDescription),
		});
	}

	editRequest() {
		let newStatus = this.editRequestForm.controls["newStatus"].value;
		let newDescription = this.editRequestForm.controls["newDetails"].value;
		this.requestsService.putStatus(this.data.request.id, newStatus, newDescription).subscribe(
			(data: any) => {
				this.data.request.status = newStatus;
				this.data.request.statusDescription = newDescription;
				this.notificationService.openSnackBar("Solicitud actualizada correctamente");
				this.dialog.closeAll();
			},
			(error) => {
				this.notificationService.openSnackBar(error.details);
			}
		);
	}

	private generatePossibleValues() {
		switch (this.data.request.status) {
			case "Created": {
				this.possibleValues.push("Created");
				this.possibleValues.push("In review");
				break;
			}
			case "In review": {
				this.possibleValues.push("Created");
				this.possibleValues.push("In review");
				this.possibleValues.push("Accepted");
				this.possibleValues.push("Denied");
				break;
			}
			case "Accepted": {
				this.possibleValues.push("In review");
				this.possibleValues.push("Accepted");
				this.possibleValues.push("Denied");
				this.possibleValues.push("Closed");
				break;
			}
			case "Denied": {
				this.possibleValues.push("In review");
				this.possibleValues.push("Accepted");
				this.possibleValues.push("Denied");
				this.possibleValues.push("Closed");
				break;
			}
			case "Closed": {
				this.possibleValues.push("Accepted");
				this.possibleValues.push("Denied");
				this.possibleValues.push("Closed");
				break;
			}
			default: {
				this.possibleValues.push("Created");
				this.possibleValues.push("In review");
				this.possibleValues.push("Accepted");
				this.possibleValues.push("Denied");
				this.possibleValues.push("Closed");
				break;
			}
		}
	}
}
