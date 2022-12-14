import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DataImportRoutingModule } from "./data-import-routing.module";
import { DataImportComponent } from "./data-import/data-import.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
	declarations: [DataImportComponent],
	imports: [CommonModule, SharedModule, DataImportRoutingModule],
})
export class DataImportModule {}
