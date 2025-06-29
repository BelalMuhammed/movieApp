import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'app-movie-details',
  imports: [RouterLink],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit{

movie = signal<any>({});
_route = inject(ActivatedRoute);
_movieService= inject(MoviesService);
similarMovies = signal<any>([]);
ngOnInit(): void {
  this._route.params.subscribe({
    next:(res:any)=>{this.getMovieById(res.id);
      this.getRecommendationsMoviesById(res.id);
    }
  })
}

getMovieById(id:number){
  this._movieService.getMovieById(id).subscribe({
    next:(res)=>{
     
      this.movie.set(res);
       console.log(this.movie());
    }
  })
}

getRecommendationsMoviesById(id:number){
this._movieService.getSimilarMovies(id).subscribe({
  next:(res:any)=>{
    this.similarMovies.set(res.results.filter((item:any)=>item.poster_path!==null).slice(0,6));
    console.log( this.similarMovies);
    
  }
})
}

}
