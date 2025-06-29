import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:"",redirectTo:"home",pathMatch:'full'},
    {path:"home", loadComponent:()=>import('../Components/movie-list/movie-list.component').then(x =>x.MovieListComponent),pathMatch:'full'},
    {path:"movieDetails/:id", loadComponent:()=>import('../Components/movie-details/movie-details.component').then(x =>x.MovieDetailsComponent),pathMatch:'full'},
    {path:"tvShows", loadComponent:()=>import('../Components/tvshows/tvshows.component').then(x =>x.TVshowsComponent),pathMatch:'full'},
    {path:"tvShowsDetails/:id", loadComponent:()=>import('../Components/tvshows-details/tvshows-details.component').then(x =>x.TVshowsDetailsComponent),pathMatch:'full'},
];
