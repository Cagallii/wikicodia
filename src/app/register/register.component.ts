import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import User from '../model/UserCreate';
import { AppService } from '../app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private app: AppService) {}

  ngOnInit() {
  }

  //Gestion du formulaire
  registerForm = new FormGroup({
    nom: new FormControl(),
    prenom: new FormControl(),
    mail: new FormControl(),
    mdp: new FormControl(),
    //confirmeMdp: new FormControl(),
  })

  onFormSubmit(): void {
    const utilisateur = new User();
    utilisateur.nom = this.registerForm.get('nom').value
    utilisateur.prenom = this.registerForm.get('prenom').value
    utilisateur.motDePasse = this.registerForm.get('mdp').value
    utilisateur.mail = this.registerForm.get('mail').value

    console.log(utilisateur);
    
    this.app.register(utilisateur);
  }
}
