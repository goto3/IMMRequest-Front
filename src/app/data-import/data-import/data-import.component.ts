import { Component, OnInit } from "@angular/core";
import { DllInfo } from "src/app/core/Models/DllInfo";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DataImportService } from "src/app/core/services/dataImport.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { MatDialog } from "@angular/material/dialog";
import { ImportResultDialogComponent } from "src/app/shared/dialogs/import-result-dialog/import-result-dialog.component";
import { Area } from "src/app/core/Models/Area";

@Component({
	selector: "app-data-import",
	templateUrl: "./data-import.component.html",
	styleUrls: ["./data-import.component.css"],
})
export class DataImportComponent implements OnInit {
	avariableDlls: DllInfo[];

	selected: any;
	selectedDll: DllInfo;

	importForm: FormGroup;

	constructor(private dataImportService: DataImportService, private notificationService: NotificationService, private dialog: MatDialog) {
		this.createForm();
	}

	private createForm() {
		this.importForm = new FormGroup({});
	}

	ngOnInit(): void {
		this.dataImportService.getAll().subscribe(
			(data: Array<DllInfo>) => {
				this.avariableDlls = data;
			},
			(error) => {
				this.notificationService.openSnackBar(error.details);
			}
		);
	}

	sendImport() {
		this.selectedDll.fields.forEach((field) => {
			field.data = this.importForm.controls[field.id].value;
		});
		this.dataImportService.create(this.selectedDll).subscribe(
			(data: Array<Area>) => {
				this.openDialog(data);
			},
			(error) => {
				this.notificationService.openSnackBar(error.details);
			}
		);
	}

	openDialog(data: Array<Area>) {
		this.dialog.open(ImportResultDialogComponent, {
			data: {
				areas: data,
			},
		});
	}

	public selectionChanged() {
		this.selectedDll = this.avariableDlls.find((info) => info.name == this.selected);
		this.importForm = new FormGroup({});
		this.selectedDll.fields.forEach((field) => {
			this.importForm.addControl(field.id.toString(), new FormControl("", Validators.required));
		});
	}
}
