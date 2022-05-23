import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RouterModule } from '@angular/router';
import { UserService } from 'src/app/modules/user/services/user.service';
import { LocalStorageService } from 'src/app/modules/services/local-storage.service';
import { global } from 'src/app/modules/services/path';
import { Artist } from 'src/app/modules/artist/interfaces/artist.interface';
@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
  providers:[UserService]
})
export class ArtistComponent implements OnInit {
  public titulo: string;
  public artist?: Artist[];
  public identity: any;
  public token: string;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _localStorageService: LocalStorageService
  ) {
    this.titulo = "Artistas";
    this.identity = this._localStorageService.getIdentity();
    this.token = this._localStorageService.getToken();
    this.url = global.url;
   }

  ngOnInit(): void {
    console.log("Artist.component.ts cargado");
    //Obtener el listado de artistas
  }

}
