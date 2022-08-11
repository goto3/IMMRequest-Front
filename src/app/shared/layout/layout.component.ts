import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";

import { AuthenticationService } from "./../../core/services/auth.service";
import { SpinnerService } from "../../core/services/spinner.service";
import { User } from "src/app/core/Models/User";
import { AppRoutingModule } from "src/app/app-routing.module";

@Component({
	selector: "app-layout",
	templateUrl: "./layout.component.html",
	styleUrls: ["./layout.component.css"],
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {
	private _mobileQueryListener: () => void;
	mobileQuery: MediaQueryList;
	showSpinner: boolean;
	userName: string;
	isAdmin: boolean;
	currentUser: User;
	routerModule: AppRoutingModule;

	constructor(
		private changeDetectorRef: ChangeDetectorRef,
		private media: MediaMatcher,
		public spinnerService: SpinnerService,
		private authService: AuthenticationService,
		private router: AppRoutingModule
	) {
		this.mobileQuery = this.media.matchMedia("(max-width: 1000px)");
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
		this.currentUser = this.authService.CurrentUser;
		this.routerModule = router;
	}

	LogOut(): void {
		this.authService.logout();
	}

	ngOnInit(): void {
		const user = this.authService.CurrentUser;

		this.isAdmin = user != null;
		if (user) {
			this.userName = user.name;
		} else {
			this.userName = "Ciudadano";
		}
	}

	ngOnDestroy(): void {
		// tslint:disable-next-line: deprecation
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}

	ngAfterViewInit(): void {
		this.changeDetectorRef.detectChanges();
	}
}
