import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "src/app/shared/components/interfaces";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "../../../../environments/environment";
import { FbAuthResponse } from "../../../../environments/interface";

@Injectable()
export class AuthService {
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
			.pipe(tap(this.setToken));
	}

	logout() {
		this.setToken();
	}

	isAuthenticated(): boolean {
		return !!this.token;
	}

	private setToken(response: FbAuthResponse = null) {
		if (response) {
			const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
			localStorage.setItem("fb-token", response.idToken);
			localStorage.setItem("fb-token-exp", expDate.toString());
		} else {
			localStorage.clear();
		}
	}
}
