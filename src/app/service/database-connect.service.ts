import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseConnectService {
  postUrl: string = "https://lll.elodiemorin.web-edu.fr/php/addEntry.php";
  // postUrl: string = "http://localhost/lll-questionnaire-bdd-acess/addEntry.php";
  private headers = new HttpHeaders()
    // .set('Postman-Token', 'b959e3fc-83fc-4f6f-8495-4c0c1d8b70ec')
    .set('cache-control', 'no-cache')
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-origin', '*');
  person;

  constructor(private http: HttpClient) { }

  public addPerson(person): Promise<any> {
    return new Promise<any>((resolve) => {
      this.person = person;
      resolve(true);
    });
  }

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

  public postEntry() {
    let params = new HttpParams()
      .set('age', this.person.age)
      .set('activity', this.person.activity)
      .set('gender', this.person.gender);
    let url = this.prepareUrl(this.postUrl, params);
    console.log(url);
    this.http.post(url,{headers: this.headers})
      .subscribe(_ => console.log("done"));
  }
}
