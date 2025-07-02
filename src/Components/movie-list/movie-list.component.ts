import { Component, inject, OnInit, signal } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/movie';
import {  RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  imports: [RouterLink,CommonModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent implements OnInit{
movies = signal<Movie[]>([]);
_wishList = inject(WishlistService)
private _moviesService = inject(MoviesService);

ngOnInit(): void {
  this._moviesService.getMovies().subscribe({
    next:(res:any)=>{console.log(res);
      this.movies.set(res.results);
    }
  })

}

toggleInWishlist(item: any, type: 'movie' | 'tv') {
  this._wishList.toggleInWishlist(item, type);
}

isInWishlist(item: any, type: 'movie' | 'tv'): boolean {
  return this._wishList.isInWishlist(item, type);
}

  // toggleWishlist(event: Event, product: Product) {
  //   event.stopPropagation(); // prevent propagation if needed
  //   event.preventDefault();  // prevent navigation if inside routerLink

  //   if (this._wishList.isInWishlist(product)) {
  //     this._wishList.removeProduct(product.id);
  //     this._toast.info("Product removed from wishList");
  //   } else {
  //     this._wishList.addProduct(product);
  //       this._toast.success("Product added to wishList");
  //   }
  // }

}
