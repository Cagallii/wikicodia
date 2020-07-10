import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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

        console.log(credentials);
        
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
