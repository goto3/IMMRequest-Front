import { Component, OnInit } from "@angular/core";
import { Title } from "../../../../node_modules/@angular/platform-browser";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NotificationService } from "src/app/core/services/notification.service";
import { UsersService } from "src/app/core/services/users.service";
import { AuthenticationService } from "./../../core/services/auth.service";
import { User } from "src/app/core/Models/User";

@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
	editUserForm: FormGroup;

	user: User;

	constructor(private usersService: UsersService, private authService: AuthenticationService, private notificationService: NotificationService) {
		this.createForm();
	}

	private createForm() {
		this.editUserForm = new FormGroup({
			name: new FormControl("", Validators.required),
			email: new FormControl("", [Validators.required, Validators.email]),
			password: new FormControl(""),
		});
	}

	sendForm() {
		var updatedUser = this.editUserForm.value as User;
		updatedUser.id = this.user.id;
		this.usersService.update(updatedUser).subscribe(
			(data) => {
				this.editUserForm.controls["password"].setValue("");
				this.authService.updateCurrentUser(updatedUser);
				this.notificationService.openSnackBar("Administrador actualizado correctamente");
			},
			(error) => {
				this.notificationService.openSnackBar(error.details);
			}
		);
	}

	ngOnInit() {
		this.user = this.authService.CurrentUser;
		this.editUserForm.controls["name"].setValue(this.user.name);
		this.editUserForm.controls["email"].setValue(this.user.email);
		this.editUserForm.controls["password"].setValue(this.user.password);
	}
}
