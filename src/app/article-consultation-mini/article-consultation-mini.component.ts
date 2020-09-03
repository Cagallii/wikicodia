import { Component, OnInit, Input,Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from "@angular/material/dialog";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import Article from "../model/Article";
import { AppService } from "../app.service";
import User from "../model/UserCreate";
import { UserService } from "../services/user.service";
import Vote from "../model/Vote";
import { ArticleService } from "../services/article.service";
import { VoteService } from "../services/vote.service";

@Component({
  selector: 'app-article-consultation-mini',
  templateUrl: './article-consultation-mini.component.html',
  styleUrls: ['./article-consultation-mini.component.css']
})
export class ArticleConsultationMiniComponent implements OnInit {

  @Input()   oneArticle : Article;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private app: AppService,
    private userService: UserService,
    private articleService: ArticleService,
    private voteService: VoteService
  ) {}

  autentificated: boolean = false;
  user: User = null;


  ngOnInit() {

    if (this.app.authenticated) {
      this.autentificated = this.app.authenticated;
      this.user = this.app.user;
      this.oneArticle.idArticle

    } else {
      this.router.navigateByUrl("/");
    }
  }

  goToArticle(idArticle){
      let params = {idArticle:idArticle}
    this.router.navigate(['articleConsultation', params]);
  }
  

}