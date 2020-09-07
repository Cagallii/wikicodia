import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from "@angular/forms";
import { ArticleService } from "../services/article.service";
import Article from "../model/Article";
import Language from "../model/Language";
import Framework from "../model/Framework";
import { LanguageService } from "../services/language.service";

import { AppService } from "../app.service";
import User from "../model/UserCreate";
import { Router } from "@angular/router";

import { UserService } from "../services/user.service";
import Category from "../model/Category";
import { CategoryService } from "../services/category.service";
import { FrameworkService } from "../services/framework.service";
import { TypeService } from "../services/type.service";
import Langage from "../model/Language";
import TypeArticle from "../model/TypeArticle";
import { MatSelect,MatSelectChange} from '@angular/material';

import {
  ViewChild,
  ViewChildren,
  QueryList,
  ChangeDetectorRef
} from "@angular/core";
import {
  CdkVirtualScrollViewport,
  ScrollDispatcher
} from "@angular/cdk/scrolling";
import { MatOption } from "@angular/material/core";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-create-article",
  templateUrl: "./create-article.component.html",
  styleUrls: ["./create-article.component.scss"],
})
export class CreateArticleComponent implements OnInit {


  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private app: AppService,
    private router: Router,
    private userService: UserService,
    private categoriesService: CategoryService,
    private frameworkService: FrameworkService,
    private langageService: LanguageService,
    private typeService: TypeService,
  ) {}

  createArticleForm: FormGroup ;
  languagesVersionFormArray:FormArray ;
  newArticle: Article = new Article();


  allLanguages: string[] =new Array();
  allFrameworks: string[] =new Array();
  allType: string[] =new Array();
  allCategory: string[] =new Array();

  // selectedLangLib:string ="";
  // selectedFramLib:string ="";
  // selectedLangVers:string ="";
  // selectedFramVers:string ="";


  // allSelectedLangLib: string[] =new Array();
  // allSelectedFramLib: string[] =new Array();
  // allSelectedLangVers: string[] =new Array();
  // allSelectedFramVers: string[] =new Array();
  autentificated: boolean = false;
  user: User = null;
  // allSelectedLangComplet: Language[] = new Array();
  // allSelectedFramComplet: Framework[] = new Array();

  ngOnInit() {
    if (this.app.authenticated) {
      this.autentificated = this.app.authenticated;
      this.user = this.app.user;
      this.allLanguages = new Array();
      this.allFrameworks = new Array();
      this.allType = new Array();
      this.allCategory = new Array();

      // this.selectedLangLib ="";
      // this.selectedFramLib ="";
      // this.selectedLangVers ="";
      // this.selectedFramVers ="";



      // this.allSelectedLangLib =new Array();
      // this.allSelectedFramLib =new Array();
      // this.allSelectedLangVers =new Array();
      // this.allSelectedFramVers =new Array();
      // this.allSelectedLangComplet = new Array();
      // this.allSelectedFramComplet = new Array();



      this.autentificated = this.app.authenticated;
      this.user = this.app.user;

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


      this.createArticleForm = new FormGroup({
        title: new FormControl("", [Validators.required]),
        // multiSelectControl: new FormControl("", [Validators.required]),
        description: new FormControl("", [
          Validators.required,
          Validators.minLength(30),
        ]),
        type: new FormControl("", [Validators.required]),
        category: new FormControl("", [Validators.required]),
        languages: new FormControl('', [Validators.required]),
        languagesVersion: new FormControl('', [Validators.required]),
        frameworks: new FormControl(''),
        frameworksVersion: new FormControl(''),
        content: new FormControl("", [
          Validators.required,
          Validators.minLength(100),
        ]),
      });
    } else {
      this.router.navigateByUrl("/");
    }
  }

  hasError(controlName: string, errorName: string) {
    return this.createArticleForm.controls[controlName].hasError(errorName);
  }


onCloseMethod(){
  if(this.createArticleForm.controls["frameworks"].value){
      this.createArticleForm.removeControl("frameworksVersion");
      this.createArticleForm.addControl("frameworksVersion",new FormControl('', [Validators.required]))
    }
  else if(!this.createArticleForm.controls["frameworks"].value) {
    this.createArticleForm.removeControl("frameworksVersion");
    this.createArticleForm.addControl("frameworksVersion",new FormControl(''));
  }
  console.log('this.createArticleForm.controls');
  console.log(this.createArticleForm.controls);
}



  onSubmit() {
    if (this.createArticleForm.valid === false) {
      console.log("invalid : !this.createArticleForm.valid  ");
      return;
    } else if (this.app.authenticated) {

    //  if (this.app.authenticated) {
      this.newArticle = new Article();

      this.newArticle.auteur = this.user;
      this.newArticle.description = this.createArticleForm.controls[
        "description"
      ].value;
      this.newArticle.estPromu = false;
      this.newArticle.estPublie = false;
      this.newArticle.estValide = false;
      this.newArticle.titre = this.createArticleForm.controls["title"].value;
      this.newArticle.type = this.createArticleForm.controls["type"].value;
      this.newArticle.vote = null;
      this.newArticle.categorie = this.createArticleForm.controls[
        "category"
      ].value;
      this.newArticle.contenu = this.createArticleForm.controls[
        "content"
      ].value;
      this.newArticle.dateCreation = null;
      this.newArticle.dateDerniereModif = null;
      this.newArticle.comAdmin = null;

      let fram = new Framework();
      fram.framework= this.createArticleForm.controls["frameworks"].value;
      fram.version= this.createArticleForm.controls["frameworksVersion"].value;
      this.newArticle.framework = fram;
      let lang = new Language();
      lang.lang = this.createArticleForm.controls[
        "languages"
      ].value;
      lang.version = this.createArticleForm.controls[
        "languagesVersion"
      ].value;
      this.newArticle.langage = lang;

      this.createArticle(this.newArticle);

    } else {
      console.log("rien :else ");
    }
  }

  onSubmitGlobally() {
    if (this.createArticleForm.valid === false) {
      console.log("invalid : !this.createArticleForm.valid  ");
      return;
    } else if (this.app.authenticated) {
      this.newArticle = new Article();

      this.newArticle.auteur = this.user;
      this.newArticle.description = this.createArticleForm.controls[
        "description"
      ].value;
      this.newArticle.estPromu = false;
      this.newArticle.estPublie = true;
      this.newArticle.estValide = false;
      this.newArticle.titre = this.createArticleForm.controls["title"].value;
      this.newArticle.type = this.createArticleForm.controls["type"].value;
      this.newArticle.vote = null;
      this.newArticle.categorie = this.createArticleForm.controls[
        "category"
      ].value;
      this.newArticle.contenu = this.createArticleForm.controls[
        "content"
      ].value;
      this.newArticle.dateCreation = null;
      this.newArticle.dateDerniereModif = null;

      let fram = new Framework();
      fram.framework= this.createArticleForm.controls["frameworks"].value;
      fram.version= this.createArticleForm.controls["frameworksVersion"].value;
      this.newArticle.framework = fram;
      let lang = new Language();
      lang.lang = this.createArticleForm.controls[
        "languages"
      ].value;
      lang.version = this.createArticleForm.controls[
        "languagesVersion"
      ].value;
      this.newArticle.langage = lang;

      this.createArticle(this.newArticle);

    } else {
      console.log("rien :else ");
    }
  }

  createArticle(article:Article){
    this.articleService.create(article).subscribe(
      (data:Article) => {console.log(data); this.goToArticle(data.idArticle)},
      (error) => console.log(error),
    );

    console.log(article);
  }

  goToArticle(idArticle){
    let params = {idArticle:idArticle}
    this.router.navigate(['articleConsultation', params]);
  }


  onReset() {
    this.createArticleForm.reset();
  }

  onCancel() {
    this.router.navigateByUrl("/");
  }

}
