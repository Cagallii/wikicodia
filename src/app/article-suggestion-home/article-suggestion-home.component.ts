import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../services/article.service";
import { AppService } from '../app.service';
import Article from "../model/Article";
import User from "../model/UserCreate";
// import { timeStamp } from 'console';

@Component({
  selector: 'app-article-suggestion-home',
  templateUrl: './article-suggestion-home.component.html',
  styleUrls: ['./article-suggestion-home.component.css']
})
export class ArticleSuggestionHomeComponent implements OnInit {

  user : User = null;
  articlesAccordingPreferences : Article[] = null;
  promotedArticles : Article[] = null;
  newArticles : Article[] = null;
  authenticated : boolean = false;

  constructor(
    private app: AppService,
    private articleService: ArticleService,
  ) { }

  ngOnInit() {
    if (this.app.authenticated) {
      this.authenticated = this.app.authenticated;
      this.user = this.app.user;
      this.displaySuggestedArticles();
      this.displayPromotedArticles();
      this.displayNewArticles();
    }
  }

  displaySuggestedArticles(){
    
    this.articleService.getArticlesAccordingPreferences(this.user.idUtilisateur).subscribe(
      ( data : Article[] ) => {
        this.articlesAccordingPreferences = data;
      }
    );
     
  }

  displayPromotedArticles(){
    this.articleService.getPromotedArticles().subscribe(
      ( data : Article[] ) => {
        this.promotedArticles = data;
      }
    )
  }

  displayNewArticles(){
    this.articleService.getNewArticles().subscribe(
      ( data : Article[] ) => {
        console.log(data)
        this.newArticles = data;
      }
    )
  }

}
