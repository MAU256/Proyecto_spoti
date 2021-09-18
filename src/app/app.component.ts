import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})
export class AppComponent {
   
  public user: User;
  public title = 'MusicBlow';
  public identity: any;
  public token: string;

  constructor(){
    this.user = new User('','','','','','ROLE_USER','');
    this.identity = false;
    this.token = '';
  }
  
  
}
