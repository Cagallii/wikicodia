import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import User from './model/User';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
    authenticated = false;

    constructor(private http: HttpClient) {
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

                if (response['nom']) {
                    this.authenticated = true;
                } else {
                    this.authenticated = false;
                }
                
                return callback && callback();
            });
        });

    }

    register(utisateur: User) {
        console.log("caca");
        
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

    checkIfLogged(){

        this.http.get('user').subscribe(response => {

            if (response['name']) {
                this.authenticated = true;
            } else {
                this.authenticated = false;
            }
            
            console.log(this.authenticated);
            
            return this.authenticated;
        });
    }

}
