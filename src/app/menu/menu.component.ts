import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { AppComponent } from '../app.component';
import User from '../model/UserCreate';
import { on } from 'process';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  authenticated: boolean = false;
  user: User = null;
  mustBeHidden: boolean = true;

  constructor(
    private appComp: AppComponent,
    private app: AppService
    ) 
    {}

  ngOnInit() {
    
    
    
  }

  switchDisplay(){
    console.log(this.app.user);
    this.authenticated = this.app.authenticated;
    this.user = this.app.user;
    
    if (this.app.user.role.role == "admin"){
      this.mustBeHidden = false;
    } else {
      this.mustBeHidden = true;
    }
  }

  logout(){
    this.appComp.logout();
  }
}
