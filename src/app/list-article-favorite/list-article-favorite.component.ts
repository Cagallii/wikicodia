import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import Article from "../model/Article";
import User from "../model/UserCreate";
import { ArticleService } from "../services/article.service";
import {  Router } from "@angular/router";

@Component({
  selector: 'app-list-article-favorite',
  templateUrl: './list-article-favorite.component.html',
  styleUrls: ['./list-article-favorite.component.scss']
})
export class ListArticleFavoriteComponent implements OnInit {

  articlesFavoris : Article[];
  allMyArticles:Article[];
  autentificated: boolean = false;
  user: User = null;
  constructor(
    private router: Router,
    private app: AppService,
    private articleService: ArticleService,
  ) { }

  ngOnInit() {
    this.displayArticles();
  }

  displayArticles(){
    
    //this.articlesFavoris = this.app.user.articlesFavoris;
    if (this.app.authenticated) {
      this.autentificated = this.app.authenticated;
      this.user = this.app.user;
      this.allMyArticles= new Array() ;
      this.articleService.getMyFavoriteArticles(this.user.idUtilisateur).subscribe((data:Article[])=>this.articlesFavoris=data);
    } else {
      this.router.navigateByUrl("/");
    }
  }
}
