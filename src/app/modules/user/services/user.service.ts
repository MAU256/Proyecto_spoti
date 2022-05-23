import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../../services/local-storage.service';

@Injectable({
  providedIn: 'root',  
})
export class UserService {
  public url: string;
  constructor(
    private http: HttpClient,
    private localStorageService:LocalStorageService
  ){
    this.url = environment.url;   
  }
 
  signUp(user_to_login: any, gethash = ''): Observable<any> {
    if (gethash != null) {
      user_to_login.gethash = gethash;
    }
    let params = JSON.stringify(user_to_login);
    const headers = { 'content-type': 'application/json' }
    return this.http.post(this.url + 'login', params, { headers: headers });
  }
  register(user_to_register:any): Observable<any>{
    let params = JSON.stringify(user_to_register);
    const headers = { 'content-type': 'application/json'}
    return this.http.post(this.url + 'register', params, { headers: headers })

  }
  updateUser(user_to_update:any):Observable<any>{
    let params = JSON.stringify(user_to_update);
    const headers = { 
                      'content-type': 'application/json',
                      'Authorization': this.localStorageService.getToken()
                    }
    return this.http.put(this.url + 'update-user/' + user_to_update._id, 
          params, 
          { headers: headers });    

  }


}
