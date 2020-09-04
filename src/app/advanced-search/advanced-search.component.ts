import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Search} from '../model/Search';
import { CategoryService } from '../services/category.service';
import { FrameworkService } from '../services/framework.service';
import { LanguageService } from '../services/language.service';
import { TypeService } from '../services/type.service';
import Category from '../model/Category';
import Framework from '../model/Framework';
import Type from '../model/TypeArticle';
import Language from '../model/Language';
import { Observable } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {

  public listCategory:Observable<Category[]>;
  public listFramework:Observable<Framework[]>;
  public listLanguage:Observable<Language[]>;
  public listType:Observable<Type[]>;
  public nbLike: any;
  public advancedSearchObject = new Search();
  public searchForm: FormGroup;
  public versionToShow: string;
  submitted:boolean = false;
  showFilters:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoryService,
    private frameworkService: FrameworkService,
    private langageService: LanguageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private typeService: TypeService) { }

  ngOnInit() {

    this.searchForm = this.formBuilder.group({
      searchWords:[''],
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
    this.nbLike = ["Tous","Nouveau","Populaire","Très populaire"];
  }

  addFilters(){
    this.showFilters=!this.showFilters;
  }

  // convenience getter for easy access to form fields
  get f() { return this.searchForm.controls; }

  public paramAdvancedSearch():void{
    this.router.navigate([''],{
      queryParams: {
        dateCreate : this.advancedSearchObject.dateCreate, 
        datelastModif: this.advancedSearchObject.dateModif,
        language: this.advancedSearchObject.language,
        version: this.advancedSearchObject.version,
        framework: this.advancedSearchObject.framework,
        category:this.advancedSearchObject.category,
        popularity: this.advancedSearchObject.popularity,
        type:this.advancedSearchObject.type,
      }
    })
  }

  public advancedSearch(): void {
    this.submitted = true;
    this.activatedRoute.queryParams.subscribe(params => {
      this.advancedSearchObject ={
        dateCreate : params.dateCrea, 
        dateModif: params.dateModif,
        language: params.language,
        version: params.version,
        framework: params.framework,
        category:params.category,
        popularity: params.popularity,
        type:params.type
      }
    })
    
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.searchForm.value, null, 4));
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
    this.submitted = false;
    this.searchForm.reset();
    this.searchForm.get('framework').enable();
    this.searchForm.get('language').enable();
  }
}