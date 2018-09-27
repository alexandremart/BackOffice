import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArtistComponent } from './artist/artist.component'

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'dash', component: DashboardComponent},
    { path: 'artist/:id', component: ArtistComponent}

];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class RoutingModule {

}