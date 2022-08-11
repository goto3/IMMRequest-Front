import { NgxLoggerLevel } from "ngx-logger";

export const environment = {
	production: true,
	logLevel: NgxLoggerLevel.OFF,
	serverLogLevel: NgxLoggerLevel.ERROR,
	apiURL: "https://localhost:5001/api/",
};
