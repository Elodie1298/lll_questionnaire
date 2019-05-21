import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseConnectService {
  postPersonURL: string = "https://lll.elodiemorin.web-edu.fr/php/addPerson.php";
  private headers = new HttpHeaders()
    .set('cache-control', 'no-cache')
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-origin', '*');

  constructor(private http: HttpClient) { }

  private prepareUrl(url: string, params): string {
    let queryUrl = url;
    for (let i=0 ; i<params.keys().length ; i++) {
      let key = params.keys()[i];
      if (i==0) queryUrl += '?';
      else queryUrl += "&";
      queryUrl += key + '=' + params.get(key);
    }
    return queryUrl;
  }

  public postPerson(person) {
    let params = new HttpParams()
      .set('age', person.age)
      .set('activity', person.activity)
      .set('gender', person.gender);
    let url = this.prepareUrl(this.postPersonURL, params);
    console.log(url);
    this.http.post(url,{headers: this.headers})
      .subscribe(_ => console.log("done"));
  }
}
