import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import Vote from '../model/Vote';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/vote/';


  // createVote(vote: Vote): Observable<Object> {
  //   return this.http.post(this.baseUrl+ "creation", vote);
  // }

  // deleteVote(vote: Vote): Observable<Object> {
  //   return this.http.delete(this.baseUrl+ "supression/"+`${vote.idVote}`);
  // }


}
