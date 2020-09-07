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
  
  ngOnInit(){
    this.router.navigateByUrl('/articleSuggestion');
  }

  logout() {
    this.http.post('logout', {}).subscribe( response => {
      //déconnecte l utilisateur et le redirige vers la page d accueil
      this.app.authenticated = false;
      this.router.navigateByUrl('/');
      window.location.reload();
    });
  }

}
