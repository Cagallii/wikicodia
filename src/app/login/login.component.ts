import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {username: '', password: ''};

  constructor(private app: AppService, private http: HttpClient, private router: Router) {
  }
  
  ngOnInit(): void {
  }

  //passe les user name et le passord a la fonction autentification
  login() {
    this.app.authenticate(this.credentials, () => {
      //route de redirection apres la connexion
      this.router.navigateByUrl('/');
    });
    return false;
  }
  
}
