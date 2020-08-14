import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import User from './model/User';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
    authenticated = false;
    user: User = null;

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

                    this.checkIfLogged();
                
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
            console.log(response);
            

            if (response['authenticated']) {
                this.authenticated = true;
                this.user = new User();
                this.user.hydrate(response['principal']);
            } else {
                this.authenticated = false;
                this.user = null;
            }
            
            console.log(this.authenticated);
            console.log(this.user);
            
            return this.authenticated;
        });
    }

}
