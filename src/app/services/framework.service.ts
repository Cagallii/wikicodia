import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrameworkService {

  private baseUrl = '/framework';

  constructor(private http: HttpClient) {}

  get(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(framework: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/creation`, framework);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/supression/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

}
