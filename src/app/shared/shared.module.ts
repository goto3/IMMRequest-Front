import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CustomMaterialModule } from "../custom-material/custom-material.module";
import { LimitToPipe } from "./pipes/limit-to.pipe";
import { ContentPlaceholderAnimationComponent } from "./content-placeholder-animation/content-placeholder-animation.component";
import { LocalDatePipe } from "./pipes/local-date.pipe";
import { YesNoPipe } from "./pipes/yes-no.pipe";
import { LayoutComponent } from "./layout/layout.component";

import { DeleteTopicTypeDialogComponent } from "./dialogs/delete-topic-type-dialog/delete-topic-type-dialog.component";
import { ConfirmDialogComponent } from "./dialogs/confirm-dialog/confirm-dialog.component";
import { InfoDialogComponent } from "./dialogs/info-dialog/info-dialog.component";
import { EditRequestDialogComponent } from "./dialogs/edit-request-dialog/edit-request-dialog.component";
import { EditUserDialogComponent } from "./dialogs/edit-user-dialog/edit-user-dialog.component";
import { CreateUserDialogComponent } from "./dialogs/create-user-dialog/create-user-dialog.component";
import { DeleteUserDialogComponent } from "./dialogs/delete-user-dialog copy/delete-user-dialog.component";
import { ImportResultDialogComponent } from "./dialogs/import-result-dialog/import-result-dialog.component";

@NgModule({
	imports: [RouterModule, CustomMaterialModule, FormsModule, ReactiveFormsModule, FlexLayoutModule],
	declarations: [
		ConfirmDialogComponent,
		ContentPlaceholderAnimationComponent,
		LimitToPipe,
		LocalDatePipe,
		YesNoPipe,
		LayoutComponent,
		InfoDialogComponent,
		EditRequestDialogComponent,
		DeleteTopicTypeDialogComponent,
		EditUserDialogComponent,
		CreateUserDialogComponent,
		DeleteUserDialogComponent,
		ImportResultDialogComponent,
	],
	exports: [
		FormsModule,
		ReactiveFormsModule,
		FlexLayoutModule,
		CustomMaterialModule,
		LimitToPipe,
		ConfirmDialogComponent,
		InfoDialogComponent,
		EditRequestDialogComponent,
		DeleteTopicTypeDialogComponent,
		EditUserDialogComponent,
		ContentPlaceholderAnimationComponent,
		LocalDatePipe,
		YesNoPipe,
		DeleteUserDialogComponent,
		ImportResultDialogComponent,
	],
	entryComponents: [
		ConfirmDialogComponent,
		InfoDialogComponent,
		EditRequestDialogComponent,
		DeleteTopicTypeDialogComponent,
		EditUserDialogComponent,
		CreateUserDialogComponent,
		DeleteUserDialogComponent,
		ImportResultDialogComponent,
	],
})
export class SharedModule {}
