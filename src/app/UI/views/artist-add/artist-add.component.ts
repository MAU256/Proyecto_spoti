import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { UserService } from 'src/app/modules/user/services/user.service';
import { LocalStorageService } from 'src/app/modules/services/local-storage.service';
import { global } from 'src/app/modules/services/path';
import { Artist } from 'src/app/modules/artist/interfaces/artist.interface';
import { ArtistService } from 'src/app/modules/artist/services/artist.service';

@Component({
  selector: 'app-artist-add',
  templateUrl: './artist-add.component.html',
  styleUrls: ['./artist-add.component.css'],
  providers:[UserService]
})
export class ArtistAddComponent implements OnInit {
  public titulo: string;
  public artist: Artist;
  public identity: any;
  public token: string;
  public url: string;
  public infoMessage: string;

  constructor
  (
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _localStorageService: LocalStorageService,
    private _artistService: ArtistService,
    

  ) {
    this.titulo = "Crear nuevo artista";
    this.identity = this._localStorageService.getIdentity();
    this.token = this._localStorageService.getToken();
    this.url = global.url;    
    this.artist = {
      name: "",
      description: "",
      image: ""
    }
    this.infoMessage = "";
   }

  ngOnInit(): void {
    console.log("artist-add.component cargado");
    
  }
  onSubmit(){
    console.log(this.artist);
    this.infoMessage = "";
    this._artistService.addArtist(this.token, this.artist).subscribe(
      response => {
        
        if(!response.artist){
         this.infoMessage = "Error en el servidor";
        }else{
          this.artist = response.artist;
          this.infoMessage = "El artista se ha creado correctamente";
          // this._router.navigate(['/editar-artista'], response.artist._id);
        }
      },
      error =>{
        let errorMessage = <any>error;
        if (errorMessage != null) {
          this.infoMessage =  error.error.message;                
        }
      }
    );
  }

}
