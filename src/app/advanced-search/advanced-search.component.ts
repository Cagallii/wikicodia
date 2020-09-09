import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SearchService } from '../services/search.service';
import { CategoryService } from '../services/category.service';
import { FrameworkService } from '../services/framework.service';
import { LanguageService } from '../services/language.service';
import { TypeService } from '../services/type.service';
import Category from '../model/Category';
import Framework from '../model/Framework';
import Type from '../model/TypeArticle';
import Language from '../model/Language';
import {Search} from '../model/Search';
import Article from '../model/Article'
import {  Router } from "@angular/router";

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {

  @Output()
  readonly darkModeSwitched = new EventEmitter<boolean>();

  public listCategory:Observable<Category[]>;
  public listFramework:Observable<Framework[]>;
  public listLanguage:Observable<Language[]>;
  public listType:Observable<Type[]>;
  public nbLike: any;
  public advancedSearchObject = new Search();
  public searchForm: FormGroup;
  public versionToShow: string;
  public popularitySought : string;
  public listArticles : Article[];
  public isPageResult : Boolean = false;
  showFilters:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoryService,
    private frameworkService: FrameworkService,
    private langageService: LanguageService,
    private searchService : SearchService,
    private typeService: TypeService,
    private router: Router,) { }

  ngOnInit() {

    this.searchForm = this.formBuilder.group({
      searchString:[''],
      dateCrea: [''],
      dateModif: [''],
      language: [''],
      framework: [''],
      category: [''],
      likes: [''],
      type: [''],
      orderByModif: [''],
      orderByCrea: [''],
      orderByLikes: ['']
    });

    this.listCategory = this.categoriesService.getAll();
    this.listFramework = this.frameworkService.getAll();
    this.listLanguage = this.langageService.getAll();
    this.listType = this.typeService.getAll();
  }

  addFilters(){
    this.showFilters=!this.showFilters;
  }

  // convenience getter for easy access to form fields
  get f() { return this.searchForm.controls; }

  public paramAdvancedSearch():void{
    switch(this.popularitySought){
      case 'Tous':
        this.advancedSearchObject.popularity = [999,1000];
        break;
      case 'Nouveau':
        this.advancedSearchObject.popularity = [0,1];
        break;
      case 'Populaire':
        this.advancedSearchObject.popularity= [19,20];
        break;
      case 'Très populaire':
        this.advancedSearchObject.popularity = [49,50];
    }
  }

  public advancedSearch(): void {
    this.searchService.search(this.advancedSearchObject).subscribe(articles => {
      this.listArticles = articles;
      console.log(this.listArticles);
      this.isPageResult = true;
    });
    this.resetForm();
    this.router.navigateByUrl("/result");
  }

  public onLanguageChange() : void{
    this.searchForm.get('framework').disable();
    return;
  }
  public onFrameworkChange() : void{
    this.searchForm.get('language').disable();
    return;
  }

  public resetForm(): void {
    this.searchForm.reset();
    this.searchForm.get('framework').enable();
    this.searchForm.get('language').enable();
  }

  /*public mapArticles(articles : Article []): Article []{
    return articles.map(article => {
      article.dateCreation = article.dateCreation;
      article.dateDerniereModif = article.dateDerniereModif;
      article.langage.lang = article.langage.lang;
      article.langage.version = article.langage.version;

      return article;
    })
  }*/
}