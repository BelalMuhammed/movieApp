import { Component, effect, inject, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/movie';
import {  RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  imports: [RouterLink,CommonModule,NgbPaginationModule,FormsModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
Math = Math;
  term:string=""
  page = 1;
collectionSize = 150;
movies = signal<Movie[]>([]);
_wishList = inject(WishlistService)
 _moviesService = inject(MoviesService);



   constructor() {
    effect(() => {
      const lang = this._moviesService.language();   
      this.fetchMovies();                           
    });
  }


fetchMovies() {
  this._moviesService.getMovies(this.page,this._moviesService.language()).subscribe({
    next: (res: any) => {
      console.log(res);
      
      this.movies.set(res.results);
      if (res.total_pages) {
        this.collectionSize = res.total_pages;
      }
    }
  });
}

onPageChange(pageNumber: number) {
  this.page = pageNumber;
  this.fetchMovies();
}

toggleInWishlist(item: any, type: 'movie' | 'tv') {
  this._wishList.toggleInWishlist(item, type);
}

isInWishlist(item: any, type: 'movie' | 'tv'): boolean {
  return this._wishList.isInWishlist(item, type);
}

search(){
  if(this.term){
  this._moviesService.searchByName(this.term).subscribe({
    next:(res:any)=>{this.movies.set(res.results);}
  })
  }else{
    this.fetchMovies()
  }

}

getVoteColor(voteAverage: number): string {
  const percentage = voteAverage * 10;
  if (percentage >= 70) return '#28a745';       // green
  if (percentage >= 50) return '#ffc107';       // yellow
  return '#dc3545';                             // red
}

}
