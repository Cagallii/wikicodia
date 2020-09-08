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

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnChanges {

  @Input() listArticles;
  @Input() isPageResult;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  url: String;

  ngOnInit() {
    /*this.url = String(this.activatedRoute.snapshot.url);
    if (!this.url.includes("result")){
      this.isPageResult = false;
      console.log("HI");
    }else {
      this.isPageResult = true;
      console.log("HA");
    }
    console.log(this.url);*/
  }

  getCurrentNavigation (){}

  ngOnChanges() {
    this.url = String(this.activatedRoute.snapshot.url);
    if (!this.url.includes("result")){
      this.isPageResult = false;
      console.log("false");
      
    }else {
      this.isPageResult = true;
      console.log("true");
    }
    console.log(this.url);
  }
}
