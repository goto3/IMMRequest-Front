import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { RequestsService } from "src/app/core/services/requests.service";
import { RequestDT } from "src/app/core/Models/RequestDT";
import { NotificationService } from "src/app/core/services/notification.service";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { IRequestDT } from "src/app/core/Models/IRequestDT";
import { EditRequestDialogComponent } from "src/app/shared/dialogs/edit-request-dialog/edit-request-dialog.component";

@Component({
	selector: "app-all-request",
	templateUrl: "./all-request.component.html",
	styleUrls: ["./all-request.component.css"],
})
export class AllRequestComponent implements OnInit, AfterViewInit {
	displayedColumns: string[] = ["id", "fecha", "estado", "cambiarEstado"];
	dataSource = new MatTableDataSource<IRequestDT>();

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private requestsService: RequestsService, private notificationService: NotificationService, private dialog: MatDialog) {}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	ngOnInit() {
		this.requestsService.getAll().subscribe(
			(data: IRequestDT[]) => {
				this.dataSource.data = data;
			},
			(error) => {
				this.notificationService.openSnackBar(error.details);
			}
		);
	}

	changeStatus(req: RequestDT) {
		this.dialog.open(EditRequestDialogComponent, {
			data: { request: req },
		});
	}

	public doFilter = (value: string) => {
		this.dataSource.filter = value.trim().toLocaleLowerCase();
	};
}
