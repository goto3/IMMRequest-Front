import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { TopicType } from "src/app/core/Models/TopicType";
import { MatPaginator } from "@angular/material/paginator";
import { TopicTypesService } from "src/app/core/services/topicTypes.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { MatDialog } from "@angular/material/dialog";
import { DeleteTopicTypeDialogComponent } from "../../shared/dialogs/delete-topic-type-dialog/delete-topic-type-dialog.component";

@Component({
	selector: "app-delete-topic-type",
	templateUrl: "./delete-topic-type.component.html",
	styleUrls: ["./delete-topic-type.component.css"],
})
export class DeleteTopicTypeComponent implements OnInit, AfterViewInit {
	displayedColumns: string[] = ["id", "name", "delete"];
	dataSource = new MatTableDataSource<TopicType>();

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private TTService: TopicTypesService, private notificationService: NotificationService, private dialog: MatDialog) {}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	ngOnInit() {
		this.loadTopicTypes();
	}

	clickDelete(tt: TopicType) {
		this.dialog.open(DeleteTopicTypeDialogComponent, {
			data: { topicType: tt, father: this },
		});
	}

	public loadTopicTypes() {
		this.TTService.getAll().subscribe(
			(data: Array<TopicType>) => {
				this.dataSource.data = data;
			},
			(error) => {
				this.notificationService.openSnackBar(error.details);
			}
		);
	}

	public doFilter = (value: string) => {
		this.dataSource.filter = value.trim().toLocaleLowerCase();
	};
}
