import { Component, OnInit, Output, EventEmitter,Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material';


@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {

  @Output()
  readonly darkModeSwitched = new EventEmitter<boolean>();


  constructor(private formBuilder: FormBuilder) { }

  searchForm: FormGroup;
  submitted:boolean = false;
  showFilters:boolean = false;

  counter;
  // A remplacer par une recuperation du back ou d'un service
  listAllLanguages;
  listAllFramework;
  listAllCategory;
  listAllNbLikes;
  listAllType;




  ngOnInit() {

    this.counter = ["Tous","Java","Javascript","C#","C","C++","Typescript","Go","Ruby","Python"];
        // auto-generation de la liste deroulante pour la date de créa
    // for(let i = 0; i<100; i++){
    //   this.counter.push("0");
    // }
    // A remplacer par une recuperation du back ou d'un service
    this.listAllLanguages = ["Tous","Java","Javascript","C#","C","C++","Typescript","Go","Ruby","Python"];
    this.listAllFramework = ["Tous","Spring","Angular","AngularJS","Symphony","Laravel","Bootstrap","JQuery"];
    this.listAllCategory = ["Tous","Tuto","Erreur"];
    this.listAllNbLikes = ["Tous","Nouveau","Populaire","Très populaire"];
    this.listAllType = ["Tous","Populaire","Très populaire"];


    this.searchForm = this.formBuilder.group({
      searchWords:[""],
      dateCrea: [this.counter[0]],
      dateModif: [this.listAllLanguages[0]],
      language: [this.listAllLanguages[0]],
      version: [this.listAllLanguages[0]],
      framework: [this.listAllFramework[0]],
      category: [this.listAllCategory[0]],
      likes: [this.listAllNbLikes[0]],
      type: [this.listAllType[0]],
      orderByModif: [false],
      orderByCrea: [false],
      orderByLikes: [false]
    });

  }


  addFilters(){
    console.log(this.showFilters);
    this.showFilters=!this.showFilters;
    console.log("hello");
    console.log(this.showFilters);
    console.log(JSON.stringify(this.searchForm.value['dateCrea'], null, 4));
  }

  onCheckboxChange($event){
    //alert(JSON.stringify(this.searchForm.value['language'][0], null, 4));
  }

  // convenience getter for easy access to form fields
  get f() { return this.searchForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    // if (this.searchForm.invalid) {
    //   return;
    // }

    // display form values on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.searchForm.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.searchForm.reset();
  }





}