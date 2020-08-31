import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import User from './model/User';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
    authenticated = false;
    user: User = null;

    constructor(private http: HttpClient, private userService: UserService) {
    }

    authenticate(credentials, callback) {

        const body = new HttpParams()
        .set('username', credentials.username)
        .set('password', credentials.password)
        
        this.http.post('login', body.toString(), 
        {
            headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded') 
        }).subscribe(response => {

            this.http.get('user').subscribe(response => {
                if (response['authenticated']) {
                    this.authenticated = true;
                    this.user = new User();
                    this.userService.hydrate(this.user, response['principal']);
                } else {
                    this.authenticated = false;
                    this.user = null;
                }
                return callback && callback();
            });
        });

    }

    register(utisateur: User) {        
        const body = new HttpParams()
        .set('nom', utisateur.nom)
        .set('prenom', utisateur.prenom)
        .set('mail', utisateur.mail)
        .set('motDePasse', utisateur.motDePasse)
    
        this.http.post(
          '/utilisateur/creation',
           body.toString(), 
          {
              headers: new HttpHeaders()
              .set('Content-Type', 'application/x-www-form-urlencoded') 
          }
        ).subscribe(response => {
            //TODO: connecter l utilisateur fraichement créé
            console.log("ok");
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

    
}
