import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { ArticleService } from '../services/article.service';
import { AppService } from "../app.service";
import Article from './../model/Article'
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-article-awaiting-validation',
  templateUrl: './list-article-awaiting-validation.component.html',
  styleUrls: ['./list-article-awaiting-validation.component.css']
})
export class ListArticleAwaitingValidationComponent implements OnInit {

  allMyArticles:Article[];
  authenticated: boolean = false;

  constructor(private articleService: ArticleService, private router: Router, private app: AppService) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    if (this.app.authenticated) {
        this.authenticated = this.app.authenticated;
        this.allMyArticles= new Array() ;
        this.articleService.getArticlesAwaitingValidation().subscribe((data:Article[])=>this.allMyArticles=data);
    } else {
      this.router.navigateByUrl("/");
    }
  }
  
}
