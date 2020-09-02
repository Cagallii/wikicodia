import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { ArticleService } from '../services/article.service';
import Article from './../model/Article'
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-article-awaiting-validation',
  templateUrl: './list-article-awaiting-validation.component.html',
  styleUrls: ['./list-article-awaiting-validation.component.css']
})
export class ListArticleAwaitingValidationComponent implements OnInit {

  articles: Observable<Article[]>;

  constructor(private articleService: ArticleService, private router: Router) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.articles = this.articleService.getArticlesAwaitingValidation();
  }

  /*
  deleteArticle(id: number) {
    this.articleService.delete(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
  */

}
