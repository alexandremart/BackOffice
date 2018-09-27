import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ArtistsService } from '../artiste.servise';
import swal from 'sweetalert2';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
})

export class ArtistComponent implements OnInit {

	ArtistId;
	tracks;
	dataAlbums;
	artiste: any = [];
	albums = [];
	newAlbum = {
		"albumName":"",
		"artistName":"",
		"id":""
	}

	selectAlbum;
	selectedFile: File = null;
	apiUrl = environment.apiUrl;
	progress: string = "";

	constructor(private route: Router, private ac_route: ActivatedRoute, public artist: ArtistsService) {
		this.ac_route.params.subscribe(params => {
			this.ArtistId = params['id'];
		});
	}

	onFileSelected(event) {
		this.selectedFile = <File>event.target.files[0];
		console.log("selected file", this.selectedFile);
	}	

	generateAlbum() {
		this.artist.generateAlbum(this.newAlbum).subscribe((data)=> {
			swal({
				title: "Good job!",
				text: "Tu as créé un nouvel album!",
				buttonsStyling: false,
				confirmButtonClass: "btn btn-success",
				type: "success"
			}).catch(swal.noop)
			this.getDatas();
		})
		this.newAlbum.albumName = "";
	}

	getDatas() {
		this.artist.getArtistById(this.ArtistId).subscribe((data) => {
	    this.artiste = data;
	    this.newAlbum.artistName = data.name;
	    this.newAlbum.id = data._id;
	    this.dataAlbums = {
	        headerRow: [ 'Name', 'Nb de Musique', 'actions' ],
	        footerRow: [ 'Name', 'Nb de Musique', 'actions' ],

	        dataRows: [

	        ]
	     };


	    for (var i = this.artiste.albums.length - 1; i >= 0; i--) {
	      this.artist.getAlbum(this.artiste.albums[i]).subscribe((Response) => {
				let name = Response.name;
				let row = [name, Response._id, Response.tracks.length , Response.tracks];
				this.dataAlbums.dataRows.push(row);
	        });
	      };
		this.dataAlbums.dataRows.reverse();
		console.log(this.dataAlbums.dataRows);     
	    });
	}

	addSong(name) {
		// let data = {
		// 	"albumId": this.dataAlbums.dataRows[this.selectAlbum][1],
		// 	"artistId": this.ArtistId,
		// 	"songName": name
		// }
		// this.artist.generateSong(data).subscribe((data)=> {

		// })
		// document.getElementById("btn-close").click();
		var that = this;

		let data = new FormData();
		data.append("file", this.selectedFile);
		data.append("nameFile", this.selectedFile.name);
		data.append("songName", name);
		data.append("artistId", this.ArtistId);
		data.append("albumId", this.dataAlbums.dataRows[this.selectAlbum][1]);

		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		xhr.upload.onloadstart = function (e) {
			console.log("Start uploading");
		}
		xhr.upload.onprogress = function (e) {
			var progressInformation = Math.round(e.loaded / e.total * 100);
			that.progress = progressInformation.toString();
		}
		xhr.upload.onloadend = function (e) {
			console.log("upload done");

		}

	    xhr.onload = function () {
	        // Your request is completed
	        if (xhr.readyState == 4 && xhr.status == 200) {
				swal({
					title: "Good job!",
					text: "Tu as bien ajouté une nouvelle musique dans album!",
					buttonsStyling: false,
					confirmButtonClass: "btn btn-success",
					type: "success"
				}).catch(swal.noop)
				that.getDatas();
	        }
	    };

		let authToken = localStorage.getItem('token');

		xhr.open("POST", this.apiUrl + "/api/track");
		xhr.setRequestHeader("Authorization", `bearer ${authToken}`);
		xhr.send(data);

		// $("#addSongModal").hide();
	}

	ngOnInit() {
		this.getDatas();
	}
}
