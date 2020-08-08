import { Component, OnInit } from '@angular/core';
import Language from '../model/Language';
import { LanguageService } from '../services/language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrls: ['./add-language.component.css']
})
export class AddLanguageComponent implements OnInit {

  language: Language = new Language();
  submitted = false;

  constructor(private languageService: LanguageService
    // , private router: Router
    ) { }

  ngOnInit() {
  }

  newLanguage(): void {
    this.submitted = false;
    this.language = new Language();
  }

  save() {
    this.languageService.create(this.language)
      .subscribe(data => console.log(data), error => console.log(error));
    this.language = new Language();
    // this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    // this.router.navigate(['/langages']);
  }

}
