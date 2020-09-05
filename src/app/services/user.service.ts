import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import User from '../model/UserCreate';
import Category from '../model/Category';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = '/utilisateur';

  constructor(private http: HttpClient) {}

  get(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(user: User): Observable<Object> {
    return this.http.post(`${this.baseUrl}/creation`, user);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/suppression/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  modification(user: User): Observable<any> {
    //user.dateInscription.add(1);
    console.log(user.dateDerniereConnexion);
    return this.http.put(`${this.baseUrl}/modification`, user);
  }

  modificationDate(user: User): Observable<any> {
    //user.dateInscription.add(1);
    console.log(moment(user.dateInscription).add(2, "d"));
    console.log(user.dateDerniereConnexion);
    return this.http.put(`${this.baseUrl}/modification-date`, user);
  }

  setCategories(categorie: Category, user: User){
    user.categorie.push(categorie);
  }

  hydrate(u: User, user: Object){
    if (user['dateInscription']) {
      let split = user['dateInscription'].split('-');
      u.dateInscription = moment([split[0], split[1], split[2]]).add(2, "days");
    }

    u.idUtilisateur = user['idUtilisateur']
    u.nom = user['nom'];
    u.prenom = user['prenom'];
    u.pseudo = user['pseudo'];
    u.motDePasse = user["password"];
    u.mail = user['mail'];
    u.lienLinkedin = user['lienLinkedin'];
    u.statut = user['statut'];
    u.etat = user['etat'];
    u.role = user['role'];
    u.framework = user['framework'];
    u.langage = user['langage'];
    u.type = user['type'];
    u.categorie = user['categorie'];

  }

  getAuteurs(auteurIds : Number[]): Observable<any>{
    return this.http.post(`${this.baseUrl}/trouverDesAuteurs` , auteurIds);
  }
}
