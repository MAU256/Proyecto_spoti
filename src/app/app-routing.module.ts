import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './UI/views/login/login.component';
import { UserEditComponent } from './UI/views/user-edit/user-edit.component';
import { ArtistComponent } from './UI/views/artist/artist.component';
import { HomeComponent } from './UI/views/home/home.component';
import { ArtistAddComponent } from './UI/views/artist-add/artist-add.component';
import { ArtistEditComponent } from './UI/views/artist-edit/artist-edit.component';
const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/artists/1',
  //   pathMatch: 'full'
  // },
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'artistas/:page', component: ArtistComponent},
  {path: 'crear-artista', component: ArtistAddComponent},
  {path: 'editar-artista/:id', component: ArtistEditComponent},
  {path: 'mis-datos', component: UserEditComponent},
  {path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
 
