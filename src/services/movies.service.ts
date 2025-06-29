import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

 private _http=inject(HttpClient);

 getMovies()
{
return this._http.get(`https://api.themoviedb.org/3/discover/movie?api_key=e2aa1cf4186305fb4d284f821686e38d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1`);
}

getMovieById(id:number){
  return this._http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=e2aa1cf4186305fb4d284f821686e38d`);
}

getSimilarMovies(id:number)
{
return this._http.get( `https://api.themoviedb.org/3/movie/${id}/similar?api_key=e2aa1cf4186305fb4d284f821686e38d&language=en-US&page=1`);
}

}
