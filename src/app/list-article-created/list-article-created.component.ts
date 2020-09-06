import { Component, OnInit } from '@angular/core';
import Article from "../model/Article";
import { AppService } from "../app.service";
import User from "../model/UserCreate";
import { ArticleService } from "../services/article.service";
import {  Router } from "@angular/router";
import { UserService } from "../services/user.service";
import UserCreate from '../model/UserCreate';


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
    private userService:UserService
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
      this.allMyArticles.forEach((article:Article)=> {
        let idaut = article.auteur;
        let arrayIdAut = new Array();
        arrayIdAut.push(idaut);
        this.userService.getAuteurs(arrayIdAut).subscribe(
          (aut:UserCreate) => {
            console.log(aut); 
            article.auteur = aut[0];
            this.allMyArticles.push(article);
          },
          (error) => console.log(error),)
        });

      // this.route.params.subscribe(
      //   (data) => {
      //     this.articleService.getOneArticle(data.idArticle).subscribe(
      //     (art:Article) => {
      //       console.log(art); 
      //       this.oneArticle = art;
      //       let idaut = art.auteur;
      //       let arrayIdAut = new Array();
      //       arrayIdAut.push(idaut);
      //       this.userService.getAuteurs(arrayIdAut).subscribe(
      //           (aut:UserCreate) => {
      //             console.log(aut); 
      //             this.oneArticle.auteur = aut[0];
      //           },
      //           (error) => console.log(error),)
      //         }
      //       )
      //     },
      //     (error) => console.log(error),
      // );
      

    } else {
      this.router.navigateByUrl("/");
    }
  }
}
