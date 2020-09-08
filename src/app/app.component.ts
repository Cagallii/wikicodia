import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import Article from './model/Article';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wikicodia';
  listArticles: Article[] = null;
  isPageResult: Boolean;

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

  sendArticlesSucced(sendArticles){
    this.listArticles = sendArticles;
  }

  sendBoolSucced(isPageResult){
    this.isPageResult = isPageResult;
  }

}
