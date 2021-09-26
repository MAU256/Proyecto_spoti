import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public identity: any;
  public token: string = "";

  constructor() {}


  getIdentity(): any{    
    let identity = JSON.parse(localStorage.getItem('identity')!);
    if(identity != "undefined"){
      this.identity = identity      
    }else{
      this.identity = null;
    }
    return this.identity;
  }

  getToken(): string{
    let token = localStorage.getItem('token')!;
    if(token != 'undefined'){
      this.token = token;
    }else{
      this.token = '';
    }
    return this.token;

  }
}
