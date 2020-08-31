import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {username: '', password: ''};

  constructor(
    private app: AppService, 
    private http: HttpClient, 
    private router: Router,
    private userService: UserService) {
  }
  
  ngOnInit(): void {
  }

    //Gestion du formulaire
    loginForm = new FormGroup({
      mail: new FormControl(),
      mdp: new FormControl(),
    })

  //passe les user name et le passord a la fonction autentification
  login() {    
    this.app.authenticate(this.credentials, () => {
      //on set la derniere date de connexion
      this.app.user.dateDerniereConnexion = moment();
      this.userService.modification(this.app.user).subscribe(
        data => console.log(data),
        error => console.log(error)
      );
      //route de redirection apres la connexion
      this.router.navigateByUrl('/');
    });
    return false;
  }
  
}
