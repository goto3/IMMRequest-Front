import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TopicTypeRoutingModule } from "./topic-type-routing.module";
import { NewTopicTypeComponent } from "./new-topic-type/new-topic-type.component";
import { SharedModule } from "../shared/shared.module";
import { DeleteTopicTypeComponent } from './delete-topic-type/delete-topic-type.component';
import { ReportBComponent } from './report-b/report-b.component';

@NgModule({
	declarations: [NewTopicTypeComponent, DeleteTopicTypeComponent, ReportBComponent],
	imports: [CommonModule, TopicTypeRoutingModule, SharedModule],
})
export class TopicTypeModule {}
