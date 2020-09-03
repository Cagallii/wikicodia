import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import Article from '../model/Article';
import UserCreate from '../model/UserCreate';
import { UserProfilComponent } from '../user-profil/user-profil.component';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/articles/';


  create(article: Article): Observable<Object> {
    return this.http.post(this.baseUrl+ "creation", article);
  }

  getOneArticle(idArticle:number): Observable<Object> {
    return this.http.get(this.baseUrl+`${idArticle}`);
  }


  updateOneArticle(article:Article): Observable<Object> {
    return this.http.put(this.baseUrl+"modification/"+`${article.idArticle}`, article);
  }

  getArticlesAwaitingValidation(): Observable<any> {
    return this.http.get(this.baseUrl+ "pending");
  }

  reject(idArticle:number): Observable<Object> {
    return this.http.put(this.baseUrl + "reject/" +`${idArticle}`, { observe: 'response' });
  }

  validate(idArticle:number): Observable<Object> {
    return this.http.put(this.baseUrl + "validate/" +`${idArticle}`, { observe: 'response' });
  }

  getAllMyArticles(userid:number): Observable<Object> {
    return this.http.get(this.baseUrl + "mesarticles/" +`${userid}`);
  }

  getMyFavoriteArticles(userId:number): Observable<Object>{
    return this.http.get(this.baseUrl + "articlesFavoris/" + `${userId}`);
  }

}
