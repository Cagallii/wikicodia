import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';


@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  createArticleForm: FormGroup;
  // submitted:boolean = false;



  //variable à supprimer car à remplacer par ce qui vient du back 
  variableBidon ;

  ngOnInit() {

// A BIEN RAJOUTER DEPUIS LE BACK  !!!!!! : 

    // <mat-chip color="accent" selected>date de création</mat-chip>
    // <mat-chip color="accent" selected>date de modification</mat-chip>
    // <mat-chip color="accent" selected>auteur</mat-chip>
    // <mat-chip color="primary" selected>nb likes</mat-chip>
    // <mat-chip color="primary" selected>nb dislikes</mat-chip>




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