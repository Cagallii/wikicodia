import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

  //Gestion du formulaire
  registerForm = new FormGroup({
    nom: new FormControl(),
    prenom: new FormControl(),
    mail: new FormControl(),
    mdp: new FormControl(),
    confirmeMdp: new FormControl(),
  });

  onFormSubmit(): void {
    console.log('Nom:' + this.registerForm.get('nom').value);
    console.log('Prenom:' + this.registerForm.get('prenom').value);
  }

}
