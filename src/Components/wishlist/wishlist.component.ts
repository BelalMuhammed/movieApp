import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [TruncatePipe,RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{

_wishlistService = inject(WishlistService);

ngOnInit(): void {
  console.log( this._wishlistService.moviesWishlist());
  console.log(this._wishlistService.tvShowsWishlist());
  
}

removeFromWishlist(event:Event,item:any,type:any){
      event.stopPropagation(); // prevent propagation if needed
    event.preventDefault();  // prevent navigation if inside routerLink
  this._wishlistService.removeFromWishlist(item,type);
}
}
