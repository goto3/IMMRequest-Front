import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { NotificationService } from "../../core/services/notification.service";
import { User } from "src/app/core/Models/User";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { UsersService } from "src/app/core/services/users.service";
import { EditUserDialogComponent } from "src/app/shared/dialogs/edit-user-dialog/edit-user-dialog.component";
import { CreateUserDialogComponent } from "src/app/shared/dialogs/create-user-dialog/create-user-dialog.component";
import { DeleteUserDialogComponent } from "src/app/shared/dialogs/delete-user-dialog copy/delete-user-dialog.component";

@Component({
	selector: "app-user-list",
	templateUrl: "./user-list.component.html",
	styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit, AfterViewInit {
	displayedColumns: string[] = ["id", "name", "email", "actions"];
	dataSource = new MatTableDataSource<User>();

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private notificationService: NotificationService, private dialog: MatDialog, private usersService: UsersService) {}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	ngOnInit() {
		this.loadUsers();
	}

	public loadUsers() {
		this.usersService.getAll().subscribe(
			(data: Array<User>) => {
				this.dataSource.data = data;
			},
			(error) => {
				this.notificationService.openSnackBar(error.details);
			}
		);
	}

	public createUser() {
		this.dialog.open(CreateUserDialogComponent, {
			data: { father: this },
		});
	}

	public updateUser(user: User) {
		this.dialog.open(EditUserDialogComponent, {
			data: { user: user },
		});
	}

	public deleteUser(user: User) {
		this.dialog.open(DeleteUserDialogComponent, {
			data: { user: user, father: this },
		});
	}

	public doFilter = (value: string) => {
		this.dataSource.filter = value.trim().toLocaleLowerCase();
	};
}
