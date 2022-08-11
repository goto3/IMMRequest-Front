import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "../shared/layout/layout.component";
import { NewTopicTypeComponent } from "./new-topic-type/new-topic-type.component";
import { DeleteTopicTypeComponent } from "./delete-topic-type/delete-topic-type.component";
import { ReportBComponent } from "./report-b/report-b.component";

const routes: Routes = [
	{
		path: "",
		component: LayoutComponent,
		children: [
			{ path: "new", component: NewTopicTypeComponent },
			{ path: "delete", component: DeleteTopicTypeComponent },
			{ path: "reportB", component: ReportBComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TopicTypeRoutingModule {}
