import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:"",redirectTo:"home",pathMatch:'full'},
    {path:"home", loadComponent:()=>import('../Components/movie-list/movie-list.component').then(x =>x.MovieListComponent),pathMatch:'full'}
];
