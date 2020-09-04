import { Component, OnInit, Inject, AfterViewInit, Renderer2, AfterContentInit, DoCheck } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from "@angular/material/dialog";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router, NavigationStart, Event as NavigationEvent, NavigationEnd } from "@angular/router";
import Article from "../model/Article";
import { AppService } from "../app.service";
import User from "../model/UserCreate";
import { UserService } from "../services/user.service";
import Vote from "../model/Vote";
import { ArticleService } from "../services/article.service";
import { VoteService } from "../services/vote.service";
import * as marked from "marked";
import { DOCUMENT } from '@angular/common';
import * as prism from '../../assets/prismjs/prism.js';

// exemple de récupération de data :

// dans le component précédent:

// goToPlay(){
//   let params = {nomroom:this.objectRoom.nomroom,pwdroom:this.objectRoom.pwdroom}
//   this.router.navigate(['jeu', params], {skipLocationChange:true});
// }

// dans le component ou on utilise les datas :

// ngOnInit(): void {
//   this.route.params.subscribe(data=>this.objectParams=data);
//   });

// }
declare var Prism; 

@Component({
  selector: "app-article-consultation",
  templateUrl: "./article-consultation.component.html",
  styleUrls: ["./article-consultation.component.css"],
})

export class ArticleConsultationComponent implements OnInit, DoCheck {

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private app: AppService,
    private userService: UserService,
    private articleService: ArticleService,
    private voteService: VoteService,
  ) {}

  // oneArticle: Article = this.oneArticle;
  autentificated: boolean = false;
  user: User = null;
  allLike: number = 0;
  allDislike: number = 0;
  dislikeComment: string = null;
  oneArticle:Article;
  isPromoteButtonAvailable:boolean = false;


  ngDoCheck(){
    this.highlight();
  }

  highlight(){
    console.log("highlight launch");
    Prism.highlightAll();
  }

  ngOnInit() {

    if (this.app.authenticated) {
      this.autentificated = this.app.authenticated;
      this.user = this.app.user;
      this.allLike = 0;
      this.allDislike = 0;
      this.dislikeComment = null;

      // on recupere l'article selectionné précédemment et passé en param, penser à modifier aussi dans la fonction refresh
      this.route.params.subscribe(
        (data: Article) => {
          this.oneArticle = data;
        }

      );
      
      this.refreshDataArticle();
    } else {
      this.router.navigateByUrl("/");
    }
  }

  actionLike() {
    var voteOfUser = this.oneArticle.vote.find(
      (vot) => vot.utilisateur.idUtilisateur === this.user.idUtilisateur
    );
    // impossible de liker son propre article
    if (this.oneArticle.auteur.idUtilisateur === this.user.idUtilisateur) {
      console.log("tentative de liker son propre article");
      // return
    }
    // suppression du like si cliqué par quelqu'un l'ayant déjà liké
    else if (voteOfUser) {
      var indexOfVote = this.oneArticle.vote.indexOf(voteOfUser, 0);
      this.oneArticle.vote.splice(indexOfVote, 1);
      this.articleService
        .updateOneArticle(this.oneArticle)
        .subscribe((data) => {
          console.log(data);
          this.refreshDataArticle();
        });
      console.log(this.oneArticle);
    } else {
      this.createVote();
      // this.articleService
      //   .updateOneArticle(this.oneArticle)
      //   .subscribe((data) => {
      //     console.log(data);
      //     this.refreshDataArticle();
      //   });

      console.log(this.user);
      console.log(this.oneArticle);
    }
  }


  actionDislike() {
    var voteOfUser = this.oneArticle.vote.find(
      (vot) => vot.utilisateur.idUtilisateur === this.user.idUtilisateur
    );
    // impossible de liker son propre article
    if (this.oneArticle.auteur.idUtilisateur === this.user.idUtilisateur) {
      console.log("Option 1 : tentative de disliker son propre article");
      // return
    }
    // modification du dislike si cliqué par quelqu'un l'ayant déjà disliké
    else if (voteOfUser && this.dislikeComment!=="cancel") {

      console.log("OPTION 2 : modification du dislike si cliqué par quelqu'un l'ayant déjà disliké");
      var indexOfVote = this.oneArticle.vote.indexOf(voteOfUser, 0);
      var modifiedVote = new Vote();
      modifiedVote.commentaire = this.dislikeComment;
      modifiedVote.liked = false;
      modifiedVote.utilisateur = this.user;
      this.oneArticle.vote.splice(indexOfVote, 1, modifiedVote);
      // this.createVote();
      this.articleService
        .updateOneArticle(this.oneArticle)
        .subscribe((data) => {
          console.log(data);
          this.refreshDataArticle();
        });
      console.log(this.oneArticle);
    } 
        // l'utilisateur clique sur suppression du dislike
    else if(this.dislikeComment==="cancel"){
      console.log("OPTION 3 : utilisateur clique sur suppression du dislike")

      var indexOfVote = this.oneArticle.vote.indexOf(voteOfUser, 0);
      this.oneArticle.vote.splice(indexOfVote, 1);
      this.articleService
      .updateOneArticle(this.oneArticle)
      .subscribe((data) => {
        console.log(data);
        this.refreshDataArticle();
      });
      console.log(this.oneArticle);
    }
    else {
      console.log("OPTION 4 : else final ")
      this.createVote();
      console.log(this.user);
      console.log(this.oneArticle);
    }
  }

  createVote(){
    var newVote = new Vote();
    newVote.commentaire = this.dislikeComment;
    if(this.dislikeComment === null){
      newVote.liked = true;
    }
    else {
      newVote.liked = false;

    }
    newVote.utilisateur = this.user;
    console.log(newVote);
    this.oneArticle.vote.push(newVote);
    this.articleService
    .updateOneArticle(this.oneArticle)
    .subscribe((data) => {
      console.log(data);
      this.refreshDataArticle();
    });
  }

  refreshDataArticle() {
    this.articleService.getOneArticle(this.oneArticle.idArticle).subscribe((data: Article) => {
      this.oneArticle = data;
  
      if (this.oneArticle.contenu && this.oneArticle.contenu.length > 0) {
        this.oneArticle.contenu = marked(this.oneArticle.contenu);
      }
      
      if(this.user.role.role == "admin" && this.oneArticle.estPromu == false){
        this.isPromoteButtonAvailable = true;
      } else {
        this.isPromoteButtonAvailable = false;
      }
      console.log(this.oneArticle);
      console.log("data from refresh :");
      console.log(data);
      this.refreshLikeArticle();
    });
  }

  refreshLikeArticle() {
    this.allLike = 0;
    this.allDislike = 0;
    this.dislikeComment = null;

    if (
      this.oneArticle.vote !== null &&
      this.oneArticle.vote !== undefined &&
      this.oneArticle.vote.length !== 0
    ) {
      this.oneArticle.vote.forEach((v) => {
        if (v.liked === true) {
          this.allLike = this.allLike + 1;
        } else if (v.liked === false) {
          this.allDislike = this.allDislike + 1;
        } else {
          console.log("soucis en lien avec les votes");
        }
      });
    }
  }

  // fonction qui gère la fenetre pop up de like dislike
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "50%";

    // dialogConfig.data = {
    //   id: 1,
    //   title: 'Angular For Beginners'
    // };

    this.dialog.open(ArticleConsultationComponentDialog, dialogConfig);

    const dialogRef = this.dialog.open(
      ArticleConsultationComponentDialog,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((data) => {
      console.log("Dialog output:", data);
      this.dislikeComment = data.raisonDislike;
      this.actionDislike();
    });
  }

  promoteArticle(articleId : Number){
    console.log(articleId);
    this.articleService.setArticlePromotion(articleId).subscribe(
      response => {
        console.log(response);
        this.router.navigateByUrl("/");
      }
    )
  }

}

@Component({
  selector: "app-article-consultation-dialog",
  templateUrl: "article-consultation-dialog.html",
  styleUrls: ["./article-consultation.component.css"],
})
export class ArticleConsultationComponentDialog {
  form: FormGroup;
  // depreciated:boolean;
  // doesntwork:boolean;
  // otherreason:boolean;
  // description:string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ArticleConsultationComponentDialog>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    // depreciated = data.depreciated;
    // doesntwork = data.doesntwork;
    // this.otherreason = data.otherreason;
    // this.description = data.description;
  }

  ngOnInit() {
    this.form = this.fb.group({
      raisonDislike: [""],
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  cancelPreviousDislike() {
    this.dialogRef.close("cancel");
  }

  close() {
    this.dialogRef.close();
  }
}
