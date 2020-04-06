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
		return "";
	}

	constructor(private httpClient: HttpClient) {}

	login(user: User): Observable<any> {
		return this.httpClient
			.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
			.pipe(tap(this.setToken));
	}

	logout() {}

	isAuthenticated(): boolean {
		return !!this.token;
	}

	private setToken(response: FbAuthResponse) {
		console.log(response);
	}
}
