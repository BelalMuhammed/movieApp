import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TvShowService } from '../../services/tv-show.service';

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
ngOnInit(): void {
  this._route.params.subscribe({
    next:(res:any)=>{this.getMovieById(res.id);
      this.getRecommendationsMoviesById(res.id);
    }
  })
}

getMovieById(id:number){
  this._TvShowService.getTvShowsById(id).subscribe({
    next:(res)=>{
     
      this.show.set(res);
       console.log(this.show());
    }
  })
}

getRecommendationsMoviesById(id:number){
this._TvShowService.getSimilarShows(id).subscribe({
  next:(res:any)=>{
    this.similarsShows.set(res.results.filter((item:any)=>item.poster_path!==null).slice(0,6));
    console.log( this.similarsShows());
    
  }
})
}

}
