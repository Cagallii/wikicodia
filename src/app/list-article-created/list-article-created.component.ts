import { Component, OnInit } from '@angular/core';
import Article from "../model/Article";
import { AppService } from "../app.service";
import User from "../model/UserCreate";
import { ArticleService } from "../services/article.service";
import {  Router } from "@angular/router";


@Component({
  selector: 'app-list-article-created',
  templateUrl: './list-article-created.component.html',
  styleUrls: ['./list-article-created.component.css']
})
export class ListArticleCreatedComponent implements OnInit {

  constructor(
    private router: Router,
    private app: AppService,
    private articleService: ArticleService,
  ) { }

  allMyArticles:Article[];
  autentificated: boolean = false;
  user: User = null;


  ngOnInit() {

    if (this.app.authenticated) {
      this.autentificated = this.app.authenticated;
      this.user = this.app.user;
      this.allMyArticles= new Array() ;
      this.articleService.getAllMyArticles(this.user.idUtilisateur).subscribe((data:Article[])=>this.allMyArticles=data);
    } else {
      this.router.navigateByUrl("/");
    }
  }
}
