import { Component, HostBinding, Inject, Renderer2 } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AppService } from "./app.service";
import { DOCUMENT } from '@angular/common';
import Article from './model/Article';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = 'wikicodia';
  listArticles: Article[] = null;
  isPageResult: Boolean;

  constructor(
    private app: AppService,
    private http: HttpClient,
    private router: Router,
    @Inject(DOCUMENT) private document :Document,
    private renderer:Renderer2,
  ) {
    this.app.checkIfLogged();
  }

  ngOnInit() {
    this.router.navigateByUrl("/articleSuggestion");
  }

  switchMode(isDarkMode:boolean){
    // si c'est pas dark alors c'est light donc par défaut c'est light au démarrage
    const hostClass =  isDarkMode ? "theme-dark" : "theme-light";
    this.renderer.setAttribute(this.document.body,'class',hostClass);
    console.log("passage dans appcomponent : switchmode");
  }

  logout() {
    this.http.post("logout", {}).subscribe((response) => {
      //déconnecte l utilisateur et le redirige vers la page d accueil
      this.app.authenticated = false;
      this.router.navigateByUrl("/");
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
