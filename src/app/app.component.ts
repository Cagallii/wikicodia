import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wikicodia';

  constructor(private app: AppService, private http: HttpClient, private router: Router) {
    this.app.checkIfLogged();
  }
  
  logout() {
    this.http.post('logout', {}).subscribe( response => {
      //deconnecte l utilisateur et redirige vers la page d acceuille
      this.app.authenticated = false;
      this.router.navigateByUrl('/');
      window.location.reload();
    });
  }

}
