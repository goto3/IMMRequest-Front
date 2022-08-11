import { Component, OnInit, Inject } from "@angular/core";
import { UserListComponent } from "src/app/users/user-list/user-list.component";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UsersService } from "src/app/core/services/users.service";
import { NotificationService } from "src/app/core/services/notification.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "src/app/core/Models/User";

export interface DialogData {
	father: UserListComponent;
}

@Component({
	selector: "app-create-user-dialog",
	templateUrl: "./create-user-dialog.component.html",
	styleUrls: ["./create-user-dialog.component.css"],
})
export class CreateUserDialogComponent {
	createUserForm: FormGroup;

	constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private usersService: UsersService, private notificationService: NotificationService, private dialog: MatDialog) {
		this.createForm();
	}

	private createForm() {
		this.createUserForm = new FormGroup({
			email: new FormControl("", [Validators.required, Validators.email]),
			name: new FormControl(""),
			password: new FormControl("", Validators.required),
		});
	}

	createUser() {
		let newUser = this.createUserForm.value as User;
		this.usersService.create(newUser).subscribe(
			(data: any) => {
				this.data.father.loadUsers();
				this.notificationService.openSnackBar("Usuario creado correctamente");
				this.dialog.closeAll();
			},
			(error) => {
				this.notificationService.openSnackBar(error.details);
			}
		);
	}
}
