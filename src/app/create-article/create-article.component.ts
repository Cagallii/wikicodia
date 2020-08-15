import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import{ArticleService} from '../services/article.service';
import Article from '../model/Article';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private articleService :ArticleService) { }

  createArticleForm: FormGroup;
  newArticle :Article = new Article();

  //variable à supprimer car à remplacer par ce qui vient du back 
  variableBidon ;

  ngOnInit() {

  //variable à supprimer car à remplacer par ce qui vient du back 
    this.variableBidon = ["Tous","Java","Javascript","C#","C","C++","Typescript","Go","Ruby","Python","Spring","Angular","AngularJS","Symphony","Laravel","Bootstrap","JQuery","Tuto","Erreur","Nouveau","Populaire","Très populaire"];


    this.createArticleForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(100)]),
      type: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      language: new FormControl('', [Validators.required]),
      languageVersion: new FormControl('', [Validators.required]),
      framework: new FormControl('', [Validators.required]),
      frameworkVersion: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required, Validators.minLength(100)])
    });

  }

  hasError(controlName: string, errorName: string){
    return this.createArticleForm.controls[controlName].hasError(errorName);
  }

  // convenience getter for easy access to form fields
  get f() { return this.createArticleForm.controls; }

  // getErrorMessage() {
  //   if (this.createArticleForm.value.title.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.createArticleForm.value.title.hasError('email') ? 'Not a valid email' : '';
  // }


  onSubmit() {
    // this.submitted = true;

    // stop here if form is invalid
    if (this.createArticleForm.invalid) {
      return;
    }
    // display form values on success
    else {
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.createArticleForm.value, null, 4));
      this.newArticle  = new Article();
      this.newArticle.author = null;
      this.newArticle.category = this.createArticleForm.controls['category'].value;
      this.newArticle.content = this.createArticleForm.controls['content'].value;
      this.newArticle.description = this.createArticleForm.controls['description'].value;
      this.newArticle.language = this.createArticleForm.controls['language'].value;
      this.newArticle.title = this.createArticleForm.controls['title'].value;
      this.newArticle.versionFramework = this.createArticleForm.controls['versionFramework'].value;
      this.newArticle.versionLanguage = this.createArticleForm.controls['versionLanguage'].value;
      this.newArticle. = this.createArticleForm.controls['versionLanguage'].value;



      this.articleService.create(this.createArticleForm.value)
    }
  }


  onSubmitGlobally() {
    // this.submitted = true;

    // stop here if form is invalid
    if (this.createArticleForm.invalid) {
      return;
    }
    // display form values on success
    else {alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.createArticleForm.value, null, 4));}
  }

  onReset() {
    // this.submitted = false;
    this.createArticleForm.reset();
  }

  onCancel() {
    // this.submitted = false;
    this.createArticleForm.reset();

  }





}