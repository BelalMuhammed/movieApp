import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TvShowService } from '../../services/tv-show.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-tvshows-details',
  imports: [RouterLink],
  templateUrl: './tvshows-details.component.html',
  styleUrl: './tvshows-details.component.scss'
})
export class TVshowsDetailsComponent {
show = signal<any>({});
_route = inject(ActivatedRoute);
_TvShowService= inject(TvShowService);
similarsShows= signal<any>([]);
_wishList = inject(WishlistService)
ngOnInit(): void {
  this._route.params.subscribe({
    next:(res:any)=>{this.getMovieById(res.id);
      this.getRecommendationsMoviesById(res.id);
    }
  })
}

constructor() {

      effect(() => {
    
  this._route.params.subscribe({
    next:(res:any)=>{this.getMovieById(res.id);
      this.getRecommendationsMoviesById(res.id);
    }
  })                        
    });
}

getMovieById(id:number){
  this._TvShowService.getTvShowsById(id,this._TvShowService.language()).subscribe({
    next:(res)=>{
     
      this.show.set(res);
       console.log(this.show());
    }
  })
}

getRecommendationsMoviesById(id:number){
this._TvShowService.getSimilarShows(id,this._TvShowService.language()).subscribe({
  next:(res:any)=>{
    this.similarsShows.set(res.results.filter((item:any)=>item.poster_path!==null).slice(0,6));
    console.log( this.similarsShows());
    
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
  // Convert TMDb rating (0–10) to 0–5 scale
  return this.show().vote_average / 2;
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
