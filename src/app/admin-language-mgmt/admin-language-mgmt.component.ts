import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { LanguageService } from '../services/language.service';
import Language from './../model/Language'
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-language-mgmt',
  templateUrl: './admin-language-mgmt.component.html',
  styleUrls: ['./admin-language-mgmt.component.css']
})
export class AdminLanguageMgmtComponent implements OnInit {

  languages: Observable<Language[]>;

  constructor(private languageService: LanguageService, private router: Router) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.languages = this.languageService.getAll();
  }

  deleteLanguage(id: number) {
    this.languageService.delete(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

}
