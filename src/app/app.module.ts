import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './UI/views/login/login.component';
import { UserEditComponent } from './UI/views/user-edit/user-edit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ArtistComponent } from './UI/views/artist/artist.component';
import { HomeComponent } from './UI/views/home/home.component';
import { ArtistAddComponent } from './UI/views/artist-add/artist-add.component';
import { ArtistEditComponent } from './UI/views/artist-edit/artist-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserEditComponent,
    ArtistComponent,
    HomeComponent,
    ArtistAddComponent,
    ArtistEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
