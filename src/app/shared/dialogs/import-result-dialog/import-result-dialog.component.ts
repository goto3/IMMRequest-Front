import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UsersService } from "src/app/core/services/users.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { Area } from "src/app/core/Models/Area";

export interface DialogData {
	areas: Array<Area>;
}

@Component({
	selector: "app-import-result-dialog",
	templateUrl: "./import-result-dialog.component.html",
	styleUrls: ["./import-result-dialog.component.css"],
})
export class ImportResultDialogComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private usersService: UsersService, private notificationService: NotificationService, private dialog: MatDialog) {}

	closeMe() {
		this.dialog.closeAll();
	}
}
