import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import{ArticleService} from '../services/article.service';
import Article from '../model/Article';
import Language from '../model/Language';
import Framework from '../model/Framework';
import { LanguageService } from '../services/language.service';

import { AppService } from '../app.service';
import User from '../model/UserCreate';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import Category from '../model/Category';
import Type from '../model/TypeArticle';
import { CategoryService } from '../services/category.service';
import { FrameworkService } from '../services/framework.service';
import { TypeService } from '../services/type.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private articleService :ArticleService,     
    private app: AppService, 
    private router: Router, 
    private userService: UserService,
    private categoriesService: CategoryService,
    private frameworkService: FrameworkService,
    private langageService: LanguageService,
    private typeService: TypeService) { }

  createArticleForm: FormGroup;
  newArticle :Article = new Article();

  fwAndLangAndVersionSelected:Boolean=false;

  //variable à supprimer car à remplacer par ce qui vient du back 
  variableBidon ;


  //a recuperer du back 
  allLanguages;
  allFrameworks;


  autentificated: boolean = false;
  user: User = null;
  selectedLangVersion;
  selectedLang;
  allSelectedLang:Language[] = new Array();
  selectedFramVersion;
  selectedFram;
  allSelectedFram:Framework[] = new Array();


  ngOnInit() {

    this.autentificated = this.app.authenticated;
    this.user = this.app.user;

  //variable à supprimer car à remplacer par ce qui vient du back 
    this.variableBidon = ["Tous","Java","Javascript","C#","C","C++","Typescript","Go","Ruby","Python","Spring","Angular","AngularJS","Symphony","Laravel","Bootstrap","JQuery","Tuto","Erreur","Nouveau","Populaire","Très populaire"];
    this.allLanguages = ["Tous","Java","Javascript","C#","C","C++","Typescript","Go","Ruby","Python","Spring","Angular","AngularJS"];
    this.allFrameworks = ["Tous","Java","Javascript","C#","C","C++","Typescript","Go","Ruby","Python","Spring","Angular","AngularJS","Symphony","Laravel","Bootstrap","JQuery","Tuto","Erreur","Nouveau","Populaire","Très populaire"];



    this.createArticleForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(100)]),
      type: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      // langages: new FormControl('', [Validators.required]),
      // frameworks: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required, Validators.minLength(10)])
    });

  }

  hasError(controlName: string, errorName: string){
    return this.createArticleForm.controls[controlName].hasError(errorName);
  }



  // getErrorMessage() {
  //   if (this.createArticleForm.value.title.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.createArticleForm.value.title.hasError('email') ? 'Not a valid email' : '';
  // }


  addOneLanguage(){
    let newLang = new Language();
    if(this.selectedLang && this.selectedLangVersion){
      newLang.lang = this.selectedLang.toLowerCase();
      newLang.version = this.selectedLangVersion.toLowerCase();
      this.allSelectedLang.push(newLang);
      // console.log(this.allSelectedLang);
    }
    else {
      return    
    }

  }

  removeOneLanguage(lang){
    // console.log(this.allSelectedLang.indexOf(lang));
    this.allSelectedLang.splice(this.allSelectedLang.indexOf(lang),1)
  }


  addOneFramework(){
    let newFram = new Framework();
    if(this.selectedFram && this.selectedFramVersion){
      newFram.framework = this.selectedFram.toLowerCase();
      newFram.version = this.selectedFramVersion.toLowerCase();
      this.allSelectedFram.push(newFram);
      // console.log(this.allSelectedLang);
    }
    else {
      return    
    }
  }

  removeOneFramework(fram){
    this.allSelectedFram.splice(this.allSelectedFram.indexOf(fram),1)
  }


  onSubmit() {

    if (this.createArticleForm.invalid) {
      return;
    }
    else if (this.app.authenticated) {

            this.newArticle  = new Article();
      
            // TODO : recuperer l'auteur coté front
            this.newArticle.auteur  = this.user;
            this.newArticle.description = this.createArticleForm.controls['description'].value;
            this.newArticle.estPromu = false;
            this.newArticle.estPublie = false;
            this.newArticle.estValide = false;
            this.newArticle.titre = this.createArticleForm.controls['title'].value;
            this.newArticle.type = this.createArticleForm.controls['type'].value;
            this.newArticle.vote = null;
            this.newArticle.categorie = this.createArticleForm.controls['category'].value;
            this.newArticle.contenu = this.createArticleForm.controls['content'].value;
            this.newArticle.dateCreation = null;
            this.newArticle.dateDerniereModif = null;
      
            this.newArticle.framework = this.allSelectedFram;
            this.newArticle.langage = this.allSelectedLang;
      
            this.articleService.create(this.newArticle).subscribe(data=>(console.log(data))   ,    error => console.log(error)
            );

            console.log(this.newArticle);

    }
    else {
      console.log("rien :else ");
    }
  }
  


  onSubmitGlobally() {
    if (this.createArticleForm.invalid) {
      return;
    }
    else if (this.app.authenticated) {

            this.newArticle  = new Article();
      
            // TODO : recuperer l'auteur coté front
            this.newArticle.auteur  = this.user;
            this.newArticle.description = this.createArticleForm.controls['description'].value;
            this.newArticle.estPromu = false;
            this.newArticle.estPublie = true;
            this.newArticle.estValide = false;
            this.newArticle.titre = this.createArticleForm.controls['title'].value;
            this.newArticle.type = this.createArticleForm.controls['type'].value;
            this.newArticle.vote = null;
            this.newArticle.categorie = this.createArticleForm.controls['category'].value;
            this.newArticle.contenu = this.createArticleForm.controls['content'].value;
            this.newArticle.dateCreation = null;
            this.newArticle.dateDerniereModif = null;
      
      
            this.newArticle.framework = this.allSelectedFram;
            this.newArticle.langage = this.allSelectedLang;
      
            this.articleService.create(this.newArticle).subscribe(data=>(console.log(data))   ,    error => console.log(error)
            );

            console.log(this.newArticle);

    }
    else {
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