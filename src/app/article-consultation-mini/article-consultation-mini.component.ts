import { Component, OnInit, Input } from "@angular/core";
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
import { Observable } from "rxjs";

@Component({
  selector: 'app-article-consultation-mini',
  templateUrl: './article-consultation-mini.component.html',
  styleUrls: ['./article-consultation-mini.component.css'],
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
    private voteService: VoteService,
  ) { }

  authenticated: boolean = false;
  adminConnected: boolean = false;
  user: User = null;
  articles: Observable<Article[]>;

  ngOnInit() {
    if (this.app.authenticated) {
      this.authenticated = this.app.authenticated;
      this.user = this.app.user;
      this.oneArticle.idArticle;
      if (this.authenticated && this.app.user.role.role == "admin"){
        this.adminConnected = true;
      }
    } else {
      this.router.navigateByUrl("/");
    }
  }

  goToArticle(idArticle){
    let params = {idArticle:idArticle}
    this.router.navigate(['articleConsultation', params]);
  }

  /**
   * Rejet d'un article par l'admin : l'article repasse au statut "non publié" et n'est visible que par son auteur
   * dans la liste "mes articles". Un commentaire à l'attention de l'auteur de l'article doit être renseigné avant
   * de pouvoir effectuer cette action. 
   * @param id de l'article à rejeter
   */
  rejectArticle(id: number) {
    this.articleService.reject(id)
    .subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log(error)
    );
  }

  /**
   * Validation d'un article par l'admin : l'article devient visible pour tous
   * @param id de l'article à valider
   */
  validateArticle(id: number) {
    this.articleService.validate(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error)
      );
  }

  /**
   * Méthode pour forcer le rafraîchissement du composant list-article-awaiting-validation associé à la route '/articles/pending'
   * après une validation ou un rejet d'article par l'admin
   */
  reloadData() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/articles/pending']);
  }
  

}