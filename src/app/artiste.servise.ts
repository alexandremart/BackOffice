import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { environment } from '../environments/environment'
import { RequestOptions } from '@angular/http'
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class ArtistsService {

	constructor(public http: Http) {
		this.http = http;
	}
	apiUrl = environment.apiUrl;

	getArtists() {

		let authToken = localStorage.getItem('token');
		let headers = new Headers({ 'Accept': 'application/json' });
		headers.append('Authorization', `bearer ${authToken}`);
		let options = new RequestOptions({ headers: headers });

		return this.http.get(this.apiUrl + "/api/artist/list", options)
		.map(response => response.json());
	}

	getAlbum(idAlbum) {
		let authToken = localStorage.getItem('token');
		let headers = new Headers({ 'Accept': 'application/json' });
		headers.append('Authorization', `bearer ${authToken}`);
		let options = new RequestOptions({ headers: headers });

		return this.http.get(this.apiUrl + "/api/album/getAlbumById/" + idAlbum, options)
		.map(response => response.json());
	}

	getArtistById(idArtist) {

		let authToken = localStorage.getItem('token');
		let headers = new Headers({ 'Accept': 'application/json' });
		headers.append('Authorization', `bearer ${authToken}`);
		let options = new RequestOptions({ headers: headers });

		return this.http.get(this.apiUrl + "/api/artist/getArtistByID/" + idArtist, options)
		.map(response => response.json());
	}


	getAlbums(idArtist) {
		let authToken = localStorage.getItem('token');
		let headers = new Headers({ 'Accept': 'application/json' });
		headers.append('Authorization', `bearer ${authToken}`);
		let options = new RequestOptions({ headers: headers });

		return this.http.get(this.apiUrl + "/api/album/listAlbumByArtistId/" + idArtist, options)
		.map(response => response.json());
	}

	generateAlbum(data) {
		let authToken = localStorage.getItem('token');
		let headers = new Headers({ 'Accept': 'application/json' });
		headers.append('Authorization', `bearer ${authToken}`);
		let options = new RequestOptions({ headers: headers });
		return this.http.post(this.apiUrl + "/api/album/addAlbumToArtistAdmin", data, options)
		.map(response => {
			return response.json();
		},
		error => {
			console.log(error);
		});
	}

	generateArtist(data) {
		let authToken = localStorage.getItem('token');
		let headers = new Headers({ 'Accept': 'application/json' });
		headers.append('Authorization', `bearer ${authToken}`);
		let options = new RequestOptions({ headers: headers });
		return this.http.post(this.apiUrl + "/api/artist/admin", data, options)
		.map(response => {
			return response.json();
		},
		error => {
			console.log(error);
		});
	}

	generateSong(data) {
		let authToken = localStorage.getItem('token');
		let headers = new Headers({ 'Accept': 'application/json' });
		headers.append('Authorization', `bearer ${authToken}`);
		let options = new RequestOptions({ headers: headers });
		return this.http.post(this.apiUrl + "/api/track/uploadAdmin", data, options)
		.map(response => {
			return response.json();
		},
		error => {
			console.log(error);
		});
	}
}
