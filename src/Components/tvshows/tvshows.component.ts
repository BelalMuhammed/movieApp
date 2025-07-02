import { Component, inject, signal } from '@angular/core';
import { Movie } from '../../interfaces/movie';
import { TvShowService } from '../../services/tv-show.service';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-tvshows',
  imports: [RouterLink],
  templateUrl: './tvshows.component.html',
  styleUrl: './tvshows.component.scss'
})
export class TVshowsComponent {
tvshow = signal<any>([]);
_wishList=inject(WishlistService);
private _TvShowService= inject(TvShowService);

ngOnInit(): void {
  this._TvShowService.getTvShows().subscribe({
    next:(res:any)=>{console.log(res);
      this.tvshow.set(res.results);
    }
  })

}

toggleInWishlist(item: any, type: 'movie' | 'tv') {
  this._wishList.toggleInWishlist(item, type);
}

isInWishlist(item: any, type: 'movie' | 'tv'): boolean {
  return this._wishList.isInWishlist(item, type);
}
}
