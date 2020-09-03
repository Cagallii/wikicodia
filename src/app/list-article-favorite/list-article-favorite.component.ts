import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-list-article-favorite',
  templateUrl: './list-article-favorite.component.html',
  styleUrls: ['./list-article-favorite.component.scss']
})
export class ListArticleFavoriteComponent implements OnInit {

  articlesFavoris : any;

  constructor(
    private app: AppService
  ) { }

  ngOnInit() {
    this.displayArticles();
  }

  displayArticles(){
    console.log(this.app);
    //this.articlesFavoris = this.app.articlesFavoris
  }
}
