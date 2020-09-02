import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import User from './model/UserCreate';
import { UserService } from './services/user.service';
import * as moment from 'moment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  
    authenticated = false;
    user: User = null;

    wrongPassword: Boolean = false;


    constructor(
        private http: HttpClient, 
        private userService: UserService, 
        private router: Router
        ) {}

    authenticate(credentials, callback) {

        const body = new HttpParams()
        .set('username', credentials.username)
        .set('password', window.btoa(credentials.password))
        
        this.http.post('login', body.toString(), 
        {
            headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded') 
        }).subscribe(response => {

            this.http.get('user').subscribe(
                response => {
                    console.log(response);
                    
                    if (response['authenticated']) {
                        this.authenticated = true;
                        this.user = new User();
                        this.userService.hydrate(this.user, response['principal']);
                    }
                return callback && callback();
                });   
        },
        error => {
            console.log(error)
            this.authenticated = false;
            this.user = null;
            this.wrongPassword = true;
            console.log( this.wrongPassword ); 
        });

    }

    register(utisateur: User) {        
        const body = new HttpParams()
        .set('nom', utisateur.nom)
        .set('prenom', utisateur.prenom)
        .set('mail', utisateur.mail)
        .set('motDePasse', window.btoa(utisateur.motDePasse))
        .set('pseudo', utisateur.pseudo)

        let credentials = {username: utisateur.mail, password: utisateur.motDePasse}

        this.http.post(
          '/utilisateur/creation',
           body.toString(), 
          {
              headers: new HttpHeaders()
              .set('Content-Type', 'application/x-www-form-urlencoded') 
          }
        ).subscribe(response => {
            console.log("ok");
            this.authenticate(credentials, () => {
                //on set la derniere date de connexion
                this.user.dateDerniereConnexion = moment();
                this.userService.modification(this.user).subscribe(
                  data => console.log(data),
                  error => console.log(error)
                );
                //route de redirection apres la connexion
                this.router.navigateByUrl('/profil');
              });
        });
    }

    checkIfLogged() : Boolean {

        this.http.get('user').subscribe(response => {
            if (response['authenticated']) {
                this.authenticated = true;
                this.user = new User();
                this.userService.hydrate(this.user, response['principal']);
            } else {
                this.authenticated = false;
                this.user = null;
            }
        });

        return this.authenticated
    }

    findUserByMail(mail : string) {
        return this.http.get(
            '/utilisateur/trouverUnUtilisateur',
            {
                headers: new HttpHeaders()
                .set('mail', mail)
            }
        )
    }

    userUpGrade(role : any){
        
        return this.http.put(
            'http://localhost:8080/role/promossion', 
            role
        )
    }

    userDownGrade(role : any){

        return this.http.put(
            'http://localhost:8080/role/destitution', 
            role
        )
    }
    
}
