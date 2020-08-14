import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import User from '../model/User';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {

  autentificated: boolean = false;
  user: User = null;

  constructor(private app: AppService,) {

  }

  ngOnInit() {
    this.autentificated = this.app.authenticated;
    this.user = this.app.user;
  }
  
}
