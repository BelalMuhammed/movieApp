import { Component, inject, signal } from '@angular/core';
import { Movie } from '../../interfaces/movie';
import { TvShowService } from '../../services/tv-show.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tvshows',
  imports: [RouterLink],
  templateUrl: './tvshows.component.html',
  styleUrl: './tvshows.component.scss'
})
export class TVshowsComponent {
tvshow = signal<any>([]);

private _TvShowService= inject(TvShowService);

ngOnInit(): void {
  this._TvShowService.getTvShows().subscribe({
    next:(res:any)=>{console.log(res);
      this.tvshow.set(res.results);
    }
  })

}
}
