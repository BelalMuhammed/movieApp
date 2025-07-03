import { Injectable, signal } from '@angular/core';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  moviesWishlist = signal<any[]>([]);
  tvShowsWishlist = signal<any[]>([]);

  constructor() {
    this.loadFromLocalStorage(); 
  }


  private loadFromLocalStorage() {
    const allItems = this.getFromLocalStorage('wishlist');
    this.moviesWishlist.set(allItems.filter((item) => item.type === 'movie'));
    this.tvShowsWishlist.set(allItems.filter((item) => item.type === 'tv'));
  }


  private getFromLocalStorage(key: string): any[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

 
  private setToLocalStorageFromSignals() {
    const all = [
      ...this.moviesWishlist().map(m => ({ ...m, type: 'movie' })),
      ...this.tvShowsWishlist().map(tv => ({ ...tv, type: 'tv' }))
    ];
    localStorage.setItem('wishlist', JSON.stringify(all));
  }


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


  isInWishlist(item: any, type: 'movie' | 'tv'): boolean {
    const list = type === 'movie' ? this.moviesWishlist() : this.tvShowsWishlist();
    return list.some(p => p.id === item.id);
  }


  removeFromWishlist(item: any, type: 'movie' | 'tv') {
    const listSignal = type === 'movie' ? this.moviesWishlist : this.tvShowsWishlist;
    const updated = listSignal().filter(p => p.id !== item.id);
    listSignal.set(updated);
    this.setToLocalStorageFromSignals();
  }


  clearWishlist() {
    this.moviesWishlist.set([]);
    this.tvShowsWishlist.set([]);
    localStorage.removeItem('wishlist');
  }

}
