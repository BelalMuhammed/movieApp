import { Component, inject, OnInit, signal } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/movie';
import {  RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  imports: [RouterLink],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent implements OnInit{
movies = signal<Movie[]>([]);

private _moviesService = inject(MoviesService);

ngOnInit(): void {
  this._moviesService.getMovies().subscribe({
    next:(res:any)=>{console.log(res);
      this.movies.set(res.results);
    }
  })

}

}
