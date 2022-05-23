import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../../services/local-storage.service';
import { Artist } from '../interfaces/artist.interface';


@Injectable({
    providedIn: 'root',  
  })
  export class ArtistService {
    public url: string;
    constructor(
      private _http: HttpClient,
      private _localStorageService:LocalStorageService
    ){
      this.url = environment.url;   
    }

    getArtists(token: string, page: number):Observable<any>{
      let httpOptions = {
        headers: new HttpHeaders({
                        'Content-Type':'application/json',
                        'Authorization': token
                        })
      };

      return this._http.get(this.url + 'artists/' + page, httpOptions )
    }

    getArtist(token: string, id: string):Observable<any>{
      let httpOptions = {
        headers: new HttpHeaders({
                        'Content-Type':'application/json',
                        'Authorization': token
                        })
      };

      return this._http.get(this.url + 'artist/' + id, httpOptions )
    }


    addArtist(token: string, artist: Artist): Observable<any>{
        let params = JSON.stringify(artist);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.post(this.url + 'artist', params, {headers: headers})                         
    }

    editArtist(token: string,id: string , artist: Artist): Observable<any>{
      let params = JSON.stringify(artist);
      let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': token
      });
      return this._http.put(this.url + 'artist/' + id, params, {headers: headers})                         
  }

  deleteArtist(token: string, id: string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
                      'Content-Type':'application/json',
                      'Authorization': token
                      })
    };

    return this._http.delete(this.url + 'artist/' + id, httpOptions )
  }


}