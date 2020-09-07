import {
  Component,
  OnInit,
  Inject,
  AfterViewInit,
  Renderer2,
  AfterContentInit,
  DoCheck,
  AfterViewChecked,
} from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig,
} from "@angular/material/dialog";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  ActivatedRoute,
  Router,
  NavigationStart,
  Event as NavigationEvent,
  NavigationEnd,
} from "@angular/router";
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
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Location } from '@angular/common';
import UserCreate from "../model/UserCreate";
import {
  FormArray,
  Validators,
  FormControl,
} from "@angular/forms";
import Language from "../model/Language";
import Framework from "../model/Framework";
import { LanguageService } from "../services/language.service";
import Category from "../model/Category";
import { CategoryService } from "../services/category.service";
import { FrameworkService } from "../services/framework.service";
import { TypeService } from "../services/type.service";
import Langage from "../model/Language";
import TypeArticle from "../model/TypeArticle";
import { throwError } from 'rxjs';


@Component({
  selector: 'app-article-modification',
  templateUrl: './article-modification.component.html',
  styleUrls: ['./article-modification.component.css']
})
export class ArticleModificationComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private voteService: VoteService,
    private sanitizer: DomSanitizer,
    private location: Location,
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private app: AppService,
    private router: Router,
    private userService: UserService,
    private categoriesService: CategoryService,
    private frameworkService: FrameworkService,
    private langageService: LanguageService,
    private typeService: TypeService,
  ) { }

  autentificated: boolean = false;
  newArticle: Article = new Article();
  user: User = null;
  oneArticle: Article;
  isPromoteButtonAvailable: boolean = false;
  mardownContenu: SafeHtml;
  modifyArticleForm: FormGroup ;
  allLanguages: string[] =new Array();
  allFrameworks: string[] =new Array();
  allType: string[] =new Array();
  allCategory: string[] =new Array();
  valueUpdated:boolean = false;
  // selectedLangLib:string ="";
  // selectedFramLib:string ="";
  // selectedLangVers:string ="";
  // selectedFramVers:string ="";
  isUnpublishButtonAvailable: boolean = false;
  isPublishButtonAvailable: boolean = false;

  ngOnInit() {
    if (this.app.authenticated) {
      this.autentificated = this.app.authenticated;
      this.user = this.app.user;
      this.valueUpdated = false;
      this.oneArticle = new Article();
      this.newArticle = new Article();

      if (!this.oneArticle.estPromu){
        this.isPromoteButtonAvailable = true;
      }
      this.isUnpublishButtonAvailable = false;
      this.isPublishButtonAvailable = false;
      this.allLanguages = new Array();
      this.allFrameworks = new Array();
      this.allType = new Array();
      this.allCategory = new Array();

      // this.selectedLangLib ="";
      // this.selectedFramLib ="";
      // this.selectedLangVers ="";
      // this.selectedFramVers ="";

      this.langageService.getAll().subscribe((data: Langage[]) => {
        data.forEach((lang:Language) => {
          this.allLanguages.push(lang.lang);
        });
      });
      this.frameworkService.getAll().subscribe((data: Framework[]) =>
        data.forEach((fram:Framework) => {
          this.allFrameworks.push(fram.framework);
        })
      );
      this.categoriesService.getAll().subscribe((data: Category[]) =>
        data.forEach((cat:Category) => {
          this.allCategory.push(cat.libCategorie);
        })
      );
      this.typeService.getAll().subscribe((data: TypeArticle[]) =>
        data.forEach((typ:TypeArticle) => {
          this.allType.push(typ.libType);
        })
      );

      this.modifyArticleForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [
          Validators.required,
          Validators.minLength(30),
        ]),
        type: new FormControl('', [Validators.required]),
        category: new FormControl('', [Validators.required]),
        languages: new FormControl('', [Validators.required]),
        languagesVersion: new FormControl('', [Validators.required]),
        frameworks: new FormControl(''),
        frameworksVersion: new FormControl(''),
        content: new FormControl('', [
          Validators.required,
          Validators.minLength(100),
        ]),
      });

      // on recupere l'article selectionné précédemment et passé en param, penser à modifier aussi dans la fonction refresh
      this.route.params.subscribe(
        (data) => {
          console.log(
            "AAAAAAAAA data du param de routing data['idArticle'] : "
          );
          let idart: number = data["idArticle"];
          console.log(idart);

          this.articleService.getOneArticle(idart).subscribe(
            (data: Article) => {
              this.oneArticle = data;
              console.log(data);
              this.refreshDataArticle();
              this.setValuesIntoForm();
            },
            (error) => console.log(error)
          );
        },
        (error) => console.log(error)
      );
    } else {
      this.router.navigateByUrl("/");
    }

    
  }


  hasError(controlName: string, errorName: string) {
    return this.modifyArticleForm.controls[controlName].hasError(errorName);
  }

  setValuesIntoForm(){
    console.log("BBBBBBBBBBBBBBBBBBB BBBBBBB BBBBBB BBB BB B")
    this.modifyArticleForm.controls["title"].setValue(this.oneArticle.titre);
    this.modifyArticleForm.controls["description"].setValue(this.oneArticle.description);
    this.modifyArticleForm.controls["type"].setValue(this.oneArticle.type.libType);
    this.modifyArticleForm.controls["category"].setValue(this.oneArticle.categorie.libCategorie);
    this.modifyArticleForm.controls["languages"].setValue(this.oneArticle.langage.lang);
    this.modifyArticleForm.controls["languagesVersion"].setValue(this.oneArticle.langage.version);
    this.modifyArticleForm.controls["content"].setValue(this.oneArticle.contenu);

  if(this.oneArticle.framework.framework){
    this.modifyArticleForm.controls["frameworks"].setValue(this.oneArticle.framework.framework);
    this.modifyArticleForm.controls["frameworksVersion"].setValue(this.oneArticle.framework.version);
  }
  this.valueUpdated = true;
}

onCloseMethod(){
  if(this.modifyArticleForm.controls["frameworks"].value){
      this.modifyArticleForm.removeControl("frameworksVersion");
      this.modifyArticleForm.addControl("frameworksVersion",new FormControl('', [Validators.required]))
    }
  else if(!this.modifyArticleForm.controls["frameworks"].value) {
    this.modifyArticleForm.removeControl("frameworksVersion");
    this.modifyArticleForm.addControl("frameworksVersion",new FormControl(''));
  }
  console.log('this.modifyArticleForm.controls');
  console.log(this.modifyArticleForm.controls);
}

onSubmit() {
  if (this.modifyArticleForm.valid === false) {
    console.log("invalid : !this.modifyArticleForm.valid  ");
    return;
  } else if (this.app.authenticated) {

  //  if (this.app.authenticated) {
    this.newArticle = new Article();
    this.newArticle = this.oneArticle;
    this.newArticle.auteur = this.user;
    this.newArticle.description = this.modifyArticleForm.controls[
      "description"
    ].value;
    this.newArticle.estPromu = false;
    this.newArticle.estPublie = false;
    this.newArticle.estValide = false;
    this.newArticle.titre = this.modifyArticleForm.controls["title"].value;
    this.newArticle.type = this.modifyArticleForm.controls["type"].value;
    this.newArticle.vote = null;
    this.newArticle.categorie = this.modifyArticleForm.controls[
      "category"
    ].value;
    this.newArticle.contenu = this.modifyArticleForm.controls[
      "content"
    ].value;
    this.newArticle.dateCreation = null;
    this.newArticle.dateDerniereModif = null;
    this.newArticle.comAdmin = null;

    let fram = new Framework();
    fram.framework= this.modifyArticleForm.controls["frameworks"].value;
    fram.version= this.modifyArticleForm.controls["frameworksVersion"].value;
    this.newArticle.framework = fram;
    let lang = new Language();
    lang.lang = this.modifyArticleForm.controls[
      "languages"
    ].value;
    lang.version = this.modifyArticleForm.controls[
      "languagesVersion"
    ].value;
    this.newArticle.langage = lang;

    this.updateArticle(this.newArticle);

  } else {
    console.log("rien :else ");
  }
}

onSubmitGlobally() {
  if (this.modifyArticleForm.valid === false) {
    console.log("invalid : !this.modifyArticleForm.valid  ");
    return;
  } else if (this.app.authenticated) {
    this.newArticle = new Article();
    this.newArticle = this.oneArticle;

    this.newArticle.auteur = this.user;
    this.newArticle.description = this.modifyArticleForm.controls[
      "description"
    ].value;
    this.newArticle.estPromu = false;
    this.newArticle.estPublie = true;
    this.newArticle.estValide = false;
    this.newArticle.titre = this.modifyArticleForm.controls["title"].value;
    this.newArticle.type = this.modifyArticleForm.controls["type"].value;
    this.newArticle.vote = null;
    this.newArticle.categorie = this.modifyArticleForm.controls[
      "category"
    ].value;
    this.newArticle.contenu = this.modifyArticleForm.controls[
      "content"
    ].value;
    this.newArticle.dateCreation = null;
    this.newArticle.dateDerniereModif = null;

    let fram = new Framework();
    fram.framework= this.modifyArticleForm.controls["frameworks"].value;
    fram.version= this.modifyArticleForm.controls["frameworksVersion"].value;
    this.newArticle.framework = fram;
    let lang = new Language();
    lang.lang = this.modifyArticleForm.controls[
      "languages"
    ].value;
    lang.version = this.modifyArticleForm.controls[
      "languagesVersion"
    ].value;
    this.newArticle.langage = lang;

    this.updateArticle(this.newArticle);

  } else {
    console.log("rien :else ");
  }
}

updateArticle(article:Article){
  this.articleService.updateOneArticle(article).subscribe((data:Article) => 
    (data:Article) => {console.log(data); this.goToArticle(data.idArticle);this.goToArticle(data.idArticle)},
    (error) => console.log(error),
  );

}

goToArticle(idArticle){
  let params = {idArticle:idArticle}
  this.router.navigate(['articleConsultation', params]);
}

onReset() {
  this.modifyArticleForm.reset();
}

onCancel() {
  this.router.navigateByUrl("/");
}

  publishArticle() {
    // if(this.oneArticle.)
    console.log("publish cliked");
    this.oneArticle.estPublie = true;
    this.articleService
    .updateOneArticle(this.oneArticle)
    .subscribe((data) => {
      console.log(data);
      this.refreshDataArticle();
    });
  }

  unpublishArticle() {
    console.log("unpublish cliked");
    this.oneArticle.estPublie = false;
    this.articleService
    .updateOneArticle(this.oneArticle)
    .subscribe((data) => {
      console.log(data);
      this.refreshDataArticle();
    });
  }

  formatDataWithAuteur(idarticle) {
    this.articleService.getOneArticle(idarticle).subscribe((art: Article) => {
      console.log(art);
      this.oneArticle = art;
      let idaut = art.auteur;
      let arrayIdAut = new Array();
      arrayIdAut.push(idaut);
      this.userService.getAuteurs(arrayIdAut).subscribe(
        (aut: UserCreate) => {
          console.log(aut);
          this.oneArticle.auteur = aut[0];
        },
        (error) => console.log(error)
      );
    });
  }


  refreshDataArticle() {
    // this.articleService.getOneArticle(this.oneArticle.idArticle).subscribe((data: Article) => {
    // this.oneArticle = data;
    this.formatDataWithAuteur(this.oneArticle.idArticle);

    if (this.oneArticle.contenu && this.oneArticle.contenu.length > 0) {
      this.mardownContenu = this.sanitizer.bypassSecurityTrustHtml(
        marked(this.oneArticle.contenu)
      );
    }

    if (this.user.role.role == "admin" && this.oneArticle.estPromu == false) {
      this.isPromoteButtonAvailable = true;
    } else {
      this.isPromoteButtonAvailable = false;
    }
    console.log(this.oneArticle);
    console.log("data from refresh :");
    // console.log(data);

    if(this.oneArticle.estPublie===true){
      this.isUnpublishButtonAvailable = true;
      this.isPublishButtonAvailable = false;
    } else {
      this.isUnpublishButtonAvailable = false;
      this.isPublishButtonAvailable = true;
    }

  }

  

  promoteArticle(articleId: Number) {
    console.log(articleId);
    this.articleService.setArticlePromotion(articleId).subscribe((response) => {
      console.log(response);
      this.router.navigateByUrl("/");
    });
  }

  /**
   * Retour à la pgae précédente au clic sur "Revenir à la liste"
   */
  goBack() {
    this.location.back();
  }
}