import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { pipe, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  static BASE_URL = "https://api.spotify.com/v1";

  constructor(private http: Http) { 

  }

  //zakomentirana metoda searchTrack nije nudila type kao parametar već je isti utvrdo definirala, 
  //također izvučen je i osnovni dio URL-a (BASE_URL) te search dio
  
  /* searchTrack(query: string) {
    let params: string = [
      `q=${query}`,
      `type=track`
    ].join("&");

    let queryURL: string = `https://api.spotify.com/v1/search?${params}`;

    return this.http.request(queryURL).pipe(map(res => res.json()));
  } */

  searchTrack(query: string){
    return this.search(query, 'track');
  }

  // pojam pretrage (lista parametara q=pojamPretrage?type=track) zajedno sa search djelom prosljeđuje se metodi query
  //primjer konačnog URL-a https://api.spotify.com/v1/search?$q=pojamPretrage?type=track
  query(URL: string, params?: Array<string>):Observable<any[]>{

    let queryURL: string = `${SpotifyService.BASE_URL}?${URL}`;
    if (params) {
      queryURL = `${queryURL}?${params.join('&')}`;
    }

    const apiKey = environment.spotifyAPIKey;

    const headers = new Headers({
      Authorization: `Bearer ${apiKey}`
    });

    const options = new RequestOptions({
      headers: headers
    });

    return this.http.request(queryURL, options).pipe(map((res: any) => res.json()));

  }

  search(query: string, type:string):Observable<any[]>{
    return this.query(`/search`, [`q=${query}`, `type=${type}`]);

  }

  getTrack(id: string):Observable<any[]>{
    return this.query(`/tracks/${id}`);
  }

  getAlbum(id: string):Observable<any[]>{
    return this.query(`/albums/${id}`);
  }

  getArtist(id: string):Observable<any[]>{
    return this.query(`/artists/${id}`);
  }
 
}

export const SPOTIFY_PROVIDERS: Array<any> = [
  {provide: SpotifyService, useClass: SpotifyService}
];
