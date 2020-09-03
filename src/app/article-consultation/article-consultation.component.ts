import { Component, OnInit, Inject } from "@angular/core";
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

@Component({
  selector: "app-article-consultation",
  templateUrl: "./article-consultation.component.html",
  styleUrls: ["./article-consultation.component.css"],
})
export class ArticleConsultationComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private app: AppService,
    private userService: UserService,
    private articleService: ArticleService,
    private voteService: VoteService
  ) {}

  gottenArticle: Article;
  autentificated: boolean = false;
  user: User = null;
  allLike: number = 0;
  allDislike: number = 0;
  dislikeComment: string = null;

  ngOnInit() {
    // this.articleService
    //   .getOneArticle(1)
    //   .subscribe((data: Article) => {this.gottenArticle = data; console.log(this.gottenArticle); console.log(data)});

    if (this.app.authenticated) {
      this.autentificated = this.app.authenticated;
      this.user = this.app.user;
      this.allLike = 0;
      this.allDislike = 0;
      this.dislikeComment = null;

      // on recupere l'article selectionné précédemment et passé en param, penser à modifier aussi dans la fonction refresh
      // this.route.params.subscribe(
      //   (data: Article) => (this.gottenArticle = data)
      // );

      this.refreshDataArticle();
    } else {
      this.router.navigateByUrl("/");
    }
  }

  actionLike() {
    var voteOfUser = this.gottenArticle.vote.find(
      (vot) => vot.utilisateur.idUtilisateur === this.user.idUtilisateur
    );
    // impossible de liker son propre article
    if (this.gottenArticle.auteur.idUtilisateur === this.user.idUtilisateur) {
      console.log("tentative de liker son propre article");
      // return
    }
    // suppression du like si cliqué par quelqu'un l'ayant déjà liké
    else if (voteOfUser) {
      var indexOfVote = this.gottenArticle.vote.indexOf(voteOfUser, 0);
      this.gottenArticle.vote.splice(indexOfVote, 1);
      this.articleService
        .updateOneArticle(this.gottenArticle)
        .subscribe((data) => {
          console.log(data);
          this.refreshDataArticle();
        });
      console.log(this.gottenArticle);
    } else {
      this.createVote();
      // this.articleService
      //   .updateOneArticle(this.gottenArticle)
      //   .subscribe((data) => {
      //     console.log(data);
      //     this.refreshDataArticle();
      //   });

      console.log(this.user);
      console.log(this.gottenArticle);
    }
  }


  actionDislike() {
    var voteOfUser = this.gottenArticle.vote.find(
      (vot) => vot.utilisateur.idUtilisateur === this.user.idUtilisateur
    );
    // impossible de liker son propre article
    if (this.gottenArticle.auteur.idUtilisateur === this.user.idUtilisateur) {
      console.log("Option 1 : tentative de disliker son propre article");
      // return
    }
    // modification du dislike si cliqué par quelqu'un l'ayant déjà disliké
    else if (voteOfUser && this.dislikeComment!=="cancel") {

      console.log("OPTION 2 : modification du dislike si cliqué par quelqu'un l'ayant déjà disliké");
      var indexOfVote = this.gottenArticle.vote.indexOf(voteOfUser, 0);
      var modifiedVote = new Vote();
      modifiedVote.commentaire = this.dislikeComment;
      modifiedVote.liked = false;
      modifiedVote.utilisateur = this.user;
      this.gottenArticle.vote.splice(indexOfVote, 1, modifiedVote);
      // this.createVote();
      this.articleService
        .updateOneArticle(this.gottenArticle)
        .subscribe((data) => {
          console.log(data);
          this.refreshDataArticle();
        });
      console.log(this.gottenArticle);
    } 
        // l'utilisateur clique sur suppression du dislike
    else if(this.dislikeComment==="cancel"){
      console.log("OPTION 3 : utilisateur clique sur suppression du dislike")

      var indexOfVote = this.gottenArticle.vote.indexOf(voteOfUser, 0);
      this.gottenArticle.vote.splice(indexOfVote, 1);
      this.articleService
      .updateOneArticle(this.gottenArticle)
      .subscribe((data) => {
        console.log(data);
        this.refreshDataArticle();
      });
      console.log(this.gottenArticle);
    }
    else {

      console.log("OPTION 4 : else final ")

      this.createVote();
      // this.articleService
      //   .updateOneArticle(this.gottenArticle)
      //   .subscribe((data) => {
      //     console.log(data);
      //     this.refreshDataArticle();
      //   });

      console.log(this.user);
      console.log(this.gottenArticle);
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
    this.gottenArticle.vote.push(newVote);
    this.articleService
    .updateOneArticle(this.gottenArticle)
    .subscribe((data) => {
      console.log(data);
      this.refreshDataArticle();
    });
  }

  refreshDataArticle() {
    this.articleService.getOneArticle(1).subscribe((data: Article) => {
      this.gottenArticle = data;
      console.log(this.gottenArticle);
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
      this.gottenArticle.vote !== null &&
      this.gottenArticle.vote !== undefined &&
      this.gottenArticle.vote.length !== 0
    ) {
      this.gottenArticle.vote.forEach((v) => {
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
