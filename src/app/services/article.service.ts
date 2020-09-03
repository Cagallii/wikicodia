import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import Article from '../model/Article';
import { articleType } from '../enum/articleType';

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

  comment(idArticle:number, comAdmin:string): Observable<Object> {
    return this.http.put(this.baseUrl + "comment-decision/" +`${idArticle}` + "/" + `${comAdmin}`, { observe: 'response' });
  }

  reject(idArticle:number): Observable<Object> {
    return this.http.put(this.baseUrl + "reject/" +`${idArticle}`, { observe: 'response' });
  }

  validate(idArticle:number): Observable<Object> {
    return this.http.put(this.baseUrl + "validate/" +`${idArticle}`, { observe: 'response' });
  }


}
