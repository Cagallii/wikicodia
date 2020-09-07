import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import User from '../model/UserCreate';
import Category from '../model/Category';
import * as moment from 'moment';
import { category } from '../enum/category';
import UserCreate from '../model/UserCreate';
import Langage from '../model/Language';
import Framework from '../model/Framework';
import TypeArticle from '../model/TypeArticle';

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
    console.log(user.dateDerniereConnexion);
    return this.http.put(`${this.baseUrl}/modification-speciale`, user);
  }

  modificationDate(user: User): Observable<any> {
    console.log(moment(user.dateInscription).add(2, "d"));
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

  /**
   * Gestion des preferences
   */

  getAuteurs(auteurIds : Number[]): Observable<any>{
    return this.http.post(`${this.baseUrl}/trouverDesAuteurs` , auteurIds);
  }

  getUserCategorie(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories/${id}`);
  }

  getUserFramework(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/framework/${id}`);
  }

  getUserLangage(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/langage/${id}`);
  }

  getUserType(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/type/${id}`);
  }

  hydrateByConnectedUser(u: UserCreate, connectedUser: UserCreate){
    u.nom = connectedUser.nom
    u.prenom = connectedUser.prenom
    u.pseudo = connectedUser.pseudo
    u.etat = connectedUser.etat
    u.role = connectedUser.role
    u.dateDerniereConnexion = connectedUser.dateDerniereConnexion
    u.idUtilisateur = connectedUser.idUtilisateur
    u.lienLinkedin = connectedUser.lienLinkedin
    u.motDePasse = connectedUser.motDePasse
    u.statut = connectedUser.statut
    u.mail = connectedUser.mail

    this.getUserPreferences(u);
  }

  getUserPreferences(u: UserCreate){
    this.getUserCategorie(u.idUtilisateur).subscribe(
      categorie => u.categorie = categorie
    );
    this.getUserFramework(u.idUtilisateur).subscribe(
      framework => u.framework = framework
    );
    this.getUserLangage(u.idUtilisateur).subscribe(
      langage => u.langage = langage
    );
    this.getUserType(u.idUtilisateur).subscribe(
      type => u.type = type
    );
  }

  setUserPreferences(u: UserCreate, categoriesId: Category[], frameworkId: Framework[], langageId: Langage[], typeId: TypeArticle[]){

    this.setUserCategorie(u.idUtilisateur, categoriesId).subscribe(
      data => console.log(data)
    )

    this.setUserFramework(u.idUtilisateur, frameworkId).subscribe(
      data => console.log(data)
    )

    this.setUserLangage(u.idUtilisateur, langageId).subscribe(
      data => console.log(data)
    )

    this.setUserType(u.idUtilisateur, typeId).subscribe(
      data => console.log(data)
    )

  }

  setUserCategorie(id: number, categoriesId: Category[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/set-categories/${id}`, categoriesId);
  }

  setUserFramework(id: number, frameworkId: Framework[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/set-framework/${id}`, frameworkId);
  }

  setUserLangage(id: number, langageId: Langage[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/set-langage/${id}`, langageId);
  }

  setUserType(id: number, typeId: TypeArticle[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/set-type/${id}`, typeId);
  }

  getLast5Articles(id: number): Observable<any>{
    return this.http.get(`/articles/mesarticles-profil/${id}`)
  }
}
