import { Injectable } from '@angular/core';
import { Search } from '../model/Search';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  private baseUrl = '/articles';

  search(search : Search) : Observable<any>{
    console.log(search);
    return this.http.post(this.baseUrl +"/search", search);
  }
}
