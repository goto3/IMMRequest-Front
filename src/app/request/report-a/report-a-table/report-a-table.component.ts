import { Component, OnInit, Input, ViewChild, AfterViewInit, Output } from "@angular/core";
import { IRequestDT } from "src/app/core/Models/IRequestDT";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { RequestsService } from "src/app/core/services/requests.service";

@Component({
	selector: "app-report-a-table",
	templateUrl: "./report-a-table.component.html",
	styleUrls: ["./report-a-table.component.css"],
})
export class ReportATableComponent implements AfterViewInit {
	displayedColumns: string[] = ["id", "fecha", "estado"];

	@Input() tableData: MatTableDataSource<IRequestDT>;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor() {}

	ngAfterViewInit(): void {
		this.tableData.paginator = this.paginator;
	}
}
