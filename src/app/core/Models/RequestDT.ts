import { Applicant } from "./Applicant";
import { AdditionalField } from "./AdditionalField";

export class RequestDT {
	id: string;
	date: string;
	details: string;
	applicant: Applicant;
	status: string;
	statusDescription: string;
	topicType: string;
	additionalFields: AdditionalField[];

	constructor(details: string, applicant: Applicant, topicType: string, additionalFields: AdditionalField[]) {
		this.details = details;
		this.applicant = applicant;
		this.topicType = topicType;
		this.additionalFields = additionalFields;
	}
}
