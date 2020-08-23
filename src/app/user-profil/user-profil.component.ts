import { Component, OnInit} from '@angular/core';
import { AppService } from '../app.service';
import User from '../model/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { stringify } from 'querystring';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import Category from '../model/Category';
import Framework from '../model/Framework';
import Type from '../model/Type';
import Language from '../model/Language';
import { CategoryService } from '../services/category.service';
import { FrameworkService } from '../services/framework.service';
import { LanguageService } from '../services/language.service';
import { TypeService } from '../services/type.service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {

  autentificated: boolean = false;
  user: User = null;
  editForm: FormGroup;
  modifPref: FormGroup;
  categories: Observable<Category[]>;
  framework: Observable<Framework[]>;
  type: Observable<Type[]>;
  language: Observable<Language[]>;

  constructor(
    private formBuilder: FormBuilder, 
    private app: AppService, 
    private router: Router, 
    private userService: UserService,
    private categoriesService: CategoryService,
    private frameworkService: FrameworkService,
    private LangageService: LanguageService,
    private typeService: TypeService
    ) {}

  ngOnInit() {
    this.autentificated = this.app.authenticated;
    this.user = this.app.user;
    this.categories = this.categoriesService.getAll();
    this.framework = this.frameworkService.getAll();
    this.language = this.LangageService.getAll();
    this.type = this.typeService.getAll();

    if (this.user) {
      // editon utilisateur
      this.editForm = this.formBuilder.group({
        idUtilisateur: ['', Validators.required],
        nom: [''],
        prenom: [''],
        pseudo: ['', Validators.required],
        mail: ['', Validators.required],
        lienLinkedin: [''],
        statut: [''],
      });
        
      this.editForm.patchValue(this.user);

      // edition preferences
      this.modifPref = this.formBuilder.group({
        idUtilisateur: ['', Validators.required],
        categorie: [''],
      });
        
      this.modifPref.patchValue(this.user);

    } else {
        this.router.navigateByUrl('/connexion');
    }

    console.log(this.categories);
    console.log(this.language);
    console.log(this.framework);
    console.log(this.type);
    
  }

  modification(){    
    this.userService.modification(this.user)
    .subscribe(
      data => console.log(data), 
      error => console.log(error)
      );
  }
}
