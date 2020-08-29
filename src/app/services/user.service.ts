import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import User from '../model/User';
import Category from '../model/Category';

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
    return this.http.put(`${this.baseUrl}/modification`, user);
  }

  setCategories(categorie: Category, user: User){
    user.categorie.push(categorie);
  }

  hydrate(u: User, user: Object){
    u.idUtilisateur = user['idUtilisateur']
    u.nom = user['nom'];
    u.prenom = user['prenom'];
    u.pseudo = user['pseudo'];
    u.mail = user['mail'];
    u.lienLinkedin = user['lienLinkedin'];
    u.statut = user['statut'];
    u.dateInscription = user['dateInscription'];
    u.etat = user['etat'];
    u.role = user['role'];
    u.framework = user['framework'];
    u.langage = user['langage'];
    u.type = user['type'];
    u.categorie = user['categorie'];
}
}
