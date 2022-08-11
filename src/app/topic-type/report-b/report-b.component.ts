import { Component, ViewChild, AfterViewInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TopicTypesService } from "src/app/core/services/topicTypes.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { MatDialog } from "@angular/material/dialog";
import * as moment from "moment";
import { MatPaginator } from "@angular/material/paginator";
import { TopicTypeReportB } from "src/app/core/Models/TopicTypeReportB";

@Component({
	selector: "app-report-b",
	templateUrl: "./report-b.component.html",
	styleUrls: ["./report-b.component.css"],
})
export class ReportBComponent implements AfterViewInit {
	reportBData = new MatTableDataSource<TopicTypeReportB>();
	dateMax = new Date();

	reportBForm: FormGroup;

	displayedColumns: string[] = ["id", "name", "date", "quantity"];

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private TTService: TopicTypesService, private notificationService: NotificationService, private dialog: MatDialog) {
		this.createForm();
	}

	ngAfterViewInit(): void {
		this.reportBData.paginator = this.paginator;
	}

	private createForm() {
		this.reportBForm = new FormGroup({
			dt1: new FormControl("", Validators.required),
			dt2: new FormControl("", Validators.required),
		});
	}

	submitSearch() {
		let dt1 = moment(this.reportBForm.controls["dt1"].value).format("DD/MM/yyyy");
		let dt2 = moment(this.reportBForm.controls["dt2"].value).format("DD/MM/yyyy");
		this.TTService.getReportB(dt1, dt2).subscribe(
			(data: Array<TopicTypeReportB>) => this.generateData(data),
			(error) => {
				this.generateData([]);
				this.notificationService.openSnackBar(error.details);
			}
		);
	}

	private generateData(APIData: Array<TopicTypeReportB>) {
		this.notificationService.openSnackBar("Se encontraton " + APIData.length + " tipos");
		this.reportBData.data = APIData;
	}
}
