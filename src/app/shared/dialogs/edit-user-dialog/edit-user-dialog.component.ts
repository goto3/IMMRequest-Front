import { Component, Inject } from "@angular/core";
import { User } from "src/app/core/Models/User";
import { UsersService } from "src/app/core/services/users.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { NotificationService } from "src/app/core/services/notification.service";

export interface DialogData {
	user: User;
}

@Component({
	selector: "app-edit-user-dialog",
	templateUrl: "./edit-user-dialog.component.html",
	styleUrls: ["./edit-user-dialog.component.css"],
})
export class EditUserDialogComponent {
	editUserForm: FormGroup;

	constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private usersService: UsersService, private notificationService: NotificationService, private dialog: MatDialog) {
		this.createForm();
	}

	private createForm() {
		this.editUserForm = new FormGroup({
			email: new FormControl(this.data.user.email, [Validators.required, Validators.email]),
			name: new FormControl(this.data.user.name),
			password: new FormControl(""),
		});
	}

	editUser() {
		let updatedUser = this.editUserForm.value as User;
		updatedUser.id = this.data.user.id;
		this.usersService.update(updatedUser).subscribe(
			(data: any) => {
				this.data.user.email = updatedUser.email;
				this.data.user.name = updatedUser.name;
				this.notificationService.openSnackBar("Usuario actualizado correctamente");
				this.dialog.closeAll();
			},
			(error) => {
				this.notificationService.openSnackBar(error.details);
			}
		);
	}
}
