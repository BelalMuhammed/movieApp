import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/movie';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-movie-details',
  imports: [RouterLink],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent{

movie = signal<any>({});
_route = inject(ActivatedRoute);
_movieService= inject(MoviesService);
_wishList=inject(WishlistService);
similarMovies = signal<any>([]);

constructor() {

      effect(() => {
      const lang = this._movieService.language();   
       this._route.params.subscribe({
    next:(res:any)=>{this.getMovieById(res.id);
      this.getRecommendationsMoviesById(res.id);
    }
  })                          
    });
}


getMovieById(id:number){
  this._movieService.getMovieById(id,this._movieService.language()).subscribe({
    next:(res)=>{
      this.movie.set(res);
       console.log(this.movie());
    }
  })
}

getRecommendationsMoviesById(id:number){
this._movieService.getSimilarMovies(id,this._movieService.language()).subscribe({
  next:(res:any)=>{
    this.similarMovies.set(res.results.filter((item:any)=>item.poster_path!==null).slice(0,6));
    console.log( this.similarMovies);
    
  }
})
}

toggleInWishlist(item: any, type: 'movie' | 'tv') {
  this._wishList.toggleInWishlist(item, type);
}

isInWishlist(item: any, type: 'movie' | 'tv'): boolean {
  return this._wishList.isInWishlist(item, type);
}

get fiveStarRating(): number {

  return this.movie().vote_average / 2;
}

get fullStars(): number[] {
  const full = Math.floor(this.fiveStarRating);
  return Array(full).fill(0);
}

get hasHalf(): boolean {
  return this.fiveStarRating % 1 >= 0.5;
}

get emptyStars(): number[] {
  const full = Math.floor(this.fiveStarRating);
  const half = this.hasHalf ? 1 : 0;
  return Array(5 - full - half).fill(0);
}

}
