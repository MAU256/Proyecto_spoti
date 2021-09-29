
import { Component, OnInit } from '@angular/core';
import { User } from './domain/user/interfaces/user';
import { UserService } from './domain/user/services/user.service';
import { LocalStorageService } from './domain/services/local-storage.service';

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
  ngOnInit(): void {
   
  }

}
