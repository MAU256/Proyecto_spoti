
import { Component, OnInit } from '@angular/core';
import { User } from './modules/interfaces/user';
import { UserService } from './modules/services/user.service';
import { LocalStorageService } from './modules/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [
    UserService, 
    LocalStorageService
  ]
  // styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public user?: User;
  public title = 'MusicBlow';
  public identity?: any;
  public token?: string;
  public errorMessage: string = '';

  constructor(
    private _userService: UserService,
    private _localStorageService: LocalStorageService
  ) {
    // this.user = new User('','','','','','ROLE_USER','');     
    this.user = {
      _id: '',
      name: '',
      surname: '',
      email: '',
      password: '',
      role: 'ROLE_USER',
      image: ''
    }
    
  }
  ngOnInit(): void {
    // console.log(this._userService.signUp());
    this.identity = this._localStorageService.getIdentity();
    this.token = this._localStorageService.getToken();
  }

  public onSubmit() {

    //Conseguir los datos del usuario identificado
    this._userService.signUp(this.user).subscribe(
      response => {
        let identity = response.user;
        
        if (!identity._id) {
          alert("El usuario no esta correctamente identificado");
        } else {
          this.identity = identity;
          
          //Crear elemento ern localstorage para tener al usuario en sesion
          localStorage.setItem('identity', JSON.stringify(identity));

          //conseguir el token para enviarlo a cada peticion http
          this._userService.signUp(this.user, 'true').subscribe(
            response => {
              let token = response.token;
              
              if (token.length <= 0) {
                alert("El token no se ha generado");
              } else {
                this.token = token;
                //Crear elemento ern localstorage para tener el token disponible                
                localStorage.setItem('token',token);

                console.log(token);
                console.log(identity);
                
                
                
              }
            }, error => {
              let errorMessage = <any>error;
              if (errorMessage != null) {
                this.errorMessage = "   " + error.error.message;
                console.log(error)
              }
            }
          );

        }
      }, error => {
        let errorMessage = <any>error;
        if (errorMessage != null) {
          this.errorMessage = "   " + error.error.message;
          console.log(error)
        }
      }
    );


  }

}
