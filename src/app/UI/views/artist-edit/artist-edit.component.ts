import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/modules/user/services/user.service';
import { LocalStorageService } from 'src/app/modules/services/local-storage.service';
import { global } from 'src/app/modules/services/path';
import { Artist } from 'src/app/modules/artist/interfaces/artist.interface';
import { ArtistService } from 'src/app/modules/artist/services/artist.service';


@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-edit.component.html',
  styleUrls: ['./artist-edit.component.css']
})
export class ArtistEditComponent implements OnInit {
  public titulo: string;
  public artist: Artist;
  public identity: any;
  public token: string;
  public url: string;
  public infoMessage: string;
  public is_edit: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _localStorageService: LocalStorageService,
    private _artistService: ArtistService,
  ) {
    this.titulo = "Editar artista";
    this.identity = this._localStorageService.getIdentity();
    this.token = this._localStorageService.getToken();
    this.url = global.url;

    this.artist = {
      name: "",
      description: "",
      image: ""
    }
    this.infoMessage = "";
    this.is_edit = true;
  }

  ngOnInit(): void {
    console.log("artist-edit ha sido cargado");
    this.getArtist();
    //llamar al metodo del api para sacar un artista con base a su id

  }

  // fileChangeEvent(fileInput: any){
  //   this.filesToUpload = <Array<File>>fileInput.target.files;
  // }

  getArtist() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._artistService.getArtist(this.token, id).subscribe(
        response => {

          if (!response.artist) {
            this._router.navigate(['/']);
          } else {
            this.artist = response.artist;
          }
        },
        error => {
          let errorMessage = <any>error;
          if (errorMessage != null) {
            this.infoMessage = error.error.message;
          }
        }
      );
    });
  }

  onSubmit() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._artistService.editArtist(this.token, id, this.artist).subscribe(
        response => {

          if (!response.artist) {
            this.infoMessage = "Error en el servidor";
          } else {            
            this.infoMessage = "El artista se ha actualizado correctamente";
            // this._router.navigate(['/editar-artista'], response.artist._id);
          }
        },
        error => {
          let errorMessage = <any>error;
          if (errorMessage != null) {
            this.infoMessage = error.error.message;
          }
        }
      );
    });
  }



}
