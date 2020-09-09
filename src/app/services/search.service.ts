import { Injectable } from '@angular/core';
import { Search } from '../model/Search';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public searchData : any;
  constructor(private http: HttpClient) { }

  private baseUrl = '/articles';

  search(search : Search) : Observable<any>{
    console.log(search);
    this.searchData = this.http.post(this.baseUrl +"/search", search);
    return this.searchData;
  }
}
