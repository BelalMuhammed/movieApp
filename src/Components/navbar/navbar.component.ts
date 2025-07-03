import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MoviesService } from '../../services/movies.service';
import { TvShowService } from '../../services/tv-show.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,NgbDropdownModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
selectedLanguage = 'En';
_movieService = inject(MoviesService);
_tvShowService = inject(TvShowService);
_wishlist=inject(WishlistService);

selectLanguage(lang: string) {
  this.selectedLanguage = lang;
  console.log('Selected language:', lang);
this._movieService.setLanguage(this.mapLang(lang));
this._tvShowService.setLanguage(this.mapLang(lang));

}

mapLang(shortLang: string): string {
  switch (shortLang) {
    case 'En': return 'en-US';
    case 'Ar': return 'ar-EG';
    case 'Fr': return 'fr-FR';
    case 'Zh': return 'zh-CN';
    default: return 'en-US';
    
  }}

}
