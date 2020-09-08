import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { AppService } from '../app.service';
import { AppComponent } from '../app.component';
import User from '../model/UserCreate';
import { MatSlideToggleChange } from '@angular/material';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {
  
  user: User = null;
  authenticated: boolean = false;
  adminConnected: boolean = false;
  regularUserConnected: boolean = false;

  @Output()
  readonly darkModeSwitched = new EventEmitter<boolean>();

  constructor(
    private appComp: AppComponent,
    private app: AppService
    ) 
    {}

  ngOnInit() {
     
  }

  onDarkModeSwitchedFromMenu({checked}:MatSlideToggleChange){
    this.darkModeSwitched.emit(checked);
    console.log("passage dans menucomponent : onDarkModeSwitched");
  }

  switchDisplay(){
    console.log(this.app.user);
    this.authenticated = this.app.authenticated;
    this.user = this.app.user;
    
    if (this.authenticated && this.app.user.role.role == "admin"){
      this.adminConnected = true;
    } else {
      this.adminConnected = false;
    }

  }

  logout(){
    this.appComp.logout();
  }
}
