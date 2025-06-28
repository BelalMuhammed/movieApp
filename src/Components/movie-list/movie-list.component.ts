import { Component, inject, OnInit, signal } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-movie-list',
  imports: [],
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
