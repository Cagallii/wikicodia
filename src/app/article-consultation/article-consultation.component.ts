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
    private articleService: ArticleService
  ) {}

  gottenArticle: Article;
  autentificated: boolean = false;
  user: User = null;
  nbLike: number =0 ;
  nbDislike: number =0;
  dislikeComment:String;
  likeStatus:boolean = null;

  ngOnInit() {
    this.articleService
      .getOneArticle(1)
      .subscribe((data: Article) => {this.gottenArticle = data; console.log(this.gottenArticle); console.log(data)});


    if (this.app.authenticated) {
      this.autentificated = this.app.authenticated;
      this.user = this.app.user;
      this.nbLike = 0;
      this.nbDislike = 0;
      this.likeStatus = null;

      // on recupere l'article selectionné précédemment et passé en param
      // this.route.params.subscribe(
      //   (data: Article) => (this.gottenArticle = data)
      // );

      this.countLike();

    } else {
      this.router.navigateByUrl("/");
    }
  }

  actionLike(){
    if(this.likeStatus==null){
      this.likeStatus=true;
    }
    else{
      this.likeStatus=!this.likeStatus;
      console.log(this.likeStatus);
    }
  }

  countLike(){
    if (this.gottenArticle.vote != null && this.gottenArticle.vote != undefined && this.gottenArticle.vote.length>0) {
      this.gottenArticle.vote.forEach((v) => {
        if (v.liked) {
          this.nbLike = this.nbLike + 1;
        } else if (!v.liked) {
          this.nbDislike = this.nbDislike + 1;
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

    dialogRef
      .afterClosed()
      .subscribe((data) => {console.log("Dialog output:", data); this.dislikeComment=data;
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

  close() {
    this.dialogRef.close();
  }
}
