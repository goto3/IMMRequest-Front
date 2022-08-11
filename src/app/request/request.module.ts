import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NewRequestComponent } from "./new-request/new-request.component";
import { SharedModule } from "../shared/shared.module";
import { RequestRoutingModule } from "./request-routing.module";
import { AdditionalFieldComponent } from "./additional-field/additional-field.component";
import { InfoRequestComponent } from "./info-request/info-request.component";
import { SearchRequestComponent } from "./search-request/search-request.component";
import { AllRequestComponent } from "./all-request/all-request.component";
import { ReportAComponent } from "./report-a/report-a.component";
import { ReportATableComponent } from "./report-a/report-a-table/report-a-table.component";
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from "@angular-material-components/datetime-picker";
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
	declarations: [NewRequestComponent, AdditionalFieldComponent, InfoRequestComponent, SearchRequestComponent, AllRequestComponent, ReportAComponent, ReportATableComponent, NotFoundComponent],
	imports: [CommonModule, SharedModule, RequestRoutingModule, NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule],
})
export class RequestModule {}
