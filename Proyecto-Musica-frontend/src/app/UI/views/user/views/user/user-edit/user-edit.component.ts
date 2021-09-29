import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/domain/user/services/user.service';
import { User } from 'src/app/domain/user/interfaces/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
