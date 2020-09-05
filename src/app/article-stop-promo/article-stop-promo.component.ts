import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../services/article.service";
import Article from "../model/Article";
import { AppService } from '../app.service';
import {  Router } from "@angular/router";
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-article-stop-promo',
  templateUrl: './article-stop-promo.component.html',
  styleUrls: ['./article-stop-promo.component.css']
})
export class ArticleStopPromoComponent implements OnInit {

  promotedArticles : Article[];

  constructor(
    private router: Router,
    private articleService: ArticleService,
    private userService: UserService,
    private app: AppService
  ) { }

  ngOnInit() {
    this.verifyAuthentication();
  }

  verifyAuthentication(){
    
    if (this.app.authenticated && this.app.user.role.role == "admin"){
      this.getFavoriteArticles();
    } else {
      this.router.navigateByUrl("/");
    }
  }

  getFavoriteArticles(){
    this.articleService.getPromotedArticles().subscribe(
      ( data : Article[] ) => {
        
        this.getAuteursAndPushThemIntoArticles(data);
      }
    );
  }

  getAuteursAndPushThemIntoArticles(data){
    var auteurIds = [];
    for(var i = 0 ; i < data.length ; i++){
      auteurIds.push(data[i].auteur);
    }
    
    this.userService.getAuteurs(auteurIds).subscribe(
      response => {
        
        for(var i = 0 ; i < response.length ; i++) {
          data[i].auteur = response[i];
        }
        this.promotedArticles = data;
        console.log(this.promotedArticles);
      }
    )
  }

  goToArticle(idArticle){
    let params = {idArticle:idArticle}
    this.router.navigate(['articleConsultation', params]);
  }

  unPromoteArticle(articleId){
    console.log(articleId);
    this.articleService.setArticlePromotion(articleId).subscribe(
      response => {
        console.log(response);
        this.router.navigateByUrl("/");
      }
    )
  }

}
