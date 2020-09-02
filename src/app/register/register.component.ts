import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import User from '../model/UserCreate';
import { AppService } from '../app.service';
import * as moment from 'moment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  invalidePassword : Boolean = false;

  constructor(
    private app: AppService
    ) {}

  ngOnInit() {
  }

  //Gestion du formulaire
  registerForm = new FormGroup({
    nom: new FormControl(),
    prenom: new FormControl(),
    pseudo: new FormControl(),
    mail: new FormControl(),
    mdp: new FormControl(),
    confirmeMdp: new FormControl(),
  })

  onFormSubmit(): void {
    if(this.registerForm.get('mdp').value == this.registerForm.get('confirmeMdp').value){  
      const utilisateur = new User();
      utilisateur.nom = this.registerForm.get('nom').value
      utilisateur.prenom = this.registerForm.get('prenom').value
      utilisateur.pseudo = this.registerForm.get('pseudo').value
      utilisateur.motDePasse = this.registerForm.get('mdp').value
      utilisateur.mail = this.registerForm.get('mail').value
      utilisateur.dateInscription = moment();
      
      this.app.register(utilisateur);
    }else{
      this.invalidePassword = true;
    }
  }
}
