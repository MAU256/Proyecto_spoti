
import { Component, OnInit } from '@angular/core';
import { User } from './modules/user/interfaces/user.interface';
import { UserService } from './modules/user/services/user.service';
import { LocalStorageService } from './modules/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    UserService, 
    LocalStorageService
  ]
  // styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
   
  }

}
