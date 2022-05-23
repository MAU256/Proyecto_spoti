import { Component, OnInit } from '@angular/core';
import { User } from '../../../modules/user/interfaces/user.interface';
import { UserService } from '../../../modules/user/services/user.service';
import { LocalStorageService } from '../../../modules/services/local-storage.service';
import { global } from 'src/app/modules/services/path';
import { Router, ActivatedRoute, Params, RouterModule } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    UserService,
    LocalStorageService
  ]
})
export class LoginComponent implements OnInit {

  public user?: User;
  public user_register: User;
  public title = 'MusicBlow';
  public identity?: any;
  public token?: string;
  public errorMessage: string = '';
  public alertRegister: string = '';
  public messageRegister:string = '';
  public messageLogin:string = '';
  public url: string;


  constructor(
    private _userService: UserService,
    private _localStorageService: LocalStorageService,
    private _route: ActivatedRoute,
    private _router: Router
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
    this.user_register = {
      _id: '',
      name: '',
      surname: '',
      email: '',
      password: '',
      role: 'ROLE_USER',
      image: ''
    }
    this.url = global.url;

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
                localStorage.setItem('token', token);
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
            }, error => {
              let errorMessage = <any>error;
              if (errorMessage != null) {
                this.errorMessage = "   " + error.error.message;
                this.messageLogin = "ERROR";
              }
            }
          );

        }
      }, error => {
        let errorMessage = <any>error;
        if (errorMessage != null) {
          this.errorMessage = "   " + error.error.message;
          this.messageLogin = "ERROR";
        }
      }
    );


  }

  public logOut() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = '';
    this._router.navigate(['/']);
  }


  onSubmitRegister() {
    console.log(this.user_register);
    this._userService.register(this.user_register).subscribe(
      response => {
        let user = response.user;
        this.user_register = user;
        if (!user._id) {
         this.alertRegister = "Error al registrarse";
          
        } else {
          this.messageRegister = "LISTO"
          this.alertRegister = "El registro se ha realizado correctamente!"
          this.user_register = {
            _id: '',
            name: '',
            surname: '',
            email: '',
            password: '',
            role: 'ROLE_USER',
            image: ''
          }
        }
      }, error => {
        // let body = JSON.parse(error._body);
        let alertRegister = <any>error;
        if (alertRegister != '') {
         this.messageRegister = "ERROR";          
          this.alertRegister = "   " + error.error.message;          
        }
      }
    );

  }

}




