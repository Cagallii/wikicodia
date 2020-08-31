import { Component, OnInit, Input} from '@angular/core';
import { AppService } from '../app.service';
import User from '../model/User';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
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
  mdpForm: FormGroup;
  categories: Observable<Category[]>;
  framework: Observable<Framework[]>;
  type: Observable<Type[]>;
  language: Observable<Language[]>;
  checkArray: FormArray;

  constructor(
    private formBuilder: FormBuilder, 
    private app: AppService, 
    private router: Router, 
    private userService: UserService,
    private categoriesService: CategoryService,
    private frameworkService: FrameworkService,
    private langageService: LanguageService,
    private typeService: TypeService
    ) {}

  ngOnInit() {
    this.autentificated = this.app.authenticated;
    this.user = this.app.user;
    this.categories = this.categoriesService.getAll();
    this.framework = this.frameworkService.getAll();
    this.language = this.langageService.getAll();
    this.type = this.typeService.getAll();

    if (this.app.authenticated) {
      // editon utilisateur
      this.editForm = this.formBuilder.group({
        idUtilisateur: ['', Validators.required],
        nom: [''],
        prenom: [''],
        pseudo: ['', Validators.required],
        lienLinkedin: [''],
        statut: [''],
      });
        
      this.editForm.patchValue(this.user);

      // edition preferences
      this.modifPref = this.formBuilder.group({
        idUtilisateur: ['', Validators.required],
        categorie: this.formBuilder.array([]),
        framework: this.formBuilder.array([]),
        type: this.formBuilder.array([]),
        langage: this.formBuilder.array([]),
      });
        
      this.modifPref.patchValue(this.user);

      //modification MDP
      this.mdpForm =  this.formBuilder.group({
        actualMdp: ['', Validators.required],
        newMdp: ['', Validators.required],
        confirmNewMdp: ['', Validators.required],
      });


    } else {
      this.router.navigateByUrl('/connexion');
    }
    
    
  }

  modification(){    
    console.log(this.user);
    this.userService.modification(this.user)
    .subscribe(
      data => console.log(data),
      error => console.log(error)
      );
  }

  fillPreference(){
    //on recupere les checkbox
    let categorieInput = document.getElementsByClassName('input-categorie');
    let frameworkInput = document.getElementsByClassName('input-framework');
    let typeInput = document.getElementsByClassName('input-type');
    let langageInput = document.getElementsByClassName('input-langage');

    //on compare avec les elements de l utilisateur et on coche si ils existent
    for (let i = 0; i < categorieInput.length; i++) {
      let value: number;
      value = Number(categorieInput[i].getAttribute("value"));
      //Pour chaque categorie posédée par l utilisateur , on coche la case concernée
      for (let j = 0; j < this.user.categorie.length; j++) {
        if (this.user.categorie[j].idCategorie == value) {
          categorieInput[i].setAttribute("checked", "true");
        }
      }
    }
    for (let i = 0; i < frameworkInput.length; i++) {
      let value: number;
      value = Number(frameworkInput[i].getAttribute("value"));
      //Pour chaque categorie posédée par l utilisateur , on coche la case concernée
      for (let j = 0; j < this.user.framework.length; j++) {
        if (this.user.framework[j].idFramework == value) {
          frameworkInput[i].setAttribute("checked", "true");
        }
      }
    }
    for (let i = 0; i < typeInput.length; i++) {
      let value: number;
      value = Number(typeInput[i].getAttribute("value"));
      //Pour chaque categorie posédée par l utilisateur , on coche la case concernée
      for (let j = 0; j < this.user.type.length; j++) {
        if (this.user.type[j].idType == value) {
          typeInput[i].setAttribute("checked", "true");
        }
      }
    }
    for (let i = 0; i < langageInput.length; i++) {
      let value: number;
      value = Number(langageInput[i].getAttribute("value"));
      //Pour chaque categorie posédée par l utilisateur , on coche la case concernée
      for (let j = 0; j < this.user.langage.length; j++) {
        if (this.user.langage[j].idLang == value) {
          langageInput[i].setAttribute("checked", "true");
        }
      }
    }
  }

  /*
  * CATEGORIES
  * Selection des categories
  */
  onCategoriesChange(e, model) {
     this.checkArray = this.modifPref.get(model) as FormArray;

    if (e.target.checked) {
      //on prend l id de la case qui vien d etre checker
      let userCategorie = e.target.value;
      //on gere le tableau
      this.checkArray.push(new FormControl(e.target.value));
      //on ajoute la categorie au moment ou elle est checker
      this.categoriesService.get(userCategorie).subscribe(
        data => this.user.categorie.push(data),
        error => console.log(error)
      );
    } else {
      let i: number = 0;
      this.checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          this.checkArray.removeAt(i);
          return;
        }
        i++;
      });
      //on enlève les catégorie decoché 
      for (let index = 0; index < this.user.categorie.length; index++) {
        if (this.user.categorie[index].idCategorie == e.target.value) {
          this.user.categorie.splice(index, 1);
        }
      }
    }
  }

  /*
  * FRAMEWORK
  * Selection des framework
  */
  onFrameworkChange(e, model) {
     this.checkArray = this.modifPref.get(model) as FormArray;

    if (e.target.checked) {
      //on prend l id de la case qui vien d etre checker
      let userFramework = e.target.value;
      //on gere le tableau
      this.checkArray.push(new FormControl(e.target.value));
      //on ajoute la framework au moment ou elle est checker
      this.frameworkService.get(userFramework).subscribe(
        data => this.user.framework.push(data),
        error => console.log(error)
      );
    } else {
      let i: number = 0;
      this.checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          this.checkArray.removeAt(i);
          return;
        }
        i++;
      });
      //on enlève les catégorie decoché 
      for (let index = 0; index < this.user.framework.length; index++) {
        if (this.user.framework[index].idFramework == e.target.value) {
          this.user.framework.splice(index, 1);
        }
      }
    }
  }

  /*
  * LANGAGE
  * Selection des langage
  */
  onLangageChange(e, model) {
     this.checkArray = this.modifPref.get(model) as FormArray;

    if (e.target.checked) {
      //on prend l id de la case qui vien d etre checker
      let userLangage = e.target.value;
      //on gere le tableau
      this.checkArray.push(new FormControl(e.target.value));
      //on ajoute la langage au moment ou elle est checker
      this.langageService.get(userLangage).subscribe(
        data => this.user.langage.push(data),
        error => console.log(error)
      );
    } else {
      let i: number = 0;
      this.checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          this.checkArray.removeAt(i);
          return;
        }
        i++;
      });
      //on enlève les catégorie decoché 
      for (let index = 0; index < this.user.langage.length; index++) {
        if (this.user.langage[index].idLang == e.target.value) {
          this.user.langage.splice(index, 1);
        }
      }
    }
  }

  /*
  * TYPE
  * Selection des type
  */
  onTypeChange(e, model) {
     this.checkArray = this.modifPref.get(model) as FormArray;

    if (e.target.checked) {
      //on prend l id de la case qui vien d etre checker
      let userType = e.target.value;
      //on gere le tableau
      this.checkArray.push(new FormControl(e.target.value));
      //on ajoute la type au moment ou elle est checker
      this.typeService.get(userType).subscribe(
        data => this.user.type.push(data),
        error => console.log(error)
      );
    } else {
      let i: number = 0;
      this.checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          this.checkArray.removeAt(i);
          return;
        }
        i++;
      });
      //on enlève les catégorie decoché 
      for (let index = 0; index < this.user.type.length; index++) {
        if (this.user.type[index].idType == e.target.value) {
          this.user.type.splice(index, 1);
        }
      }
    }
  }

  //changement du mot de passe
  changementMdp(){
    let mdpNew = this.mdpForm.value;
    let mdpConfirmation = this.mdpForm.value;

    if(mdpConfirmation === mdpNew && mdpNew === ""){
      this.user.motDePasse = mdpNew;
      this.modification();
    }
  }
}
