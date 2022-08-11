import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
	type: string;
	info: string;
}

@Component({
	selector: "app-info-dialog",
	templateUrl: "./info-dialog.component.html",
	styleUrls: ["./info-dialog.component.css"],
})
export class InfoDialogComponent implements OnInit {
	constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private dialog: MatDialog) {}

	closeMe() {
		this.dialog.closeAll();
	}

	ngOnInit() {}
}
