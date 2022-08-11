import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./core/guards/auth.guard";

const appRoutes: Routes = [
	{
		path: "auth",
		loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
	},
	{
		path: "",
		redirectTo: "requests/new",
		pathMatch: "full",
	},
	{
		path: "requests",
		loadChildren: () => import("./request/request.module").then((m) => m.RequestModule),
	},
	{
		path: "topicTypes",
		loadChildren: () => import("./topic-type/topic-type.module").then((m) => m.TopicTypeModule),
		canActivate: [AuthGuard],
	},
	{
		path: "users",
		loadChildren: () => import("./users/users.module").then((m) => m.UsersModule),
		canActivate: [AuthGuard],
	},
	{
		path: "account",
		loadChildren: () => import("./account/account.module").then((m) => m.AccountModule),
		canActivate: [AuthGuard],
	},
	{
		path: "DataImport",
		loadChildren: () => import("./data-import/data-import.module").then((m) => m.DataImportModule),
		canActivate: [AuthGuard],
	},
	{
		path: "**",
		redirectTo: "requests/new",
		pathMatch: "full",
	},
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule],
	providers: [],
})
export class AppRoutingModule {}
