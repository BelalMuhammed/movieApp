import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TvShowService {

 private _http=inject(HttpClient);
 language = signal<string>('en-US'); 
 getTvShows(page:number=1,lang:string)
{
  
return this._http.get(` https://api.themoviedb.org/3/tv/popular?api_key=e2aa1cf4186305fb4d284f821686e38d&language=${lang}&page=${page}`)
}

 getTvShowsById(id:number,lang:string){
  return this._http.get(`https://api.themoviedb.org/3/tv/${id}?api_key=e2aa1cf4186305fb4d284f821686e38d&language=${lang}`)
 }
 getSimilarShows(id:number,lang:string){
  return this._http.get(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=e2aa1cf4186305fb4d284f821686e38d&language=${lang}&page=1`)
 }

 searchByTvName(name:string){
  return this._http.get(`https://api.themoviedb.org/3/search/tv?api_key=e2aa1cf4186305fb4d284f821686e38d&query=${name}`)
}
  setLanguage(lang: string) {
    this.language.set(lang);
  }
}
