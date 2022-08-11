import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { NewRequestComponent } from "./new-request/new-request.component";
import { LayoutComponent } from "../shared/layout/layout.component";
import { InfoRequestComponent } from "./info-request/info-request.component";
import { SearchRequestComponent } from "./search-request/search-request.component";
import { AllRequestComponent } from "./all-request/all-request.component";
import { AuthGuard } from "../core/guards/auth.guard";
import { ReportAComponent } from "./report-a/report-a.component";
import { NotFoundComponent } from "./not-found/not-found.component";

const routes: Routes = [
	{
		path: "",
		component: LayoutComponent,
		children: [
			{ path: "new", component: NewRequestComponent },
			{ path: "details", component: SearchRequestComponent },
			{ path: "details/:id", component: InfoRequestComponent },
			{ path: "not-found", component: NotFoundComponent },
			{ path: "all", canActivate: [AuthGuard], component: AllRequestComponent },
			{ path: "reportA", canActivate: [AuthGuard], component: ReportAComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RequestRoutingModule {}
