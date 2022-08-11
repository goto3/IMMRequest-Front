import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DataImportComponent } from "./data-import/data-import.component";
import { LayoutComponent } from "../shared/layout/layout.component";

const routes: Routes = [
	{
		path: "",
		component: LayoutComponent,
		children: [{ path: "", component: DataImportComponent }],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],

	exports: [RouterModule],
})
export class DataImportRoutingModule {}
