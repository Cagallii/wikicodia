import { Component, OnInit, Input,Inject, AfterViewChecked, OnChanges } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import Article from "../model/Article";
import { AppService } from "../app.service";
import User from "../model/UserCreate";
import { UserService } from "../services/user.service";
import { ArticleService } from "../services/article.service";
import { VoteService } from "../services/vote.service";
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  public listArticles: Article[];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private searchService : SearchService,
  ) {}

  url: String;

  ngOnInit() {
    this.searchService.searchData.subscribe(articles =>
      this.listArticles = articles,
      console.log(this.listArticles));
     
  }
}
