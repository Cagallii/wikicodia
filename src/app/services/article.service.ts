import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Article from '../model/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/articles/';


  create(article: Article): Observable<Object> {
    return this.http.post(this.baseUrl+ "creation", article);
  }

}
