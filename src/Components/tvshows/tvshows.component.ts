import { Component, effect, inject, signal } from '@angular/core';
import { TvShowService } from '../../services/tv-show.service';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tvshows',
  imports: [RouterLink,NgbPaginationModule,FormsModule,CommonModule],
  templateUrl: './tvshows.component.html',
  styleUrl: './tvshows.component.scss'
})
export class TVshowsComponent {
  term:string="";
    page = 1;
collectionSize = 150; 
tvshow = signal<any>([]);
_wishList=inject(WishlistService);
private _TvShowService= inject(TvShowService);
Math = Math;

// ngOnInit(): void {

// this.fetchTvShows();
// }
   constructor() {
    effect(() => {
      const lang = this._TvShowService.language();   
      this.fetchTvShows();                           
    });
  }


fetchTvShows() {
  this._TvShowService.getTvShows(this.page,this._TvShowService.language()).subscribe({
    next: (res: any) => {
      console.log(res);
      this.tvshow.set(res.results);

      if (res.total_pages) {
        this.collectionSize = res.total_pages;
      }
    }
  });
}


toggleInWishlist(item: any, type: 'movie' | 'tv') {
  this._wishList.toggleInWishlist(item, type);
}

isInWishlist(item: any, type: 'movie' | 'tv'): boolean {
  return this._wishList.isInWishlist(item, type);
}
onPageChange(pageNumber: number) {
  this.page = pageNumber;
  this.fetchTvShows();
}
search(){
  if(this.term){
  this._TvShowService.searchByTvName(this.term).subscribe({
    next:(res:any)=>{this.tvshow.set(res.results);}
  })
  }else{
     this.fetchTvShows();
  }

}

getVoteColor(voteAverage: number): string {
  const percentage = voteAverage * 10;
  if (percentage >= 70) return '#28a745';       
  if (percentage >= 50) return '#ffc107';      
  return '#dc3545';                             
}

}
