import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AccountRoutingModule } from "./account-routing.module";
import { ProfileComponent } from "./profile/profile.component";
import { SharedModule } from "../shared/shared.module";
import { ProfileDetailsComponent } from "./profile-details/profile-details.component";

@NgModule({
	imports: [CommonModule, SharedModule, AccountRoutingModule],
	declarations: [ProfileComponent, ProfileDetailsComponent],
	exports: [ProfileComponent],
})
export class AccountModule {}
