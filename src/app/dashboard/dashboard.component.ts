import { Component, OnInit, AfterViewInit } from "@angular/core";

import { ArtistsService } from "../artiste.servise";
import { Router } from "@angular/router";

import swal from "sweetalert2";

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  public dataTable: DataTable;

  artists;

  dataArtists;

  newArtist = {
    nameArtist: '',
    imgUrl: ''
  };

  constructor(public artist: ArtistsService, private route: Router) {}

  ngOnInit() {
    this.getDatas();
  }

  getDatas() {
    this.artist.getArtists().subscribe(data => {
      this.artists = data;
      this.dataArtists = {
        headerRow: ["Name"],
        footerRow: ["Name"],

        dataRows: [],
      };

      for (var i = this.artists.length - 1; i >= 0; i--) {
        let name = this.artists[i].name;
        let row = [name, ""];
        this.dataArtists.dataRows.push(row);
      }
      this.dataArtists.dataRows.reverse();
    });
  }

  generateArtist() {
    if (
      this.newArtist.nameArtist === "" ||
      this.newArtist.nameArtist === undefined ||
      this.newArtist.nameArtist === null
    ) {
      swal({
        title: "Erreur",
        text: "Le nom de l'artiste est vide.",
        type: "error",
        confirmButtonClass: "btn btn-info",
        buttonsStyling: false,
      }).catch(swal.noop);
    } else {
      this.artist.generateArtist(this.newArtist).subscribe(data => {
        swal({
          title: "Good job!",
          text: "Tu as créé un nouvel artiste!",
          buttonsStyling: false,
          confirmButtonClass: "btn btn-success",
          type: "success",
        }).catch(swal.noop);
        this.getDatas();
      });
      this.newArtist.nameArtist = "";
    }
  }

  selectArtiste(i) {
    console.log(i);
    let id = this.artists[i]._id;
    console.log(this.artists[i]);
    console.log(id);
    this.route.navigate(["/artist", id]);
  }

  ngAfterViewInit() {
    $("#datatables").DataTable({
      pagingType: "full_numbers",
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search records",
      },
    });

    const table = $("#datatables").DataTable();

    // Edit record
    table.on("click", ".edit", function(e) {
      const $tr = $(this).closest("tr");
      const data = table.row($tr).data();
      alert(
        "You press on Row: " +
          data[0] +
          " " +
          data[1] +
          " " +
          data[2] +
          "'s row.",
      );
      e.preventDefault();
    });

    // Delete a record
    table.on("click", ".remove", function(e) {
      const $tr = $(this).closest("tr");
      table
        .row($tr)
        .remove()
        .draw();
      e.preventDefault();
    });

    //Like record
    table.on("click", ".like", function(e) {
      alert("You clicked on Like button");
      e.preventDefault();
    });

    $(".card .material-datatables label").addClass("form-group");
  }
}
