import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private baseUrl = 'http://localhost:8080/wikicodia/langages';

  constructor(private http: HttpClient) {}

  get(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(language: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/creation`, language);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/suppression/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

}
