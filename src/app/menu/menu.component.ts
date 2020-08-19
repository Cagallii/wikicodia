import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private app: AppComponent) { }

  ngOnInit() {
  }

  logout(){
    this.app.logout();
  }
}
