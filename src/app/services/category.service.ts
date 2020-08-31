import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Category from '../model/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = '/categories';

  constructor(private http: HttpClient) {}

  get(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(category: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/creation`, category);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/suppression/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

}
