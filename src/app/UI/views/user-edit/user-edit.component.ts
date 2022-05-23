import { Component, OnInit, Sanitizer } from '@angular/core';

import { global } from 'src/app/modules/services/path';
import { UserService } from 'src/app/modules/user/services/user.service';
import { User } from 'src/app/modules/user/interfaces/user.interface';
import { LocalStorageService } from 'src/app/modules/services/local-storage.service';

import { DomSanitizer, 
  SafeResourceUrl, 
  SafeUrl 
} from '@angular/platform-browser';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: 
  [
    UserService,
    LocalStorageService
  ]
})
export class UserEditComponent implements OnInit {
  public titulo: string;
  public user?: User;
  public identity: User;
  public token: string;
  public messageUpdate: string;
  public alertUpdate: string;
  public filesToUpload: Array<File>;
  public url: string;
//
  public safeUrl!: SafeUrl;
//
  constructor(
    private _sanitizer: DomSanitizer,
    private _userService: UserService,
    private _localStorageService: LocalStorageService
  ) 
  {
    this.titulo = 'Actualizar mis datos';    
    this.token = '';    
    this.messageUpdate = '';
    this.alertUpdate = '';    
// LocalStorage
    this.identity = this._localStorageService.getIdentity();
    this.token = this._localStorageService.getToken();
    ;
    this.user = this.identity;
    this.filesToUpload = [];
    this.url = global.url;
  }

  ngOnInit(): void { 
    
    
  }
  onSubmit(){    
    this._userService.updateUser(this.user).subscribe(
      response => {       
        console.log (response) 
        if(!response.user){
          this.alertUpdate = "El usuario no se ha podido actualizar";
        }else{          
          this.alertUpdate = "El usuario se ha actualizado correctamente";         
          localStorage.setItem('identity', JSON.stringify(this.user));
          // window.location.reload();
          
          if(!this.filesToUpload){
            //Redireccion
          }else{
            this.makeFileRequest(this.url +
                                "upload-image-user/" + 
                                this.user?._id,
                                [],
                                this.filesToUpload)
                                .then(
                                  (result: any) => {
                                    this.user!.image = result.image;
                                    this.safeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(
                                      this.url + 'get-image-user/' + this.user!.image
                                  );
                                  localStorage.setItem('identity', JSON.stringify(this.user));
                                  let imagePath = this.url + 'get-image-user/' + this.user!.image;
                                  document.getElementById('image-logger')!.setAttribute('src', imagePath);
                              }
                          );
          }
          this.alertUpdate = "El usuario se ha actualizado correctamente";  
        }

        
      },error => {
        let errorMessage = <any> error;        
        if(errorMessage != ''){
          let body = JSON.parse(error._body);
          this.alertUpdate = body.message;
          console.log(error)
        }

      }
    );
    
  }

  

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>){
    let token = this.token;
    return new Promise(function(resolve, reject){
      let formData: any = new FormData();
      
      //Variable de p[eticiones ajax
      let xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);

      for(let i = 0; i < files.length; i++){
        formData.append('image', files[i], files[i].name);
      }
      xhr.send(formData);

      xhr.onreadystatechange = function(){
        if (xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          }else{
            reject("Errtor al cargar la imagen. \nCompruebe si el formato es correcto");
          }          
        }
      }     
      
    });
  }


}
