import { Observable } from 'rxjs';
import { User } from 'src/app/shared/components/interfaces';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
	get token(): string {
		return "";
	}

	constructor(private httpClient: HttpClient) {}

	login(user: User): Observable<any> {
		return this.httpClient.post("", user);
	}

	logout() {}

	isAuthenticated(): boolean {
		return !!this.token;
	}

	private setToken() {}
}
