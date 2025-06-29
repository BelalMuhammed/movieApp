import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TvShowService {

 private _http=inject(HttpClient);

 getTvShows()
{
  
return this._http.get(` https://api.themoviedb.org/3/tv/popular?api_key=e2aa1cf4186305fb4d284f821686e38d`)
}

 getTvShowsById(id:number){
  return this._http.get(`https://api.themoviedb.org/3/tv/${id}?api_key=e2aa1cf4186305fb4d284f821686e38d&language`)
 }

}
