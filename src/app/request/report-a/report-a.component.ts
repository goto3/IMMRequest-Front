import { Component } from "@angular/core";
import { RequestsService } from "src/app/core/services/requests.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { IRequestDT } from "src/app/core/Models/IRequestDT";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import * as moment from "moment";

@Component({
	selector: "app-report-a",
	templateUrl: "./report-a.component.html",
	styleUrls: ["./report-a.component.css"],
})
export class ReportAComponent {
	dataCreated = new MatTableDataSource<IRequestDT>();
	dataInreview = new MatTableDataSource<IRequestDT>();
	dataAccepted = new MatTableDataSource<IRequestDT>();
	dataDenied = new MatTableDataSource<IRequestDT>();
	dataClosed = new MatTableDataSource<IRequestDT>();

	reportAForm: FormGroup;

	constructor(private requestsService: RequestsService, private notificationService: NotificationService, private dialog: MatDialog) {
		this.createForm();
	}

	private createForm() {
		this.reportAForm = new FormGroup({
			email: new FormControl("", Validators.required),
			dt1: new FormControl("", Validators.required),
			dt2: new FormControl("", Validators.required),
		});
	}

	submitSearch() {
		let email = this.reportAForm.controls["email"].value;
		let dt1 = moment(this.reportAForm.controls["dt1"].value).format();
		let dt2 = moment(this.reportAForm.controls["dt2"].value).format();
		this.requestsService.getReportA(email, dt1, dt2).subscribe(
			(data: IRequestDT[]) => this.generateData(data),
			(error) => {
				this.generateData([]);
				this.notificationService.openSnackBar(error.details);
			}
		);
	}

	private generateData(data: IRequestDT[]) {
		this.notificationService.openSnackBar("Se encontraton " + data.length + " solicitudes");
		this.dataCreated.data = data.filter((r) => r.status == "Created");
		this.dataInreview.data = data.filter((r) => r.status == "In review");
		this.dataAccepted.data = data.filter((r) => r.status == "Accepted");
		this.dataDenied.data = data.filter((r) => r.status == "Denied");
		this.dataClosed.data = data.filter((r) => r.status == "Closed");
	}
}
