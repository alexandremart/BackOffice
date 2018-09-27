import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class LoginService {

	constructor(public http: Http) {
		this.http = http;
	}

	apiUrl = environment.apiUrl;

	loginMethod(data) {
		return this.http.post(this.apiUrl + "/api/authentification/login", data)
		.map(response => {
			let responseVar = response.json();
			console.log(responseVar.token);
			try {
				localStorage.setItem('token', responseVar.token);
			} catch(err) {
				localStorage.removeItem('token');
			}
		},
		error => {
			console.log(error);
		});
	};

}
