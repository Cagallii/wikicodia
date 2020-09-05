import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
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
  styleUrls: ["./create-article.component.css"],
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

  createArticleForm: FormGroup;
  newArticle: Article = new Article();

  // fwAndLangAndVersionSelected: Boolean = false;

  isLangSelected:boolean =false;
  isFramSelected:boolean=false;

  allLanguages: string[] =new Array();
  allFrameworks: string[] =new Array();
  allType: string[] =new Array();
  allCategory: string[] =new Array();
  allSelectedLangLib: string[] =new Array();
  allSelectedFramLib: string[] =new Array();
  allSelectedLangVers: string[] =new Array();
  allSelectedFramVers: string[] =new Array();
  autentificated: boolean = false;
  user: User = null;
  allSelectedLangComplet: Language[] = new Array();
  allSelectedFramComplet: Framework[] = new Array();

  ngOnInit() {
    if (this.app.authenticated) {
      this.autentificated = this.app.authenticated;
      this.user = this.app.user;
      this.allLanguages = new Array();
      this.allFrameworks = new Array();
      this.allType = new Array();
      this.allCategory = new Array();

      this.allSelectedLangLib =new Array();
      this.allSelectedFramLib =new Array();
      this.allSelectedLangVers =new Array();
      this.allSelectedFramVers =new Array();
      this.allSelectedLangComplet = new Array();
      this.allSelectedFramComplet = new Array();

      this.isLangSelected =false;
      this.isFramSelected=false;

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
        multiSelectControl: new FormControl("", [Validators.required]),
        description: new FormControl("", [
          Validators.required,
          Validators.minLength(100),
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


  openChange($event: boolean) {
    if ($event) {
console.log(this.createArticleForm.controls["languages"].value.length)    
}
  }

  onCloseMethod(){
    if(this.createArticleForm.controls["languages"].valid){
      this.allSelectedLangLib = new Array();
      this.createArticleForm.controls["languages"].value.forEach(langlib => {
        this.allSelectedLangLib.push(langlib);
      });
    }

    if(this.createArticleForm.controls["frameworks"].value.length>0){
      this.allSelectedFramLib = new Array();
      this.createArticleForm.controls["frameworks"].value.forEach(framlib => {
        this.allSelectedFramLib.push(framlib);
      });
    }

    console.log(this.allSelectedLangLib);
    console.log(this.allSelectedFramLib);
  }


  addVersion(){

  }

  // getErrorMessage() {
  //   if (this.createArticleForm.value.title.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.createArticleForm.value.title.hasError('email') ? 'Not a valid email' : '';
  // }

  // addOneLanguage() {
  //   let newLang = new Language();
  //   if (this.selectedLang && this.selectedLangVersion) {
  //     newLang.lang = this.selectedLang.toLowerCase();
  //     newLang.version = this.selectedLangVersion.toLowerCase();
  //     this.allSelectedLangComplet.push(newLang);
  //     // console.log(this.allSelectedLangComplet);
  //   } else {
  //     return;
  //   }
  // }

  // removeOneLanguage(lang) {
  //   // console.log(this.allSelectedLangComplet.indexOf(lang));
  //   this.allSelectedLangComplet.splice(this.allSelectedLangComplet.indexOf(lang), 1);
  // }

  // addOneFramework() {
  //   let newFram = new Framework();
  //   if (this.selectedFram && this.selectedFramVersion) {
  //     newFram.framework = this.selectedFram.toLowerCase();
  //     newFram.version = this.selectedFramVersion.toLowerCase();
  //     this.allSelectedFramComplet.push(newFram);
  //     // console.log(this.allSelectedLangComplet);
  //   } else {
  //     return;
  //   }
  // }

  // removeOneFramework(fram) {
  //   this.allSelectedFramComplet.splice(this.allSelectedFramComplet.indexOf(fram), 1);
  // }

  onSubmit() {
    // this.allSelectedLangLib.forEach((langlib ) => this.createArticleForm.addControl(langlib, new FormControl('', Validators.required)));


    if (this.createArticleForm.invalid) {
      return;
    } else if (this.app.authenticated) {
      this.newArticle = new Article();

      // TODO : recuperer l'auteur coté front
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

      this.newArticle.framework = this.allSelectedFramComplet
  ;
      this.newArticle.langage = this.allSelectedLangComplet;

      this.articleService.create(this.newArticle).subscribe(
        (data) => console.log(data),
        (error) => console.log(error)
      );

      console.log(this.newArticle);
    } else {
      console.log("rien :else ");
    }
  }

  onSubmitGlobally() {
    // this.allSelectedLangLib.forEach((langlib ) => this.createArticleForm .addControl(langlib, new FormControl('', [Validators.required])));

    if (this.createArticleForm.invalid) {
      return;
    } else if (this.app.authenticated) {
      this.newArticle = new Article();

      // TODO : recuperer l'auteur coté front
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

      this.newArticle.framework = this.allSelectedFramComplet
  ;
      this.newArticle.langage = this.allSelectedLangComplet;

      this.articleService.create(this.newArticle).subscribe(
        (data) => console.log(data),
        (error) => console.log(error)
      );

      console.log(this.newArticle);
    } else {
      console.log("rien :else ");
    }
  }

  onReset() {
    this.createArticleForm.reset();
  }

  onCancel() {
    this.createArticleForm.reset();
  }

}
