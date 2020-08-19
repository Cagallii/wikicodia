import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import User from '../model/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {

  autentificated: boolean = false;
  user: User = null;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private app: AppService,) {

  }

  ngOnInit() {
    this.autentificated = this.app.authenticated;
    this.user = this.app.user;

    if (this.user) {
      this.editForm = this.formBuilder.group({
        id: ['', Validators.required],
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        pseudo: ['', Validators.required],
        mail: ['', Validators.required],
        motDePasse: ['', Validators.required],
        lienLinkedin: ['', Validators.required],
        statut: ['', Validators.required],
        preferences: ['', Validators.required],
        etat: ['', Validators.required],
        role: ['', Validators.required],
        framework: ['', Validators.required],
        langage: ['', Validators.required],
        type: ['', Validators.required],
        categorie: ['', Validators.required],
      });
  
      this.editForm.setValue(this.user);
    }
  }

  modification(){
    console.log(this.editForm.value);
  }
}
