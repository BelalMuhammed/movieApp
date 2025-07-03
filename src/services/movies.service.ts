import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  language = signal<string>('en-US'); 
 private _http=inject(HttpClient);

 getMovies(page:number=1,lang:string)
{
return this._http.get(`https://api.themoviedb.org/3/discover/movie?api_key=e2aa1cf4186305fb4d284f821686e38d&language=${lang}&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`);
}

getMovieById(id:number,lang:string){
  return this._http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=e2aa1cf4186305fb4d284f821686e38d&language=${lang}`);
}

getSimilarMovies(id:number,lang:string)
{
return this._http.get( `https://api.themoviedb.org/3/movie/${id}/similar?api_key=e2aa1cf4186305fb4d284f821686e38d&language=${lang}&page=1`);
}
searchByName(name:string){
  return this._http.get(`https://api.themoviedb.org/3/search/movie?api_key=e2aa1cf4186305fb4d284f821686e38d&query=${name}`)
}

  setLanguage(lang: string) {
    this.language.set(lang);
  }
}
