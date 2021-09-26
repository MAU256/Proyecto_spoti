import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;
  constructor(private http: HttpClient) {
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
    const headers = { 'content-type': 'application/json' }
    return this.http.post(this.url + 'register', params, { headers: headers })

  }


}
