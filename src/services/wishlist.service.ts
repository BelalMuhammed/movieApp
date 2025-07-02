import { Injectable, signal } from '@angular/core';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  moviesWishlist = signal<any[]>([]);
  tvShowsWishlist = signal<any[]>([]);

  constructor() {
    this.loadFromLocalStorage(); // ✅ Automatically load on service init
  }

  // ✅ Load both lists from localStorage
  private loadFromLocalStorage() {
    const allItems = this.getFromLocalStorage('wishlist');
    this.moviesWishlist.set(allItems.filter((item) => item.type === 'movie'));
    this.tvShowsWishlist.set(allItems.filter((item) => item.type === 'tv'));
  }

  // ✅ Read from localStorage
  private getFromLocalStorage(key: string): any[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  // ✅ Save both lists into one array in localStorage
  private setToLocalStorageFromSignals() {
    const all = [
      ...this.moviesWishlist().map(m => ({ ...m, type: 'movie' })),
      ...this.tvShowsWishlist().map(tv => ({ ...tv, type: 'tv' }))
    ];
    localStorage.setItem('wishlist', JSON.stringify(all));
  }

  // ✅ Add/Remove from wishlist
  toggleInWishlist(item: any, type: 'movie' | 'tv') {
    const listSignal = type === 'movie' ? this.moviesWishlist : this.tvShowsWishlist;
    const exists = listSignal().some(p => p.id === item.id);

    if (exists) {
      const updated = listSignal().filter(p => p.id !== item.id);
      listSignal.set(updated);
    } else {
      const updated = [...listSignal(), item];
      listSignal.set(updated);
    }

    this.setToLocalStorageFromSignals();
  }

  // ✅ Check if item exists
  isInWishlist(item: any, type: 'movie' | 'tv'): boolean {
    const list = type === 'movie' ? this.moviesWishlist() : this.tvShowsWishlist();
    return list.some(p => p.id === item.id);
  }

    // ✅ Remove a specific item
  removeFromWishlist(item: any, type: 'movie' | 'tv') {
    const listSignal = type === 'movie' ? this.moviesWishlist : this.tvShowsWishlist;
    const updated = listSignal().filter(p => p.id !== item.id);
    listSignal.set(updated);
    this.setToLocalStorageFromSignals();
  }

  // ✅ Clear the entire wishlist
  clearWishlist() {
    this.moviesWishlist.set([]);
    this.tvShowsWishlist.set([]);
    localStorage.removeItem('wishlist');
  }


// moviesWishlist = signal<any[]>([]);
// tvShowsWishlist = signal<any[]>([]);

// ngOnInit() {
//   const allItems = this.getFromLocalStorage('wishlist');
//   this.moviesWishlist.set(allItems.filter((item) => item.type === 'movie'));
//   this.tvShowsWishlist.set(allItems.filter((item) => item.type === 'tv'));
// }

// getFromLocalStorage(key: string): any[] {
//   const data = localStorage.getItem(key);
//   return data ? JSON.parse(data) : [];
// }

// setToLocalStorageFromSignals() {
//   const all = [
//     ...this.moviesWishlist().map(m => ({ ...m, type: 'movie' })),
//     ...this.tvShowsWishlist().map(tv => ({ ...tv, type: 'tv' }))
//   ];
//   localStorage.setItem('wishlist', JSON.stringify(all));
// }


// toggleInWishlist(item: any, type: 'movie' | 'tv') {
//   const listSignal = type === 'movie' ? this.moviesWishlist : this.tvShowsWishlist;
//   const exists = listSignal().some(p => p.id === item.id);

//   if (exists) {
//     const updated = listSignal().filter(p => p.id !== item.id);
//     listSignal.set(updated);
   
//   } else {
//     const updated = [...listSignal(), item];
//     listSignal.set(updated);
   
//   }

//   this.setToLocalStorageFromSignals(); // Save both lists together
// }

// isInWishlist(item: any, type: 'movie' | 'tv'): boolean {
//   const list = type === 'movie' ? this.moviesWishlist() : this.tvShowsWishlist();
//   return list.some(p => p.id === item.id);
// }
// ================================================
//  movies=signal<any[]>([]);
//  tvShows =signal<any[]>([]);

// // isMovieInWishlist(movie: Movie){
// //         return this.movies().some(p => p.id === movie.id);
// //       }
// // isShowInWishlist(show: Movie){
// //         return this.tvShows().some(p => p.id === show.id);
// //       }    

// toggleProductInCart(product: Product) {
//   const currentCart = this._products.productsCart();
//   const exists = currentCart.some(p => p.id === product.id);

//   if (exists) {
//     // Remove product
//    this._products.productsCart.update(cart => cart.filter(p => p.id !== product.id));
//       this._toast.info("Product removed from cart");
//   } else {
//     // Add product

//     this._products.productsCart.update(cart => [...cart, product]);
//    this._toast.success("Product added to cart");
//   }
// }
// isInCart(product: Product): boolean {
//   return this._products.productsCart().some(p => p.id === product.id);
// }

}
