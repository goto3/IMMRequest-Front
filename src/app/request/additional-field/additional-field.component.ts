import { Component, OnChanges, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { AdditionalField } from "./../../core/Models/AdditionalField";
import { ErrorStateMatcher } from "@angular/material/core";
import { FormControl, FormGroupDirective, NgForm, FormGroup, ValidatorFn, AbstractControl, Validators } from "@angular/forms";

@Component({
	selector: "app-additional-field",
	templateUrl: "./additional-field.component.html",
	styleUrls: ["./additional-field.component.css"],
})
export class AdditionalFieldComponent implements OnInit, ErrorStateMatcher {
	@Input() field: AdditionalField;
	@Input() form: FormGroup;

	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}

	get isValid() {
		return this.form.controls[this.field.name].valid;
	}
	get isDirty() {
		return this.form.controls[this.field.name].dirty;
	}

	minDate: Date;
	maxDate: Date;

	constructor() {}

	ngOnInit() {
		if (this.field.fieldType == "Integer" && this.field.possibleValues) {
			this.form.controls[this.field.id].setValidators([Validators.min(parseInt(this.field.possibleValues[0])), Validators.max(parseInt(this.field.possibleValues[1])), Validators.required]);
		}
		if (this.field.fieldType == "Date" && this.field.possibleValues) {
			let minDay = parseInt(this.field.possibleValues[0].slice(0, 2));
			let minMonth = parseInt(this.field.possibleValues[0].slice(3, 5));
			let minYear = parseInt(this.field.possibleValues[0].slice(6, 10));
			let maxDay = parseInt(this.field.possibleValues[1].slice(0, 2));
			let maxMonth = parseInt(this.field.possibleValues[1].slice(3, 5));
			let maxYear = parseInt(this.field.possibleValues[1].slice(6, 10));
			this.minDate = new Date(minYear, minMonth - 1, minDay);
			this.maxDate = new Date(maxYear, maxMonth - 1, maxDay);
		}
	}
}
