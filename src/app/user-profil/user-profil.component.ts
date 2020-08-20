import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import User from '../model/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { stringify } from 'querystring';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {

  autentificated: boolean = false;
  user: User = null;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private app: AppService, private router: Router) {

  }

  ngOnInit() {
    this.autentificated = this.app.authenticated;
    this.user = this.app.user;

    if (this.user) {
      this.editForm = this.formBuilder.group({
        id: ['', Validators.required],
        nom: [''],
        prenom: [''],
        pseudo: ['', Validators.required],
        mail: ['', Validators.required],
        lienLinkedin: [''],
        statut: [''],
        preferences: [''],
        etat: [''],
        role: [''],
        framework: [''],
        langage: [''],
        type: [''],
        categorie: [''],
      });
        
      this.editForm.setValue(this.user);
    } else {
        this.router.navigateByUrl('/connexion');
    }
  }

  modification(){
    console.log(this.editForm.value);
  }
}
