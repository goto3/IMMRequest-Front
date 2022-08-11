import { Component, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NotificationService } from "src/app/core/services/notification.service";
import { User } from "src/app/core/Models/User";
import { UserListComponent } from "src/app/users/user-list/user-list.component";
import { UsersService } from "src/app/core/services/users.service";

export interface DialogData {
	user: User;
	father: UserListComponent;
}

@Component({
	selector: "app-delete-user-dialog",
	templateUrl: "./delete-user-dialog.component.html",
	styleUrls: ["./delete-user-dialog.component.css"],
})
export class DeleteUserDialogComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private usersService: UsersService, private notificationService: NotificationService, private dialog: MatDialog) {}

	delete() {
		this.usersService.delete(this.data.user).subscribe(
			(data: any) => {
				this.data.father.loadUsers();
				this.notificationService.openSnackBar("Usuario eliminado correctamente");
				this.dialog.closeAll();
			},
			(error) => {
				this.notificationService.openSnackBar(error.details);
			}
		);
	}
}
