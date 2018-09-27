import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RoutingModule } from './router';


import { LoginService } from './login.service';
import { ArtistsService } from './artiste.servise';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArtistComponent } from './artist/artist.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ArtistComponent    
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule    
  ],
  providers: [LoginService, ArtistsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
