import { Observable, throwError, Subject } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { User } from "src/app/shared/components/interfaces";

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "../../../../environments/environment";
import { FbAuthResponse } from "../../../../environments/interface";

@Injectable()
export class AuthService {
	public error$: Subject<string> = new Subject<string>();

	get token(): string {
		const expDate = new Date(localStorage.getItem("fb-token-exp"));
		if (new Date() > expDate) {
			this.logout();
			return null;
		}
		return localStorage.getItem("fb-token");
	}

	constructor(private httpClient: HttpClient) {}

	login(user: User): Observable<any> {
		return this.httpClient
			.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
			.pipe(tap(this.setToken.bind(this)), catchError(this.handleError.bind(this)));
	}

	logout() {
		this.setToken();
	}

	isAuthenticated(): boolean {
		return !!this.token;
	}

	private handleError(error: HttpErrorResponse) {
		const { message } = error.error.error;

		switch (message) {
			case "INVALID_EMAIL":
				this.error$.next("Invalid E-mail");
				break;
			case "EMAIL_NOT_FOUND":
				this.error$.next("E-mail Not Found");
				break;
			case "INVALID_PASSWORD":
				this.error$.next("Invalid Password");
				break;
			default:
				break;
		}

		console.log(message);

		return throwError(error);
	}

	private setToken(response: FbAuthResponse = null) {
		console.log(response);

		if (response) {
			const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
			localStorage.setItem("fb-token", response.idToken);
			localStorage.setItem("fb-token-exp", expDate.toString());
		} else {
			localStorage.clear();
		}
	}
}
